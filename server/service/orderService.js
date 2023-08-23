const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrderService = asyncHandler(async (req, res) => {
  const { _id } = req.user

  const {coupon} = req.body

  const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
  const products = userCart?.cart?.map(el => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
    price: el.price
  }))

  let total = userCart?.cart?.reduce((sum, ele) => ele.product.price * ele.quantity + sum , 0)

  const createData = {products, total, orderBy: _id}
  if (coupon) {
    const selectedCoupon = await coupon.findById(coupon)
    total = Math.round(total * (1 - +selectedCoupon?.discount/100) / 1000) * 1000 || total //làm tròn
    createData.total = total
    createData.coupon = coupon
  }

  const result = await Order.create(createData)

  return {
    error: result ? false : true,
    errorReason: result ? 'Create order success' : 'Create order failed',
    success: result ? true : false,
    toastMessage: result ? 'Tạo giỏ hàng thành công' : 'Tạo giỏ hàng thất bại',
    object: result ? result : null,
    userCart
  }
})

const updateStatusOrderService = asyncHandler(async (req, res) => {
  const {oid} = req.params
  const {status} = req.body
  if (!status) {
    return {
      error: true,
      errorReason: 'Status is not null',
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }

  const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})

  return {
    error: response ? false : true,
    errorReason: response ? 'Update status success' : 'Update status failed',
    success: response ? true : false,
    toastMessage: response ? 'Cập nhật trạng thái thành công' : 'Cập nhật trạng thái thất bại',
    response
  }

})

const getUserOrderService = asyncHandler(async (req, res) => {
  const {_id} = req.user

  const response = await Order.find({orderBy: _id})

  return {
    error: response ? false : true,
    errorReason: response ? 'Get user order success' : 'Get user order failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy danh sách đơn đặt hàng thành công' : 'Lấy danh sách đơn đặt hàng thất bại',
    response
  }

})

const getAllOrdersService = asyncHandler(async (req, res) => {

  const response = await Order.find()

  return {
    error: response ? false : true,
    errorReason: response ? 'Get all orders success' : 'Get all orders failed',
    success: response ? true : false,
    toastMessage: response ? 'Lấy danh sách đơn đặt hàng thành công' : 'Lấy danh sách đơn đặt hàng thất bại',
    response
  }

})

module.exports = {
  createOrderService,
  updateStatusOrderService,
  getUserOrderService,
  getAllOrdersService
}
