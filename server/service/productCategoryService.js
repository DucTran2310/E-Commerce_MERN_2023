const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createProductCategoryService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info product category',
      success: false,
      object: 'Bạn chưa nhập thông tin cho nhóm sản phẩm cần tạo'
    }
  }

  const { title } = req.body

  if (!title) {
    return {
      error: true,
      errorReason: 'Bạn chưa nhập tiêu đề',
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }

  // Check if product category already exists
  const existingCategory = await ProductCategory.findOne({ title: title });
  if (existingCategory) {
    return {
      error: true,
      errorReason: 'Product category already exists',
      success: false,
      object: 'Product category already exists'
    }
  }

  const response = await ProductCategory.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created product category successfully' : 'Create product category failed',
    success: response ? true : false,
    object: response ? response : 'Create product category faild'
  }
})

const getProductCategoriesService = asyncHandler(async (req, res) => {

  const response = await ProductCategory.find().select('title _id')

  return {
    error: response ? false : true,
    errorReason: response ? 'Get product categories successfully' : 'Get product categories failed',
    success: response ? true : false,
    object: response ? response : 'Get product categories failed'
  }
})

const updateProductCategoryService = asyncHandler(async (req, res) => {

  const { pcid } = req.params

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(ProductCategory.schema.paths)

  // Check if the keys in req.body are in the schema keys
  for (let key in req.body) {
    if (!schemaKeys.includes(key)) {
      return {
        error: true,
        errorReason: `Key "${key}" does not exist for updating`,
        success: false,
        object: `Key "${key}" không tồn tại để cập nhật`
      }
    }
  }

  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update product category successfully' : 'Update product category failed',
    success: response ? true : false,
    object: response ? response : 'Update product category failed'
  }
})

const deleteProductCategoryService = asyncHandler(async (req, res) => {

  const { pcid } = req.params

  // Get the schema keys of the Product Category model
  const schemaKeys = Object.keys(ProductCategory.schema.paths)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('pcid')) {
    return {
      error: true,
      errorReason: `Invalid product category ID: ${pcid}`,
      success: false,
      object: `ID nhóm sản phẩm không hợp lệ: ${pcid}`
    }
  }

  const response = await ProductCategory.findByIdAndDelete(pcid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete product category successfully' : 'Delete product category failed',
    success: response ? true : false,
    object: response ? response : 'Delete product category failed'
  }
})

module.exports = {
  createProductCategoryService,
  getProductCategoriesService,
  updateProductCategoryService,
  deleteProductCategoryService
}
