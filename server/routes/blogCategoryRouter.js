const router = require('express').Router()
const blogCategoryController = require('../controllers/blogCategoryController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], blogCategoryController.createBlogCategory)
router.get('/', blogCategoryController.getBlogCategories)
router.put('/:pcid', [verifyAccessToken, isAdmin], blogCategoryController.updateBlogCategory)
router.delete('/:pcid', [verifyAccessToken, isAdmin], blogCategoryController.deleteBlogCategory)

module.exports = router
