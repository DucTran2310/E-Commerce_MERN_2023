const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategoryService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info blog category',
      success: false,
      object: 'Bạn chưa nhập thông tin cho nhóm bài viết cần tạo'
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

  // Check if blog category already exists
  const existingCategory = await BlogCategory.findOne({ title: title });
  if (existingCategory) {
    return {
      error: true,
      errorReason: 'Blog category already exists',
      success: false,
      toastMessage: 'Loại bài đăng đã tồn tại'
    }
  }

  const response = await BlogCategory.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created blog category successfully' : 'Create blog category failed',
    success: response ? true : false,
    toastMessage: response ? 'Tạo loại bài đăng thành công' : 'Tạo loại bài đăng thất bại',
    object: response ? response : null
  }
})

const getBlogCategoriesService = asyncHandler(async (req, res) => {

  const response = await BlogCategory.find().select('title _id')

  return {
    error: response ? false : true,
    errorReason: response ? 'Get blog categories successfully' : 'Get blog categories failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy danh sách loại bài đăng thành công' : 'Lấy danh sách loại bài đăng thất bại',
    object: response ? response : []
  }
})

const updateBlogCategoryService = asyncHandler(async (req, res) => {

  const { bcid } = req.params

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(BlogCategory.schema.paths)

  // Check if the keys in req.body are in the schema keys
  for (let key in req.body) {
    if (!schemaKeys.includes(key)) {
      return {
        error: true,
        errorReason: `Key "${key}" does not exist for updating`,
        success: false,
        toastMessage: `Key "${key}" không tồn tại để cập nhật`,
        object: null
      }
    }
  }

  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update blog categoriy successfully' : 'Update blog categoriy failed',
    success: response ? true : false,
    toastMessage: response ? 'Cập nhật loại bài đăng thành công' : 'Cập nhật loại bài đăng thất bại',
    object: response ? response : null
  }
})

const deleteBlogCategoryService = asyncHandler(async (req, res) => {

  const { bcid } = req.params

  // Get the schema keys of the Blog Category model
  const schemaKeys = Object.keys(BlogCategory.schema.paths)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('bcid')) {
    return {
      error: true,
      errorReason: `Invalid blog category ID: ${bcid}`,
      success: false,
      toastMessage: `ID nhóm bài viết không hợp lệ: ${bcid}`,
      object: null
    }
  }

  const response = await BlogCategory.findByIdAndDelete(bcid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete blog category successfully' : 'Delete blog category failed',
    success: response ? true : false,
    toastMessage: response ? 'Xóa loại bài đăng thành công' : 'Xóa loại bài đăng thất bại',
    object: response ? response : null
  }
})

module.exports = {
  createBlogCategoryService,
  getBlogCategoriesService,
  updateBlogCategoryService,
  deleteBlogCategoryService
}
