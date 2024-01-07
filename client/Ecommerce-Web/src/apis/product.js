import EcommerceInstance from "~/utils/axiosConfig";

export const apiGetProducts = (params) => EcommerceInstance({
  url: '/product/',
  method: 'get',
  params
})

export const apiGetDetailProduct = (pid) => EcommerceInstance({
  url: '/product/' + pid,
  method: 'get'
})

export const apiGetRatings = (data) => EcommerceInstance({
  url: '/product/ratings',
  method: 'put',
  data
})
