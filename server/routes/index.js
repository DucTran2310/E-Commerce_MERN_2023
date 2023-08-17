const userRouter = require('./userRoutes')
const productRouter = require('./productRoutes')
const productCategoryRouter = require('./productCategoryRouter')
const blogCategoryRouter = require('./blogCategoryController')
const {notFound, errHandler} = require('../middlewares/errHandler')

const initRoutes = (app) => {
  app.use('/api/user', userRouter)
  app.use('/api/product', productRouter)
  app.use('/api/productCategory', productCategoryRouter)
  app.use('/api/blogCategory', blogCategoryRouter)

  app.use(notFound)
  app.use(errHandler)
}

module.exports = initRoutes
