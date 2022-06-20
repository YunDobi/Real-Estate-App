import axios from "axios";

export const baseURL = 'https://bayut.p.rapidapi.com'


export const fetchAPI = async (url) => {
  const {data} =  await axios.get(url, {
    headers: {
      'X-RapidAPI-Key': 'e8d6c2fd03msh66bf61617e980abp136823jsn6a763ce3d902',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  })
  return data;
}