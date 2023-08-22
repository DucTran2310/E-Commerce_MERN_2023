const userRouter = require('./userRoutes')
const productRouter = require('./productRoutes')
const productCategoryRouter = require('./productCategoryRouter')
const blogRouter = require('./blogRouter')
const blogCategoryRouter = require('./blogCategoryRouter')
const brandRouter = require('./brandRouter')
const couponRouter = require('./couponRouter')
const {notFound, errHandler} = require('../middlewares/errHandler')

const initRoutes = (app) => {
  app.use('/api/user', userRouter)
  app.use('/api/product', productRouter)
  app.use('/api/productCategory', productCategoryRouter)
  app.use('/api/blog', blogRouter)
  app.use('/api/blogCategory', blogCategoryRouter)
  app.use('/api/brand', brandRouter)
  app.use('/api/coupon', couponRouter)

  app.use(notFound)
  app.use(errHandler)
}

module.exports = initRoutes
