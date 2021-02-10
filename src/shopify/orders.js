
import axios from 'axios';
import { axiosOptions } from './config';
import { destructureEdges } from './helpers';

export async function createCheckout() {
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
        "email": "correo electronico",
        "lineItems": [{"quantity":1,"variantId":"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODQxMDI3ODMzODc0MQ=="}],
        "shippingAddress": {
          "firstName": "Nombre",
          "lastName": "Apellido",
          "address1": "Direccion completa",
          "zip": "Codigo postal",
          "city": "Ciudad",
          "province": "Estado",
          "country": "México",
          "phone": "telefono"
        }
      }
    },
    "operationName":"checkoutCreate"
  }
`

  try{
    const { data } = await axios(axiosOptions)
    const { checkout, checkoutUserErrors } = data.data.ceckoutCreate;
    return checkout;
  }catch(e){
    return Promise.reject(`Request error ${e}`)
  }
}