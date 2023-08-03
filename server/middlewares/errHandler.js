const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found!`)
  res.status(404)
  next(error)
}

const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  // console.log('ERRORFULL: ', error)
  return res.status(statusCode).json({
    error: true,
    errorReason: error?.message,
    success: false,
    toastMessage: error?.message
  })
}

module.exports = {
  notFound,
  errHandler
}
