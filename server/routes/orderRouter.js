const router = require('express').Router()
const orderController = require('../controllers/orderController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, orderController.createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], orderController.updateStatusOrder)
router.get('/', verifyAccessToken, orderController.getUserOrder)
router.get('/', [verifyAccessToken, isAdmin], orderController.getAllOrders)

module.exports = router