const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCouponService = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'You do not enter info coupon',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cho phiếu mua hàng'
    }
  }

  const { name, discount, expiry } = req.body

  if (!name || !discount || !expiry) {
    return {
      error: true,
      errorReason: checkNullFieldCreateCoupon(name, discount, expiry),
      success: false,
      toastMessage: 'Thông tin phiếu mua hàng không được để trống.'
    }
  }

  // Check if coupon already exists
  const existingCategory = await Coupon.findOne({ name: name });
  if (existingCategory) {
    return {
      error: true,
      errorReason: 'Coupon already exists',
      success: false,
      toastMessage: 'Phiếu mua hàng đã tồn tại'
    }
  }

  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
  })

  return {
    error: response ? false : true,
    errorReason: response ? 'Created coupon successfully' : 'Create coupon failed',
    success: response ? true : false,
    toastMessage: response ? 'Tạo phiếu mua hàng thành công' : 'Tạo phiếu mua hàng thất bại',
    object: response ? response : null
  }
})

const getCouponsService = asyncHandler(async (req, res) => {

  const response = await Coupon.find().select('-createdAt -updatedAt')

  return {
    error: response ? false : true,
    errorReason: response ? 'Get coupon successfully' : 'Get coupon failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy mã giảm giá thành công' : 'Lấy mã giảm giá thất bại',
    object: response ? response : []
  }
})

const updateCouponService = asyncHandler(async (req, res) => {

  const { cid } = req.params
  const { name, expiry } = req.body

  // Check if the updated name already exists in the database
  const existingCoupon = await Coupon.findOne({ name });
  if (existingCoupon && existingCoupon._id !== cid) {
    return {
      error: true,
      errorReason: `Coupon name "${name}" already exists`,
      success: false,
      toastMessage: `Tên coupon "${name}" đã tồn tại`
    };
  }

  // Get the schema keys of the Coupon model
  const schemaKeys = Object.keys(Coupon.schema.paths)

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

  if (expiry) {
    req.body.expiry = Date.now() + +expiry * 24 * 60 * 60 * 1000
  }

  const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true })

  return {
    error: response ? false : true,
    errorReason: response ? 'Update coupon successfully' : 'Update coupon failed',
    success: response ? true : false,
    toastMessage: response ? 'Update coupon success' : 'Update coupon failed',
    object: response ? response : null
  }
})

const deleteCouponService = asyncHandler(async (req, res) => {
  const { cid } = req.params

  // Get the schema keys of the Coupon Category model
  const schemaKeys = Object.keys(Coupon.schema.paths)

  // Check if '_id' exists in the schema keys
  if (!schemaKeys.includes('_id')) {
    return {
      error: true,
      errorReason: `Invalid coupon ID: ${cid}`,
      success: false,
      toastMessage: `ID phiếu giảm giá không hợp lệ: ${cid}`
    }
  }

  const response = await Coupon.findByIdAndDelete(cid);

  return {
    error: response ? false : true,
    errorReason: response ? 'Delete coupon successfully' : 'Delete coupon failed',
    success: response ? true : false,
    toastMessage: response ? 'Xóa phiếu giảm giá thành công' : 'Xóa phiếu giảm giá thất bại',
    object: response ? response : null
  }
})

module.exports = {
  createCouponService,
  getCouponsService,
  updateCouponService,
  deleteCouponService
}
