import EcommerceInstance from "~/utils/axiosConfig";

export const apiRegister = (data) => EcommerceInstance({
  url: '/user/register',
  method: 'post',
  data,
  withCredentials: true
})

export const apiFinalRegister = (token) => EcommerceInstance({
  url: '/user/finalregister/' + token,
  method: 'put' 
})

export const apiLogin = (data) => EcommerceInstance({
  url: '/user/login',
  method: 'post',
  data
})

export const apiForgotPassword = (data) => EcommerceInstance({
  url: '/user/forgotpassword',
  method: 'post',
  data
})

export const apiResetPassword = (data) => EcommerceInstance({
  url: '/user/resetpassword',
  method: 'put',
  data
})
