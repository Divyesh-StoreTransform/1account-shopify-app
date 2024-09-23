import { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Base64 } from 'js-base64'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import {
  Page,
  Layout,
  Text,
  FormLayout,
  Button,
  Loading,
  Frame,
  Toast,
  Banner,
  LegacyStack,
  TextField as CopyField,
  Label,
  ExceptionList,
  Icon,
} from '@shopify/polaris'
import { AlertMinor, CircleAlertMajor } from '@shopify/polaris-icons'
import { useAppBridge } from '@shopify/app-bridge-react'; /* DO NOT DELETE THIS */

import page from '../utils/page'

const ONE_ACCOUNT_API_URL ='https://api.1account.net';

export default function Index() {

      /* WE USE THIS VARAIABLE FOR STORE CLIENT RESPONSE */
      const [response_Array, setresponse_Array] = useState([]); 

      /* DEFAULT FUNCTIONS AND VARAIBLES START */
      const [isLoading, setIsLoading] = useState(false)
      const [serverError, setServerError] = useState('')
      const [orderStatusScript, setOrderStatusScript] = useState('')
      const [isScriptCopied, setIsScriptCopied] = useState(false)
      const missingShopCookie = !Cookies.get('shopOrigin')

      useEffect(() => {
        setOrderStatusScript(localStorage.getItem('pushScript'))
      }, [])


        const handleSubmit = useCallback(
          (values) => {
            setServerError('')
            setIsLoading(true)

            const headers = {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'X-Requested-With,content-typet',
              'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',   
              'Access-Control-Allow-Credentials': 'true',
            }

            axios
              .post(`${ONE_ACCOUNT_API_URL}/oauth/publisher/client-auth`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'X-Requested-With,content-typet',
                  'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',   
                  'Access-Control-Allow-Credentials': 'true'
                  
              },
                id: values.clientId,
                hash: Base64.encode(values.clientSecret),
              
              })
              .then(({ data: project }) => {
                const projectData = {
                  logo: project.logo,
                  avLevel: project.avLevel,
                  clientId: project.clientId,
                }

                const pushScript = page.generatePush(
                  projectData.logo,
                  projectData.avLevel,
                  projectData.clientId
                )
                setOrderStatusScript(pushScript)
                window.localStorage.setItem('pushScript', pushScript)
                setIsLoading(false)
              })
              .catch(() => {
                setIsLoading(false)
                setServerError('Invalid project details')
              })
          },
          [
            setServerError,
            setIsLoading,
            setOrderStatusScript,
            setIsLoading,
            setServerError,
          ]
        )

            
        const formValidation = Yup.object().shape({
          clientId: Yup.string().required('Client Id is Required!'),
          clientSecret: Yup.string().required('Client Secret is Required!'),
        })


        const handleChangeDetails = useCallback(() => {
        setOrderStatusScript('')
        window.localStorage.removeItem('pushScript')
        }, [])

        const showCopiedSnackBar = useCallback(
        () => setIsScriptCopied(true),
        [setIsScriptCopied]
        )
        const hideCopiedSnackBar = useCallback(
        () => setIsScriptCopied(false),
        [setIsScriptCopied]
        )

        /* DEFAULT FUNCTIONS AND VARAIBLES END */
        
      /* USING useAppBridge GET SHOPIFY STORE URL */
      const shopUrlWithouthttps = `${atob(window.__SHOPIFY_DEV_HOST).split('/').slice(-1)}.myshopify.com`;
      // console.log('APi Verification started');  
      // console.log(shopUrlWithouthttps);  

   /* FIRST WHEN PAGE LOAD WE CHECK CLIENT ALREADY REGISTERED OR NOT START VIA API */
   useEffect(() => {

                
                //axios.get("https://api.1accountqa.net/platforms/shopify/shop?shop="+shopUrlWithouthttps)
                axios.get("https://api.1accountqa.net/platforms/shopify/shop?shop="+shopUrlWithouthttps) 
                .then((response) => 
                {                 
                                  /* STORE DATA IN VARAIBLE */
                                  setresponse_Array(response);                      
                }, (error) => 
                { 
                                    console.log("error",error); 
                })
  }, []);
  /* FIRST WHEN PAGE LOAD WE CHECK CLIENT ALREADY REGISTERED OR NOT END */ 

          /* CHECK IF RESPONSE IS NOT NULL AND NOT UNDEFINED FILTER LEVEL 1 */    
          if (typeof(response_Array) !== 'undefined' && response_Array != null) {

                         const client_id = response_Array.data != null ? response_Array.data.clientId : '';
                         //console.log(client_id);
                         

            /* RESPONSE 200 IS GET BUT CLIENT ID NOT FOUND THEN SHOW 1ACCOUNT FORM FILTER LEVEL 2 START */
            if(!client_id){                                                     
              
                return (
                  <div style={{ padding: '0 2rem' }}>
                    <Page>
                      <Frame>
                        {isLoading && <Loading />}
                        <Layout>
                          <Layout.Section>
                            { missingShopCookie ? (
                              <LegacyStack alignment='center'>
                                <Icon source={CircleAlertMajor} color="critical" />
                                <Text variant="heading3xl" as="h1">
                                  Please reinstall the 1Account app
                                </Text>
                              </LegacyStack>
                            ) : (
                              <LegacyStack vertical spacing="loose">
                                <Text variant="headingXl" as="h1">
                                  Please, input Push API_URL project details
                                </Text>
                                {serverError && (
                                  <Banner title={serverError} status="critical" />
                                )}
                                <Formik
                                  initialValues={{
                                    clientId: '',
                                    clientSecret: '',
                                  }}
                                  validationSchema={formValidation}
                                  onSubmit={handleSubmit}
                                >
                                  {({ errors, dirty, touched }) => (
                                    <Form>
                                      <FormLayout>
                                        <Label>Client Id</Label>
                                        <Field
                                          id="clientId"
                                          name="clientId"
                                          label="Client Id"
                                          type="text"
                                          error={touched.clientId && errors.clientId}
                                        />
                                        <Label>Client Secret</Label>
                                        <Field
                                          id="clientSecret"
                                          name="clientSecret"
                                          label="Client Secret"
                                          type="password"
                                          error={touched.clientSecret && errors.clientSecret}
                                        />
                                        <Button submit primary disabled={isLoading || !dirty}>
                                          Generate Script
                                        </Button>
                                      </FormLayout>
                                    </Form>
                                  )}
                                </Formik>
                              </LegacyStack>
                            )}             
                           
                          </Layout.Section>
                        </Layout>
                      </Frame>
                    </Page>
                  </div>
                )   

                /* RESPONSE 200 IS GET BUT CLIENT ID NOT FOUND THEN SHOW 1 ACCOUNT FORM END */

                         }else{

                                /* CLIENT ID FIND THEN PREVIEW THIS LAYOUT E.G. https://prnt.sc/JyKA3JDj3haQ */

                                const copy_val = 'Your app has been configured with projectId '+ `${client_id}`;
                                return ( 
                                          <div style={{ padding: '0 2rem' }}>                                 

                                          <LegacyStack vertical spacing="loose">
                                          <CopyField
                                          label=""
                                          value={copy_val}
                                          multiline
                                          />
                                          </LegacyStack>
                                          </div>
                                );
                        }
           }else
           {
            /* RESPONSE IS NULL OR UNDEFINED FILTER THEN SHOW 1ACCOUNT FORM */   
            return (

              <div style={{ padding: '0 2rem' }}>
              <Page>
                <Frame>
                  {isLoading && <Loading />}
                  <Layout>
                    <Layout.Section>
                      { missingShopCookie ? (
                        <LegacyStack alignment='center'>
                          <Icon source={CircleAlertMajor} color="critical" />
                          <Text variant="heading3xl" as="h1">
                            Please reinstall the 1Account app
                          </Text>
                        </LegacyStack>
                      ) : (
                        <LegacyStack vertical spacing="loose">
                          <Text variant="headingXl" as="h1">
                            Please, input Push API_URL project details
                          </Text>
                          {serverError && (
                            <Banner title={serverError} status="critical" />
                          )}
                          <Formik
                            initialValues={{
                              clientId: '',
                              clientSecret: '',
                            }}
                            validationSchema={formValidation}
                            onSubmit={handleSubmit}
                          >
                            {({ errors, dirty, touched }) => (
                              <Form>
                                <FormLayout>
                                  <Label>Client Id</Label>
                                  <Field
                                    id="clientId"
                                    name="clientId"
                                    label="Client Id"
                                    type="text"
                                    error={touched.clientId && errors.clientId}
                                  />
                                  <Label>Client Secret</Label>
                                  <Field
                                    id="clientSecret"
                                    name="clientSecret"
                                    label="Client Secret"
                                    type="password"
                                    error={touched.clientSecret && errors.clientSecret}
                                  />
                                  <Button submit primary disabled={isLoading || !dirty}>
                                    Generate Script
                                  </Button>
                                </FormLayout>
                              </Form>
                            )}
                          </Formik>
                        </LegacyStack>
                      )}             
                     
                    </Layout.Section>
                  </Layout>
                </Frame>
              </Page>
            </div>

            )       
           }
           /* END OF IF-ELSE LOOP */
}  /* END OF INDEX FUNCTION */

