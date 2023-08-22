const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrderService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const userCart = await User.findById(_id).select('cart')
  return {
    error: userCart ? false : true,
    errorReason: userCart ? 'Create order success' : 'Create order failed',
    success: userCart ? true : false,
    toastMessage: userCart ? 'Tạo giỏ hàng thành công' : 'Tạo giỏ hàng thất bại',
    object: userCart ? userCart : null
  }
})

module.exports = {
  createOrderService
}
