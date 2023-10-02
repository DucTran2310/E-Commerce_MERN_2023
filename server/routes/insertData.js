const router = require('express').Router()
const insertController = require('../controllers/insertData')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', insertController.insertProduct)
router.post('/category', insertController.insertCategory)

module.exports = router