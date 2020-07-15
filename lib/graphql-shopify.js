import axios from 'axios'

let baseUrl = 'http://vapeblunt.info'

let vapeBluntPOST = {
  method: 'POST',
  url: 'http://vapeblunt.info',
  data: {
    id: '327160528920',
  }
}

export function newProducts(){
  return axios.get(baseUrl+'/api/newproducts').then(({data}) => (data))
}


export function bestSellers() {
  return axios.get(baseUrl+'/api/bestsellers').then(({data}) => (data))
}

export function loadCollectionProducts(collection_id) {
  vapeBluntPOST.url = baseUrl+'/api/loadcollectionproducts'
  vapeBluntPOST.data.id = collection_id
  return axios(vapeBluntPOST).then(({data})=>(data))
}

export function productInfo(product_id){
  vapeBluntPOST.url = baseUrl+'/api/productinfo'
  vapeBluntPOST.data.id = product_id 
  return axios(vapeBluntPOST).then(({data})=>(data))
}

