const orderService = require('../service/orderService')
const { sendResponse } = require('../utils/sendResponse')

const createOrder = async function (req, res) {
  const response = await orderService.createOrderService(req, res)

  sendResponse(res, response)
}

module.exports = {
  createOrder
}
