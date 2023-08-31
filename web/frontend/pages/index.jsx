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

import page from '../utils/page'

const ONE_ACCOUNT_API_URL = import.meta.env.VITE_ONE_ACCOUNT_API_URL

export default function Index() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [orderStatusScript, setOrderStatusScript] = useState('')
  const [isScriptCopied, setIsScriptCopied] = useState(false)
  const missingShopCookie = !Cookies.get('shopOrigin')

  useEffect(() => {
    setOrderStatusScript(localStorage.getItem('pushScript'))
  }, [])

  const formValidation = Yup.object().shape({
    clientId: Yup.string().required('Client Id is Required!'),
    clientSecret: Yup.string().required('Client Secret is Required!'),
  })

  const handleSubmit = useCallback(
    (values) => {
      setServerError('')
      setIsLoading(true)

      axios
        .post(`${ONE_ACCOUNT_API_URL}/oauth/publisher/client-auth`, {
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

  return (
    <div style={{ padding: '0 2rem' }}>
      <Page>
        <Frame>
          {isLoading && <Loading />}
          <Layout>
            <Layout.Section>
              {orderStatusScript ? (
                <LegacyStack vertical spacing="loose">
                  <CopyField
                    label="Please copy this code and paste it in the Settings > Checkout > Order processing > Additional script"
                    value={orderStatusScript}
                    multiline
                  />
                  <LegacyStack spacing="loose">
                    <CopyToClipboard
                      text={orderStatusScript}
                      onCopy={showCopiedSnackBar}
                    >
                      <Button primary>Copy</Button>
                    </CopyToClipboard>
                    <Button secondary onClick={handleChangeDetails}>
                      Change Project Details
                    </Button>

                    {missingShopCookie && (
                      <ExceptionList
                        items={[
                          {
                            icon: AlertMinor,
                            description:
                              'Changing the project details requires reinstallation of the 1Account app.',
                          },
                        ]}
                      />
                    )}
                  </LegacyStack>
                </LegacyStack>
              ) : missingShopCookie ? (
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

              {isScriptCopied && (
                <Toast
                  content="Script was copied!"
                  onDismiss={hideCopiedSnackBar}
                  duration={3000}
                />
              )}
            </Layout.Section>
          </Layout>
        </Frame>
      </Page>
    </div>
  )
}
