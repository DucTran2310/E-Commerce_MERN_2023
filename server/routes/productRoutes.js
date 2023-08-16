const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], productController.createProduct)
router.get('/', [verifyAccessToken, isAdmin], productController.getAllProductsDetail)
router.put('/ratings', [verifyAccessToken], productController.ratings)
router.get('/:productID', productController.getProduct)
router.put('/:productID', [verifyAccessToken, isAdmin], productController.updateProduct)
router.delete('/:productID', [verifyAccessToken, isAdmin], productController.deleteProduct)

module.exports = router