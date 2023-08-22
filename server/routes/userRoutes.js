const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', verifyAccessToken, userController.getCurrent)
router.post('/refreshToken', userController.refreshAccessToken)
router.get('/logout', userController.logout)
router.get('/forgotpassword', userController.forgotPassword)
router.put('/resetpassword', userController.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], userController.getAll)
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUserById)
router.put('/updateUserById', [verifyAccessToken], userController.updateUserById)
router.put('/address', [verifyAccessToken], userController.updateUserAddressController)
router.put('/cart', [verifyAccessToken], userController.updateUserCartController)
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdminController)

module.exports = router

// CRUD: Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - giấu body
// GET + DELETE - hiện câu query // ?dds&gfg