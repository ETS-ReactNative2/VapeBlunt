import axios from 'axios'

let baseUrl = 'http://vapeblunt.info'


export function newProducts(){
  return axios.get(baseUrl+'/api/newproducts').then(({data}) => (data))
}


export function bestSellers() {
  return axios.get(baseUrl+'/api/bestsellers').then(({data}) => (data))
}


export function loadCollectionProducts(collection_id) {
  let vapeBluntPOST = {
    method: 'POST',
    url: baseUrl + '/api/loadcollectionproducts',
    data: {
      id: collection_id,
    }
  }
  return axios(vapeBluntPOST).then(({data})=>(data))
}


export async function productInfo(product_id){
  let vapeBluntPOST = {
    method: 'POST',
    url: baseUrl + '/api/productinfo',
    data: {
      id: product_id,
    }
  }
  return axios(vapeBluntPOST).then(({data}) => (data))
}
