import axios from 'axios';

axios.defaults.withCredentials = true

const EcommerceInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URI,
  withCredentials: true
});

// Add a request interceptor
EcommerceInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let localStorageData = window.localStorage.getItem('persist:shop/user')
  if (localStorageData && typeof localStorageData === 'string') {
    localStorageData = JSON.parse(localStorageData)
    const accessToken = JSON.parse(localStorageData?.token)
    config.headers = {authorization: `Bearer ${accessToken }`}
    return config
  } else return config
 
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
EcommerceInstance.interceptors.response.use(function (response) {
  // Any status code that lies within the range of 2xx will trigger this function
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that fall outside the range of 2xx will trigger this function
  // Do something with response error
  return error.response.data;
});

export default EcommerceInstance;