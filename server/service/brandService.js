const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrandService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info brand',
      success: false,
      object: 'Bạn chưa nhập thông tin cho thương hiệu cần tạo'
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

  // Check if brand  already exists
  const existingCategory = await Brand.findOne({ title: title });
  if (existingCategory) {
    return {
      error: true,
      errorReason: 'Brand already exists',
      success: false,
      object: 'Brand already exists'
    }
  }

  const response = await Brand.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created brand successfully' : 'Create brand failed',
    success: response ? true : false,
    object: response ? response : 'Create brand faild'
  }
})

const getBrandsService = asyncHandler(async (req, res) => {

  const response = await Brand.find().select('title _id')

  return {
    error: response ? false : true,
    errorReason: response ? 'Get brand successfully' : 'Get brand failed',
    success: response ? true : false,
    object: response ? response : 'Get brand failed'
  }
})

const updateBrandService = asyncHandler(async (req, res) => {

  const { brid } = req.params

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(Brand.schema.paths)

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

  const response = await Brand.findByIdAndUpdate(brid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update brand successfully' : 'Update brand failed',
    success: response ? true : false,
    object: response ? response : 'Update brand failed'
  }
})

const deleteBrandService = asyncHandler(async (req, res) => {

  const { brid } = req.params

  // Get the schema keys of the Brand Category model
  const schemaKeys = Object.keys(Brand.schema.paths)
  console.log('schemaKeys', schemaKeys)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('_id')) {
    return {
      error: true,
      errorReason: `Invalid brand  ID: ${brid}`,
      success: false,
      object: `ID nhóm sản phẩm không hợp lệ: ${brid}`
    }
  }

  const response = await Brand.findByIdAndDelete(brid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete brand successfully' : 'Delete brand failed',
    success: response ? true : false,
    object: response ? response : 'Delete brand  failed'
  }
})

module.exports = {
  createBrandService,
  getBrandsService,
  updateBrandService,
  deleteBrandService
}