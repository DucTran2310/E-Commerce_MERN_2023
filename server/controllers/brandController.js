const brand = require('../service/brandService')
const { sendResponse } = require('../utils/sendResponse')

const createBrand = async function (req, res) {
  const response = await brand.createBrandService(req, res)

  sendResponse(res, response)
}

const getBrands = async function (req, res) {
  const response = await brand.getBrandsService(req, res)

  sendResponse(res, response)
}

const updateBrand = async function (req, res) {
  const response = await brand.updateBrandService(req, res)

  sendResponse(res, response)
}

const deleteBrand = async function (req, res) {
  const response = await brand.deleteBrandService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand
}
