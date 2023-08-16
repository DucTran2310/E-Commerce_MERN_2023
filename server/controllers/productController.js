const productService = require('../service/productService')
const { sendResponse } = require('../utils/sendResponse')

const createProduct = async function (req, res) {
  const response = await productService.createProductService(req, res)

  sendResponse(res, response)
}

const getProduct = async function (req, res) {
  const response = await productService.getProductService(req, res)

  sendResponse(res, response)
}

const getAllProductsDetail = async function (req, res) {
  const response = await productService.getAllProductsService(req, res)

  sendResponse(res, response)
}

const updateProduct = async function (req, res) {
  const response = await productService.updateProductService(req, res)

  sendResponse(res, response)
}

const deleteProduct = async function (req, res) {
  const response = await productService.deleteProductService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createProduct,
  getProduct,
  getAllProductsDetail,
  updateProduct,
  deleteProduct
}
