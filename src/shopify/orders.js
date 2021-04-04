
import axios from 'axios';
import { axiosOptions } from './config';

export async function createCheckout(checkout_info) {
  const {
    email,
    firstName,
    lastName,
    address,
    zip,
    city,
    province,
    country,
    phone,
  } = checkout_info;
  //Query
  axiosOptions.url = 'https://vapebluntmexico.myshopify.com/api/2021-04/graphql.json';

  axiosOptions.data = `
  {
    "query": "mutation checkoutCreate($checkout: CheckoutCreateInput!) {
      checkoutCreate(input: $checkout) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
        checkout {
          id
          webUrl
          lineItems(first: 5){
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }",
    "variables": {
      "checkout": {
        "email": "${email}",
        "lineItems": [{"quantity":1,"variantId":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODQxMDI3ODMzODc0MQ=="}],
        "shippingAddress": {
          "firstName": "${firstName}",
          "lastName": "${lastName}",
          "address1": "${address}",
          "zip": "${zip}",
          "city": "${city}",
          "province": "${province}",
          "country": "${country}",
          "phone": "${phone}"
        }
      }
    },
    "operationName":"checkoutCreate"
  }`

  try{
    const { data } = await axios(axiosOptions)
    const { checkout, checkoutUserErrors } = data.data.checkoutCreate;
    return checkout;
  }catch(e){
    return Promise.reject(`Request error ${e}`)
  }
}
