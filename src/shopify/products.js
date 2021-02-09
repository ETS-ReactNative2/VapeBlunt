import axios from 'axios';
import { axiosOptions } from './config';
import { destructureEdges } from './helpers';

function extractImages(images){
  if(!images){
    return [];
  }
  const extractor = (node) => node.transformedSrc;
  return destructureEdges(images.edges, extractor);
}

function extractVariants(variants){
  const extractor = (node) => ({
    ...node,
    price: node.priceV2.amount,
    image: node.image.transformedSrc,
  })
  return destructureEdges(variants.edges, extractor);
}

function populateProduct(product){
  let {
    title,
    totalInventory,
    images,
    variants,
    metafields,
  } = product;
  
  if(images){
    product.images = extractImages(images);
    product.image = product.images[0];
  }

  if(variants){
    product.variants = extractVariants(variants);
  }
  
  let rating = 4;
  if(metafields){
    const nodes = destructureEdges(metafields);
    for(let i=0; i < nodes.length; i++){
      const node = nodes[i];
      if (node.key === 'reviews_average') {
        rating = parseFloat(node.value)
        if (rating % 0.5 !== 0) {
          rating = Math.round(rating)
        }
      }
    }
  }
  product.rating = rating;
  return product;
}


export async function newProducts(first = 5) {
  //Query
  axiosOptions.data = `
  query NewProducts{
    products(first: ${first}, reverse: true, query: "available_for_sale:true AND product_type:Vap*") {
      edges {
        node{
          id
          title
          handle
          totalInventory
          images(first: 1){
            edges{
              node{
                transformedSrc
              }
            }
          }
          metafields(first: 10) {
            edges {
              node {
                id
                key
                value
              }
            }
          }
        }
      }
    }
  }`

  try{
    const { data } = await axios(axiosOptions)
    const { edges } = data.data.products;
    return destructureEdges(edges, populateProduct);
  }catch(e){
    console.log("Axios request error", e);
    return [];
  }
}


async function bestSellers(first = 10) {
  return loadCollectionProducts('mas-vendidos', first);
}

async function loadCollectionProducts(handle, first = 250) {
  //Query
  axiosOptions.data = `
  {
    collectionByHandle(handle: "${handle}") {
      products(first: ${first}, sortKey: BEST_SELLING) {
        edges {
          node{
            id
            title
            handle
            totalInventory
            images(first: 1){
              edges{
                node{
                  transformedSrc
                }
              }
            }
          }
        }
      }
    }
  }
  `

  try{
    const { data } = await axios(axiosOptions)
    const { edges } = data.data.collectionByHandle.products;
    return destructureEdges(edges, populateProduct);
  }catch(e){
    console.log("Axios request error", e);
    return [];
  }
}

export async function productInfo(handle) {
  if(!handle) return Promise.reject('Handle not provided')
  axiosOptions.data = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml
      onlineStoreUrl
      images(first: 10) {
        edges {
          node {
            transformedSrc
          }
        }
      }
      variants(first: 15) {
        edges {
          node {
            priceV2 {
              amount
            }
            title
            availableForSale
            quantityAvailable
            image {
              transformedSrc
            }
          }
        }
      }
      metafields(first: 10) {
        edges {
          node {
            id
            key
            value
          }
        }
      }
    }
  }
  `
  //return Promise with unwrapped data
  try{
    const {data} = await axios(axiosOptions);
    let product = data.data.productByHandle;
    return Promise.resolve(populateProduct(product));
  }catch(e){
    return Promise.reject(`Request error ${e}`)
  }
}

export async function getBlogs(){
  return Promise.resolve([])
}

export async function getNews(){
  return Promise.resolve([])
}

module.exports = {
  newProducts,
  bestSellers,
  loadCollectionProducts,
  productInfo,
  getBlogs,
  getNews,
}