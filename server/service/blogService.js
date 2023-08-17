const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')
const { checkNullFieldCreateBlog } = require('../utils/validate')

const createBlogService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info blog',
      success: false,
      object: 'Bạn chưa nhập thông tin cho bài viết cần tạo'
    }
  }

  const { title, description, category } = req.body

  if (!title || !description || !category) {
    return {
      error: true,
      errorReason: checkNullFieldCreateBlog(title, description, category),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }

  const response = await Blog.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created blog successfully' : 'Create blog failed',
    success: response ? true : false,
    object: response ? response : 'Create blog faild'
  }
})

const updateBlogService = asyncHandler(async (req, res) => {

  const { bid } = req.params

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info to update blog',
      success: false,
      object: 'Bạn chưa nhập thông tin để cập nhật bài viết'
    }
  }

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(Blog.schema.paths)

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

  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Updated blog successfully' : 'Updated blog failed',
    success: response ? true : false,
    object: response ? response : 'Updated blog faild'
  }
})

const getBlogsService = asyncHandler(async (req, res) => {

  const response = await Blog.find()

  return {
    error: response ? false : true,
    errorReason: response ? 'Get blogs successfully' : 'Get blogs failed',
    success: response ? true : false,
    object: response ? response : 'Get blogs failed'
  }
})

const deleteBlogService = asyncHandler(async (req, res) => {

  const { bid } = req.params

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(Blog.schema.paths)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('bid')) {
    return {
      error: true,
      errorReason: `Invalid blog ID: ${bid}`,
      success: false,
      object: `ID bài viết không hợp lệ: ${bid}`
    }
  }

  const response = await Blog.findByIdAndDelete(bid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete blog successfully' : 'Delete blog failed',
    success: response ? true : false,
    object: response ? response : 'Delete blog failed'
  }
})

// Like
// Dislike
/**
 * Khi người dùng like 1 bài viết:
 * Check xem trước đó người đó có dislike không? => bỏ dislike
 * Check xem trước đó người đó có like không? => có like => bỏ like, chưa => thêm like
 */

const likeBlogService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { bid } = req.params

  // Check if bid or user._id is missing
  if (!bid) {
    return {
      error: true,
      errorReason: 'Missing blog ID',
      success: false,
      toastMessage: 'Thiếu mã bài viết',
    };
  }

  const blog = await Blog.findById(bid)

  const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove dislike blog successfully' : 'Remove dislike blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Remove dislike blog failed',
    };
  }

  const isLiked = blog?.likes?.find(el => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove like blog successfully' : 'Remove like blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Remove like blog failed',
    };
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Like blog successfully' : 'Like blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Like blog failed',
    };
  }
})

const disLikeBlogService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { bid } = req.params

  // Check if bid or user._id is missing
  if (!bid) {
    return {
      error: true,
      errorReason: 'Missing blog ID',
      success: false,
      toastMessage: 'Thiếu mã bài viết',
    };
  }

  const blog = await Blog.findById(bid)

  const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove like blog successfully' : 'Remove like blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Remove like blog failed',
    };
  }

  const isLiked = blog?.dislikes?.find(el => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove dislike blog successfully' : 'Remove dislike blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Remove dislike blog failed',
    };
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Dislike blog successfully' : 'Dislike blog failed',
      success: response ? true : false,
      toastMessage: response ? response : 'Dislike blog failed',
    };
  }
})

const getDetailBlogService = asyncHandler(async (req, res) => {
  const { bid } = req.params

  // Check if bid or user._id is missing
  if (!bid) {
    return {
      error: true,
      errorReason: 'Missing blog ID',
      success: false,
      toastMessage: 'Thiếu mã bài viết',
    };
  }

  const excludeFields = '-password -refreshToken -role -createdAt -updatedAt -passwordResetExpire'
  const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate('likes', excludeFields)
    .populate('dislikes', excludeFields)

  return {
    error: blog ? false : true,
    errorReason: blog ? 'Get detail successfully' : 'Do not get detail blog',
    success: blog ? true : false,
    toastMessage: blog ? blog : 'Không lấy được thông tin chi tiết của bài viết',
  };

})

module.exports = {
  createBlogService,
  getBlogsService,
  updateBlogService,
  deleteBlogService,
  likeBlogService,
  disLikeBlogService,
  getDetailBlogService
}
