const productService = require('../service/productService')
const { sendResponse } = require('../utils/sendResponse')

const createProduct = async function (req, res) {
  const response = await productService.createProductService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createProduct
}
