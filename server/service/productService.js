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
    errorReason: newProduct ? 'Created product successfully' : 'Create product faild',
    success: newProduct ? true : false,
    object: newProduct ? newProduct : 'Create product faild'
  }
})

module.exports = {
  createProductService
}
