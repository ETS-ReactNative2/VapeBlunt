
import axios from 'axios';
import { axiosOptions } from './config';

export async function createCheckout(checkout_info) {
  const {
    email,
    name,
    lastName,
    address,
    postalCode,
    city,
    province,
    country,
    phoneNumber,
    lineItems,
  } = checkout_info;
  //Query
  axiosOptions.url = 'https://vapebluntmexico.myshopify.com/api/2021-04/graphql.json';
  axiosOptions.headers['Content-Type'] = 'application/json'

  axiosOptions.data = {
    query: `mutation checkoutCreate($checkout: CheckoutCreateInput!) {
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
          lineItems(first: 10){
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }`,
    variables: {
      "checkout": {
        "email": `${email}`,
        "lineItems": lineItems,
        "shippingAddress": {
          "firstName": `${name}`,
          "lastName": `${lastName}`,
          "address1": `${address}`,
          "address2": ``,
          "zip": `${postalCode}`,
          "city": `${city}`,
          "province": `${province}`,
          "country": `${country}`,
          "phone": `${phoneNumber}`
        }
      }
    },
    "operationName":"checkoutCreate"
  }
  //console.log("Sending to checkout", axiosOptions.data.variables);
  axiosOptions.data = JSON.stringify(axiosOptions.data)

  try{
    const { data } = await axios(axiosOptions)
    const { checkout, checkoutUserErrors } = data.data.checkoutCreate;
    if(checkoutUserErrors.length > 0){
      return Promise.reject(checkoutUserErrors)
    }
    return checkout;
  }catch(e){
    return Promise.reject([e])
  }
}
