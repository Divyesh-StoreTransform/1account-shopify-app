import {
  reactExtension,
  useApi,  
} from '@shopify/ui-extensions-react/checkout';
import {useCallback, useEffect, useState} from 'react';

const orderDetailsBlock = reactExtension("purchase.thank-you.cart-line-item.render-after", () => <ProductReview />);
export { orderDetailsBlock };

function ProductReview() {

  // const lineComponents = useApi();   
  const buyerJourney = useApi();   

  /* WE GET shippingAddress - countryCode HERE */
  const shipping_Country = buyerJourney.shippingAddress.current.countryCode;
  /* WE GET billingAddress - countryCode HERE */
  const billing_Country = buyerJourney.billingAddress.current.countryCode;

  /* ALLOWED THIS CONTRY  */
  const allowed_country = ['GB','GG','IM','JE'];

  /* IF THIS COUNTRY MATCHED THEN GOING TO IF LOOP */
  if (allowed_country.includes(shipping_Country) || allowed_country.includes(billing_Country)) {

        
        console.log('Shipping or billing country is allowed.');

  } else {

            /* COUNTRY IS NOT MATCHED */             
            console.log('Country is not allowed.'+shipping_Country);    
            console.log('Country is not allowed.'+billing_Country);        
  }

  // console.log(shop.myshopifyDomain);
  // console.log(shop.storefrontUrl);
  // console.log(shop.name); 
  
}


