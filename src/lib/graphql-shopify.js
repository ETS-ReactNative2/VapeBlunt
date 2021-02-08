import axios from 'axios'

let baseUrl = 'https://vapeblunt.info'
baseUrl = 'http://192.168.10.185:8080'

export async function newProducts(){
  try{
    const response = await axios.get(baseUrl+'/api/newproducts');
    return response.data;
  }catch(e){
    console.log("Error fetching new products", e)
  }
}

export async function bestSellers() {
  try{
    const response = await axios.get(baseUrl+'/api/bestsellers');
    return response.data;
  }catch(e){
    console.log("Error fetching best sellers", e)
    return [];
  }
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

export async function productsInfo(products_id){
  let request = {
    method: 'GET',
    url: baseUrl + '/api/products',
    params: {
      ids: products_id,
    }
  }
  return axios(request).then(({data}) => (data))
}