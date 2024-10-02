import {
  reactExtension,
  useApi,
  Button,
  Link,
  Modal,
  TextBlock,
} from '@shopify/ui-extensions-react/checkout';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';

const orderDetailsBlock = reactExtension("purchase.thank-you.block.render", () => <ProductReview />);
export { orderDetailsBlock };

function ProductReview() { 

          const buyerJourney = useApi();   
          
                  /* GET GRAPH QL QUERY WITHOUT ITERATING FULL ARRAY  */
                  const {query} = useApi();

                  /* GET LINE ITEMS WITHOUT ITERATING FULL ARRAY */
                  const {lines} = useApi();
                  

                  /* GET SHIPPING AND BILLING INFO WITHOUT ITERATING FULL ARRAY */
                  const [productIds, setProductIds] = useState([]);
                  const [allTags, setAllTags] = useState([]);

                  
          if( buyerJourney.shippingAddress !== undefined ){  

                  /* WE GET shippingAddress - countryCode HERE */
                  const shipping_Country = buyerJourney.shippingAddress.current.countryCode;
                  /* WE GET billingAddress - countryCode HERE */
                  const billing_Country = buyerJourney.billingAddress.current.countryCode;

                  /* ALLOWED THIS CONTRY  */
                  const allowed_country = ['GB','GG','IM','JE'];
                

                /* IF THIS COUNTRY MATCHED THEN GOING TO IF LOOP */
                if (allowed_country.includes(shipping_Country) || allowed_country.includes(billing_Country)) 
                {

                                    /* GET LIST OF PRODUCT IDS START */
                                    useEffect(() => {
                                      
                                      /* Check if `lines.current` exists and has products, and also if `productIds` is empty */
                                      if (lines.current && lines.current.length > 0 && productIds.length === 0) {
                                        /* Extract product IDs from lines */
                                        const ids = lines.current.map(line => line.merchandise.product.id);
                                  
                                        /* Check if the new product IDs differ from the existing `productIds` state  */ 
                                        if (ids.length !== productIds.length || !ids.every((id, index) => id === productIds[index])) {
                                          setProductIds(ids); /* Update product IDs only if they are different */ 
                                        }
                                      }

                                      const fetchProductTags = async () => {
                                        const tagsArray = [];
                                  
                                        /* Loop through all product IDs and fetch tags for each product */
                                        for (const productId of productIds) {
                                          try {
                                            const { data, errors } = await query(
                                              `query ($id: ID!){
                                                product(id: $id) {          
                                                  tags
                                                }
                                              }`,
                                              {
                                                variables: { id: productId },
                                              }
                                            );
                                  
                                            /* Only add the tags if they are defined and not empty */
                                            if (data && data.product && data.product.tags) {
                                              tagsArray.push(...data.product.tags);
                                            }
                                          } catch (error) {
                                            console.error(error);
                                          }
                                        }
                                        
                                        /* Store all tags with duplicates in state */
                                        setAllTags(tagsArray);
                                      };
                                  
                                      fetchProductTags();

                                    }, [lines, productIds]);
                            
                                    /* GET LIST OF PRODUCT IDS END */
                                  
                                  const skipAvTags = allTags.filter(tag => tag.toLowerCase() === 'skip_av').length;
                                  const productCount = productIds.length;                         

                                  if (skipAvTags < productCount) { 

                                    console.log('Country is allowed.');        
                                    console.log('skip_av is found'); 

                                    return (
                                      <Link
                                        
                                        overlay={
                                          <Modal
                                            id="my-modal"                                            
                                            padding
                                            title="Return policy"
                                          >
                                            <TextBlock>
                                              We have a 30-day return policy, which
                                              means you have 30 days after receiving
                                              your item to request a return.
                                            </TextBlock>
                                            <TextBlock>
                                              To be eligible for a return, your item
                                              must be in the same condition that you
                                              received it, unworn or unused, with
                                              tags, and in its original packaging.
                                              You’ll also need the receipt or proof
                                              of purchase.
                                            </TextBlock>
                                            <Button
                                              onPress={() =>
                                                ui.overlay.close('my-modal')
                                              }
                                            >
                                              Close
                                            </Button>
                                          </Modal>
                                        }
                                      >
                                        Open Modal
                                      </Link>
                                    );



                                  } else {
                                    console.log('Tag skip_av not found');
                                  }

                          // console.log('TAGS 5');
                          // console.log(allTags);
                          // console.log('PRODUCT TITLE ALL 6');
                          // console.log(productIds.length);

                } else {

                            /* COUNTRY IS NOT MATCHED */             
                            console.log('Country is not allowed.'+shipping_Country);    
                            console.log('Country is not allowed.'+billing_Country);        
                  }   
                  
          }else{
                  console.log('Extension not loaded');
              }
}
