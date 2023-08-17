const blogCategory = require('../service/blogCategoryService')
const { sendResponse } = require('../utils/sendResponse')

const createBlogCategory = async function (req, res) {
  const response = await blogCategory.createBlogCategoryService(req, res)

  sendResponse(res, response)
}

const getBlogCategories = async function (req, res) {
  const response = await blogCategory.getBlogCategoriesService(req, res)

  sendResponse(res, response)
}

const updateBlogCategory = async function (req, res) {
  const response = await blogCategory.createBlogCategoryService(req, res)

  sendResponse(res, response)
}

const deleteBlogCategory = async function (req, res) {
  const response = await blogCategory.deleteBlogCategoryService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory
}
