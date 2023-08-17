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
      object: 'Bạn chưa nhập thông tin cho sản phẩm cần tạo'
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
    object: newProduct ? newProduct : 'Create product faild'
  }
})

const getProductService = asyncHandler(async (req, res) => {

  const { productID } = req.params

  const product = await Product.findById(productID)

  return {
    error: product ? false : true,
    errorReason: product ? 'Get detail product successfully' : 'Get detail product failed',
    success: product ? true : false,
    object: product ? product : 'Cannot get detail product'
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
      object: response ? response.length === 0 ? [] : response : 'Cannot get detail product',
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
      object: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

  const updatedProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true })

  return {
    error: updatedProduct ? false : true,
    errorReason: updatedProduct ? 'Update product successfully' : 'Update products failed',
    success: updatedProduct ? true : false,
    object: updatedProduct ? updatedProduct : 'Cannot update product'
  }
})

const deleteProductService = asyncHandler(async (req, res) => {
  const { productID } = req.params
  const deletedProduct = await Product.findByIdAndDelete(productID)
  return {
    error: true,
    errorReason: 'Cannot delete product',
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product'
  }
})

const ratingsService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { star, comment, pid } = req.body
  if (!star) throw new Error('Bạn chưa cho số sao')
  if (!pid) throw new Error('Không có mã sản phẩm')

  const ratingProduct = await Product.findById(pid)

  const alreadyRating = ratingProduct?.ratings?.some(el => el.postedBy.toString() === _id)
  // console.log('alreadyRating: ', alreadyRating)

  if (alreadyRating) {
    // update star & comment
    await Product.updateOne({
      ratings: { $elemMatch: { postedBy: _id } } 
    }, {
      $set: {"ratings.$.star": star, "ratings.$.comment": comment}
    }, {new: true})
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

  updatedProduct.totalRatings = Math.round(sumRatings * 10/ratingCount) / 10

  await updatedProduct.save()

  return {
    error: false,
    errorReason: 'Add ratings successfully',
    success: true,
    object: null,
    updatedProduct
  }
})

module.exports = {
  createProductService,
  getProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  ratingsService
}
