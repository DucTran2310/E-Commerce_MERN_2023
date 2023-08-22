const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')
const { checkNullFieldCreateBlog } = require('../utils/validate')

const createBlogService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info blog',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cho bài viết cần tạo',
      object: null
    }
  }

  const { title, description, category } = req.body

  if (!title || !description || !category) {
    return {
      error: true,
      errorReason: checkNullFieldCreateBlog(title, description, category),
      success: false,
      toastMessage: 'Thông tin không được để trống.',
    }
  }

  const response = await Blog.create(req.body)

  return {
    error: response ? false : true,
    errorReason: response ? 'Created blog successfully' : 'Create blog failed',
    success: response ? true : false,
    toastMessage: response ? 'Tạo bài viết thành công' : 'Tạo bài viết thất bại',
    object: response ? response : null
  }
})

const updateBlogService = asyncHandler(async (req, res) => {

  const { bid } = req.params

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info to update blog',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin để cập nhật bài viết',
      object: null
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
        toastMessage: `Key "${key}" không tồn tại để cập nhật`,
        object: null
      }
    }
  }

  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Updated blog successfully' : 'Updated blog failed',
    success: response ? true : false,
    toastMessage: response ? 'Cập nhật bài viết thành công' : 'Cập nhật bài viết thất bại',
    object: response ? response : null
  }
})

const getBlogsService = asyncHandler(async (req, res) => {

  const response = await Blog.find()

  return {
    error: response ? false : true,
    errorReason: response ? 'Get blogs successfully' : 'Get blogs failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy danh sách bài viết thành công' : 'Lấy danh sách bài viết thất bại',
    object: response ? response : []
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
      toastMessage: `ID bài viết không hợp lệ: ${bid}`,
      object: null
    }
  }

  const response = await Blog.findByIdAndDelete(bid)

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete blog successfully' : 'Delete blog failed',
    success: response ? true : false,
    toastMessage: response ? 'Xóa bài viết thành công' : 'Xóa bài viết thất bại',
    object: response ? response : null
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
      toastMessage: response ? 'Remove dislike blog success' : 'Remove dislike blog failed',
      object: response ? response : null
    };
  }

  const isLiked = blog?.likes?.find(el => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove like blog successfully' : 'Remove like blog failed',
      success: response ? true : false,
      toastMessage: response ? 'Remove like blog success' : 'Remove like blog failed',
      object: response ? response : null
    };
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Like blog successfully' : 'Like blog failed',
      success: response ? true : false,
      toastMessage: response ? 'Like blog success' : 'Like blog failed',
      object: response ? response : null
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
      toastMessage: response ? 'Remove like blog success' : 'Remove like blog failed',
      object: response ? response : null
    };
  }

  const isLiked = blog?.dislikes?.find(el => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Remove dislike blog successfully' : 'Remove dislike blog failed',
      success: response ? true : false,
      toastMessage: response ? 'Remove dislike blog success' : 'Remove dislike blog failed',
      object: response ? response : null
    };
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Dislike blog successfully' : 'Dislike blog failed',
      success: response ? true : false,
      toastMessage: response ? 'Dislike blog success' : 'Dislike blog failed',
      object: response ? response : null
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
    toastMessage: blog ? 'Lấy thông tin chi tiết bài viết thành công' : 'Không lấy được thông tin chi tiết của bài viết',
    object: response ? response : null
  };

})

const uploadImageBlogService = asyncHandler(async (req, res) => {
  const { bid } = req.params
  if (!req.file) {
    return {
      error: true,
      errorReason: 'Missing input',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }

  const response = await Blog.findByIdAndUpdate(
    bid,
    { images: req.file.path },
    { new: true }
  )

  return {
    error: response ? false : true,
    errorReason: response ? 'Upload images success' : 'Upload images failed',
    success: response ? true : false,
    toastMessage: response ? 'Upload images success' : 'Upload images failed',
    object: response ? response : null
  }
})

module.exports = {
  createBlogService,
  getBlogsService,
  updateBlogService,
  deleteBlogService,
  likeBlogService,
  disLikeBlogService,
  getDetailBlogService,
  uploadImageBlogService
}
