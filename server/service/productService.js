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
      toastMessage: 'Bạn chưa nhập thông tin cho sản phẩm cần tạo'
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
    errorReason: newProduct ? 'Created product successfully' : 'Create product failed',
    success: newProduct ? true : false,
    toastMessage: newProduct ? 'Tạo sản phẩm thành công' : 'Tạo sản phẩm thất bại',
    object: newProduct ? newProduct : null
  }
})

const getProductService = asyncHandler(async (req, res) => {

  const { productID } = req.params

  const product = await Product.findById(productID)

  return {
    error: product ? false : true,
    errorReason: product ? 'Get detail product successfully' : 'Get detail product failed',
    success: product ? true : false,
    toastMessage: product ? 'Lấy chi tiết sản phẩm thành công' : 'Lấy chi tiết sản phẩm thất bại',
    object: product ? product : null
  }
})

// Sort, filter, query
const getAllProductsService = asyncHandler(async (req, res) => {

  const queries = { ...req.query }
  // Split field special
  const excludeFields = ['limit', 'sort', 'page', 'fields']
  excludeFields.forEach(el => delete queries[el])

  // Format theo mongoose
  let queryString = JSON.stringify(queries)
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchEl => `$${matchEl}`)
  const formatedQueries = JSON.parse(queryString)

  // Filtering
  if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
  if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' }
  let queryCommand = Product.find(formatedQueries)

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    queryCommand = queryCommand.sort(sortBy)
  } else {
    queryCommand = queryCommand.sort('-createdAt')
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ')
    queryCommand = queryCommand.select(fields)
  } else {
    queryCommand = queryCommand.select('-__v')
  }

  // Pagination
  // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
  const page = +req.query.page * 1 || 1
  const limit = +req.query.limit * 1 || 100
  const skip = (page - 1) * limit

  queryCommand = queryCommand.skip(skip).limit(limit)

  // excute query
  try {
    const response = await queryCommand.exec()
    const counts = await Product.find(formatedQueries).countDocuments()
    return {
      error: response ? false : true,
      errorReason: response ? response.length === 0 ? 'Can not find product' : 'Get detail product successfully' : 'Get detail product failed',
      success: response ? true : false,
      toastMessage: response ? response.length === 0 ? 'Lấy danh sách sản phẩm thất bại' : 'Lấy danh sách sản phẩm thành công' : 'Lấy danh sách sản phẩm thất bại',
      object: response ? response.length === 0 ? [] : response : [],
      counts,
      page,
      limit
    }
  } catch (err) {
    throw Error(err.message)
  }
})

const updateProductService = asyncHandler(async (req, res) => {

  const { productID } = req.params
  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'Missing input',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(Product.schema.paths)

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

  const updatedProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true })

  return {
    error: updatedProduct ? false : true,
    errorReason: updatedProduct ? 'Update product successfully' : 'Update products failed',
    success: updatedProduct ? true : false,
    toastMessage: updatedProduct ? 'Cập nhật sản phẩm thành công' : 'Cập nhật sản phẩm thất bại',
    object: updatedProduct ? updatedProduct : null
  }
})

const deleteProductService = asyncHandler(async (req, res) => {
  const { productID } = req.params

  // Get the schema keys of the Product model
  const schemaKeys = Object.keys(Product.schema.paths)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('productID')) {
    return {
      error: true,
      errorReason: `Invalid productID: ${productID}`,
      success: false,
      toastMessage: `ID sản phẩm không hợp lệ: ${productID}`
    }
  }

  const deletedProduct = await Product.findByIdAndDelete(productID)
  return {
    error: deletedProduct ? false : true,
    errorReason: 'Cannot delete product',
    success: deletedProduct ? true : false,
    toastMessage: deletedProduct ? 'Xóa sản phẩm thành công' : 'Xóa sản phẩm thất bại',
    deletedProduct: deletedProduct ? deletedProduct : null
  }
})

const ratingsService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { star, comment, pid } = req.body
  if (!star) throw new Error('Bạn chưa cho số sao')
  if (!pid) throw new Error('Không có mã sản phẩm')

  const ratingProduct = await Product.findById(pid)

  const alreadyRating = ratingProduct?.ratings?.some(el => el.postedBy.toString() === _id)

  if (alreadyRating) {
    // update star & comment
    await Product.updateOne({
      ratings: { $elemMatch: { postedBy: _id } }
    }, {
      $set: { "ratings.$.star": star, "ratings.$.comment": comment }
    }, { new: true })
  } else {
    // add star and comment
    const response = await Product.findByIdAndUpdate(pid, {
      $push: { ratings: { star, comment, postedBy: _id } }
    }, { new: true })
  }

  // Average ratings
  const updatedProduct = await Product.findById(pid)
  const ratingCount = updatedProduct.ratings.length
  const sumRatings = updatedProduct.ratings.reduce((sum, ele) => sum + +ele.star, 0)

  updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

  await updatedProduct.save()

  return {
    error: false,
    errorReason: 'Add ratings successfully',
    success: true,
    toastMessage: 'Add ratings successfully',
    object: null,
    updatedProduct
  }
})

const uploadImageProductService = asyncHandler(async (req, res) => {
  const { productID } = req.params
  if (!req.files) {
    return {
      error: true,
      errorReason: 'Missing input',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }

  const imagePaths = req.files.map(el => el.path) // Tạo mảng đường dẫn ảnh

  const response = await Product.findByIdAndUpdate(
    productID,
    { $push: { images: { $each: imagePaths } } }, // Cập nhật trường images
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
  createProductService,
  getProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  ratingsService,
  uploadImageProductService
}
