import axios from 'axios'

let baseUrl = 'https://vapeblunt.info'
baseUrl = 'http:192.168.10.185:8080'

export async function loadBlogsCollection(){
  try{
    const response = await axios.get(baseUrl+'/api/blogs');
    return response.data;
  }catch(e){
    return [];
  }
}

export async function loadNewsCollection() {
  try{
    const response = await axios.get(baseUrl+'/api/news');
    return response.data;
  }catch(e){
    return [];
  }
}


