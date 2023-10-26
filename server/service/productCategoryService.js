const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createProductCategoryService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info product category',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cho nhóm sản phẩm cần tạo'
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
      toastMessage: 'Loại sản phẩm đã tồn tại'
    }
  }

  const response = await ProductCategory.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created product category successfully' : 'Create product category failed',
    success: response ? true : false,
    toastMessage: response ? 'Tạo loại sản phẩm thành công' : 'Tạo loại sản phẩm thất bại',
    object: response ? response : null
  }
})

const getProductCategoriesService = asyncHandler(async (req, res) => {

  const response = await ProductCategory.find()

  return {
    error: response ? false : true,
    errorReason: response ? 'Get product categories successfully' : 'Get product categories failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy danh sách loại sản phẩm thành công' : 'Lấy danh sách loại sản phẩm thất bại',
    object: response ? response : []
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
        toastMessage: `Key "${key}" không tồn tại để cập nhật`
      }
    }
  }

  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update product category successfully' : 'Update product category failed',
    success: response ? true : false,
    toastMessage: response ? 'Cập nhật loại sản phẩm thành công' : 'Cập nhật loại sản phẩm thất bại',
    object: response ? response : null
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
      toastMessage: `ID nhóm sản phẩm không hợp lệ: ${pcid}`
    }
  }

  const response = await ProductCategory.findByIdAndDelete(pcid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete product category successfully' : 'Delete product category failed',
    success: response ? true : false,
    toastMessage: response ? 'Xóa loại sản phẩm thành công' : 'Xóa loại sản phẩm thất bại',
    object: response ? response : null
  }
})

module.exports = {
  createProductCategoryService,
  getProductCategoriesService,
  updateProductCategoryService,
  deleteProductCategoryService
}
