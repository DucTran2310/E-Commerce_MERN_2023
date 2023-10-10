import instance from "~/utils/axiosConfig";

export const apiGetCategories = () => instance({
  url: '/productCategory/',
  method: 'get'
})