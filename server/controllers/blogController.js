const blog = require('../service/blogService')
const { sendResponse } = require('../utils/sendResponse')

const createNewBlog = async function (req, res) {
  const response = await blog.createBlogService(req, res)

  sendResponse(res, response)
}

const getBlogs = async function (req, res) {
  const response = await blog.getBlogsService(req, res)

  sendResponse(res, response)
}

const updateBlog = async function (req, res) {
  const response = await blog.updateBlogService(req, res)

  sendResponse(res, response)
}

const deleteBlog = async function (req, res) {
  const response = await blog.deleteBlogService(req, res)

  sendResponse(res, response)
}

const likeBlog = async function (req, res) {
  const response = await blog.likeBlogService(req, res)

  sendResponse(res, response)
}

const disLikeBlog = async function (req, res) {
  const response = await blog.disLikeBlogService(req, res)

  sendResponse(res, response)
}

const getDetailBlog = async function (req, res) {
  const response = await blog.getDetailBlogService(req, res)

  sendResponse(res, response)
}

const uploadImageBlog = async function (req, res) {
  const response = await blog.uploadImageBlogService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createNewBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  getDetailBlog,
  uploadImageBlog
}
