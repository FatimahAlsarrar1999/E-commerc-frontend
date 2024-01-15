import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'http://localhost:3002/'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:3002/'
}

const api = axios.create({
  baseURL
})

export default api
