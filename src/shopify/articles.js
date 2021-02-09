import axios from 'axios';
import { axiosOptions } from './config';
import { destructureEdges } from './helpers';

function populateArticle(article){
  if(article.image){
    article.image = article.image.transformedSrc;
  }
  return article;
}

export async function getArticles(first = 20) {
  //Query
  axiosOptions.data = `
  {
    blogByHandle(handle: "vapebluntmexico"){
      articles(first: 20, reverse: true, sortKey: PUBLISHED_AT){
        edges{
          node{
            publishedAt
            handle
            image{
              transformedSrc
            }
            title
            url
            content
          }
        } 
      }
    }
  }`

  try{
    const { data } = await axios(axiosOptions)
    const { edges } = data.data.blogByHandle.articles;
    return destructureEdges(edges, populateArticle);
  }catch(e){
    return Promise.reject(`Request error ${e}`)
  }
}

module.exports = {
  getArticles
}