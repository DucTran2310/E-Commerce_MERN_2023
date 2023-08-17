const productCategory = require('../service/productCategoryService')
const { sendResponse } = require('../utils/sendResponse')

const createProductCategory = async function (req, res) {
  const response = await productCategory.createProductCategoryService(req, res)

  sendResponse(res, response)
}

const getProductCategories = async function (req, res) {
  const response = await productCategory.getProductCategoriesService(req, res)

  sendResponse(res, response)
}

const updateProductCategory = async function (req, res) {
  const response = await productCategory.updateProductCategoryService(req, res)

  sendResponse(res, response)
}

const deleteProductCategory = async function (req, res) {
  const response = await productCategory.deleteProductCategoryService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory
}
