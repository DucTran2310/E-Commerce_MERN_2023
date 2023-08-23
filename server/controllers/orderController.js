const orderService = require('../service/orderService')
const { sendResponse } = require('../utils/sendResponse')

const createOrder = async function (req, res) {
  const response = await orderService.createOrderService(req, res)

  sendResponse(res, response)
}

const updateStatusOrder = async function (req, res) {
  const response = await orderService.updateStatusOrderService(req, res)

  sendResponse(res, response)
}

const getUserOrder = async function (req, res) {
  const response = await orderService.getUserOrderService(req, res)

  sendResponse(res, response)
}

const getAllOrders = async function (req, res) {
  const response = await orderService.getAllOrdersService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createOrder,
  updateStatusOrder,
  getUserOrder,
  getAllOrders
}
