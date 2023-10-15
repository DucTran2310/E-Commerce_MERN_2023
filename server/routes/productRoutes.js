const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], productController.createProduct)
router.get('/', productController.getAllProductsDetail)
router.put('/ratings', [verifyAccessToken], productController.ratings)
router.get('/:productID', productController.getProduct)
router.put('/uploadImage/:productID', [verifyAccessToken, isAdmin], uploader.array('images', 10), productController.uploadImageProduct)
router.put('/:productID', [verifyAccessToken, isAdmin], productController.updateProduct)
router.delete('/:productID', [verifyAccessToken, isAdmin], productController.deleteProduct)

module.exports = router