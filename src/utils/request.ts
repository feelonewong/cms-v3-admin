import axios from 'axios'

const request = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL as string
  baseURL: '/front/ad/getAdList'
})
export default request
