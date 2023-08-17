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
      object: 'Blog category already exists'
    }
  }

  const response = await BlogCategory.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created blog category successfully' : 'Create blog category failed',
    success: response ? true : false,
    object: response ? response : 'Create blog category faild'
  }
})

const getBlogCategoriesService = asyncHandler(async (req, res) => {

  const response = await BlogCategory.find().select('title _id')

  return {
    error: response ? false : true,
    errorReason: response ? 'Get blog categories successfully' : 'Get blog categories failed',
    success: response ? true : false,
    object: response ? response : 'Get blog categories failed'
  }
})

const updateBlogCategoryService = asyncHandler(async (req, res) => {

  const { bcid } = req.params

  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update blog categoriy successfully' : 'Update blog categoriy failed',
    success: response ? true : false,
    object: response ? response : 'Update blog category failed'
  }
})

const deleteBlogCategoryService = asyncHandler(async (req, res) => {

  const { bcid } = req.params

  const response = await BlogCategory.findByIdAndDelete(bcid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete blog categoriy successfully' : 'Delete blog categoriy failed',
    success: response ? true : false,
    object: response ? response : 'Delete blog category failed'
  }
})

module.exports = {
  createBlogCategoryService,
  getBlogCategoriesService,
  updateBlogCategoryService,
  deleteBlogCategoryService
}
