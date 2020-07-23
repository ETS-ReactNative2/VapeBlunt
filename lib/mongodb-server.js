import axios from 'axios'

let baseUrl = 'https://vapeblunt.info'

export function loadBlogsCollection(){
  return axios.get(baseUrl+'/api/blogs').then(({data}) => (data))
}

export function loadNewsCollection() {
  return axios.get(baseUrl+'/api/news').then(({data}) => (data))
}



