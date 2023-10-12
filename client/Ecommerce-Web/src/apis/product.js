import EcommerceInstance from "~/utils/axiosConfig";

export const apiGetProducts = (params) => EcommerceInstance({
  url: '/product/',
  method: 'get',
  params
})