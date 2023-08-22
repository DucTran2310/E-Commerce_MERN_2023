const router = require('express').Router()
const blogController = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.get('/', blogController.getBlogs)
router.get('/detailBlog/:bid', blogController.getDetailBlog)
router.post('/', [verifyAccessToken, isAdmin], blogController.createNewBlog)
router.put('/likes/:bid',[verifyAccessToken], blogController.likeBlog)
router.put('/dislike/:bid',[verifyAccessToken], blogController.disLikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog)
router.put('/uploadImage/:bid', [verifyAccessToken, isAdmin], uploader.single('images'), blogController.uploadImageBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], blogController.deleteBlog)

module.exports = router