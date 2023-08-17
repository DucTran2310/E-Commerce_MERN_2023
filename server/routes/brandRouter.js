const router = require('express').Router()
const brandController = require('../controllers/brandController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], brandController.createBrand)
router.get('/', brandController.getBrands)
router.put('/:brid', [verifyAccessToken, isAdmin], brandController.updateBrand)
router.delete('/:brid', [verifyAccessToken, isAdmin], brandController.deleteBrand)

module.exports = router