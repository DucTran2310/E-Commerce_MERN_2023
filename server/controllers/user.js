const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { checkNullFieldRegister, isValidEmail, checkNullFieldLogin } = require('../utils/validate')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body

  if (!email || !password || !firstName || !lastName || !mobile) {
    return res.status(400).json({
      error: true,
      errorReason: checkNullFieldRegister(email, password, firstName, lastName, mobile),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    })
  }

  const user = await User.findOne({ email })
  if (user) {
    throw new Error('Email has existed.')
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: true,
      errorReason: 'Email address is not valid.',
      success: false,
      toastMessage: 'Email không đúng định dạng.'
    })
  }

  const response = await User.create(req.body)
  return res.status(200).json({
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    toastMessage: response ? 'Register successfully.' : 'Something went wrong.'
  })
})

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      errorReason: checkNullFieldLogin(email, password),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    })
  }

  const response = await User.findOne({ email })

  if (response && await response.isCorrectPassword(password)) {
    // Tách password và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject()
    // Tạo access token
    const accessToken = generateAccessToken(response._id, role)
    // Tạo refresh token
    const newRefreshToken = generateRefreshToken(response._id)
    // Lưu refresh token vào database
    // new: true là trả về data sau khi update
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
    // Lưu refresh token vào cookie
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    return res.status(200).json({
      error: false,
      errorReason: null,
      success: true,
      userData,
      toastMessage: 'Login successfully',
      accessToken
    })
  } else {
    throw new Error('Invalid credentials.')
  }
})

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-password -role -refreshToken')
  return res.status(200).json({
    error: user ? true : false,
    errorReason: null,
    success: user ? true : false,
    object: user ? user : 'User not found'
  })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies

  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken) {
    throw new Error('No refresh token in cookies')
  }

  // Check token có hợp lệ hay không
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET_KEY)

  // Check xem token có khớp với token đã lưu trong db
  const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken })
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
  })
})

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken
}
