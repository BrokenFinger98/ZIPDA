import axios from 'axios'
// console.log(import.meta.VITE_API_BASE_API)

const { VITE_API_BASE_URL } = import.meta.env;

const service = axios.create({
  baseURL: VITE_API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,
})

// Function to add the token to the Authorization header
export function setAuthToken(token) {
  service.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Function to remove the token from the Authorization header
export function removeAuthToken() {
  delete service.defaults.headers.common['Authorization']
}

export default service
