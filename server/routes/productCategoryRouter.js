const router = require('express').Router()
const productCategoryController = require('../controllers/productCategoryController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], productCategoryController.createProductCategory)
router.get('/', productCategoryController.getProductCategories)
router.put('/:pcid', [verifyAccessToken, isAdmin], productCategoryController.updateProductCategory)
router.delete('/:pcid', [verifyAccessToken, isAdmin], productCategoryController.deleteProductCategory)

module.exports = router