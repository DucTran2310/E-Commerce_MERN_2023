import EcommerceInstance from "~/utils/axiosConfig";

export const apiRegister = (data) => EcommerceInstance({
  url: '/user/register',
  method: 'post',
  data
})

export const apiLogin = (data) => EcommerceInstance({
  url: '/user/login',
  method: 'post',
  data
})
