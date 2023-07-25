const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { checkNullFieldRegister, isValidEmail } = require('../utils/validate')

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      error: true,
      errorReason: checkNullFieldRegister(email, password, firstName, lastName),
      success: false,
      toastMessage: 'Thông tin không được để trống'
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: true,
      errorReason: 'Email address is not valid.',
      success: false,
      toastMessage: 'Email không đúng định dạng'
    })
  }

  const response = await User.create(req.body)
  return res.status(200).json({
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    response,
    toastMessage: 'Đăng ký thành công'
  })
})

module.exports = {
  register
}
