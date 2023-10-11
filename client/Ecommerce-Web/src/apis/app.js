import EcommerceInstance from "~/utils/axiosConfig";

export const apiGetCategories = () => EcommerceInstance({
  url: '/productCategory/',
  method: 'get'
})