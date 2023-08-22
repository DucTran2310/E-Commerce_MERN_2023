const coupon = require('../service/couponService')
const { sendResponse } = require('../utils/sendResponse')

const createCoupon = async function (req, res) {
  const response = await coupon.createCouponService(req, res)

  sendResponse(res, response)
}

const getAllCoupons = async function (req, res) {
  const response = await coupon.getCouponsService(req, res)

  sendResponse(res, response)
}

const updateCoupon = async function (req, res) {
  const response = await coupon.updateCouponService(req, res)

  sendResponse(res, response)
}

const deleteCoupon = async function (req, res) {
  const response = await coupon.deleteCouponService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon
}
