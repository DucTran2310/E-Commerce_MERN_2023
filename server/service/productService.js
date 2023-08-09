const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const {
  checkNullFieldCreateProduct
} = require('../utils/validate')

const createProductService = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info product',
      success: false,
      object: 'Bạn chưa nhập thông tin cho sản phẩm cần tạo'
    }
  }

  const { title, description, brand, price } = req.body

  if (!title || !description || !brand || !price) {
    return {
      error: true,
      errorReason: checkNullFieldCreateProduct(title, description, brand, price),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newProduct = await Product.create(req.body)

  return {
    error: newProduct ? false : true,
    errorReason: newProduct ? 'Created product successfully' : 'Create product failed',
    success: newProduct ? true : false,
    object: newProduct ? newProduct : 'Create product faild'
  }
})

const getProductService = asyncHandler(async (req, res) => {

  const { productID } = req.params

  const product = await Product.findById(productID)

  return {
    error: product ? false : true,
    errorReason: product ? 'Get detail product successfully' : 'Get detail product failed',
    success: product ? true : false,
    object: product ? product : 'Cannot get detail product'
  }
})

const getAllProductsService = asyncHandler(async (req, res) => {

  const product = await Product.find()

  return {
    error: product ? false : true,
    errorReason: product ? 'Get all products successfully' : 'Get all products failed',
    success: product ? true : false,
    object: product ? product : 'Cannot get all detail products'
  }
})

const updateProductService = asyncHandler(async (req, res) => {

  const { productID } = req.params
  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'Missing input',
      success: false,
      object: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

  const updatedProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true })

  return {
    error: updatedProduct ? false : true,
    errorReason: updatedProduct ? 'Update product successfully' : 'Update products failed',
    success: updatedProduct ? true : false,
    object: updatedProduct ? updatedProduct : 'Cannot update product'
  }
})

const deleteProductService = asyncHandler(async (req, res) => {
  const { productID } = req.params
  const deletedProduct = await Product.findByIdAndDelete(productID)
  return {
    error: true,
    errorReason: 'Cannot delete product',
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
  }
})

module.exports = {
  createProductService,
  getProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService
}
