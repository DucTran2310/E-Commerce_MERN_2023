const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const {
  checkNullFieldRegister,
  isValidEmail,
  checkNullFieldLogin
} = require('../utils/validate')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')

// async function registerUser(userData) 
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body

  if (!email || !password || !firstName || !lastName || !mobile) {
    return {
      error: true,
      errorReason: checkNullFieldRegister(email, password, firstName, lastName, mobile),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }
  const userByMobile = await User.findOne({ mobile });
  if (userByMobile) {
    return {
      error: true,
      errorReason: 'Mobile number has already been used.',
      success: false,
      toastMessage: 'Số điện thoại đã được sử dụng.'
    };
  }

  const userByEmail = await User.findOne({ email });
  if (userByEmail) {
    return {
      error: true,
      errorReason: 'Email has already been used.',
      success: false,
      toastMessage: 'Email đã được sử dụng.'
    };
  }


  if (!isValidEmail(email)) {
    return {
      error: true,
      errorReason: 'Email address is not valid.',
      success: false,
      toastMessage: 'Email không đúng định dạng.'
    }
  }

  const response = await User.create(req.body)
  return {
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    toastMessage: response ? 'Register successfully.' : 'Something went wrong.'
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return {
      error: true,
      errorReason: checkNullFieldLogin(email, password),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
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

    return {
      error: false,
      errorReason: null,
      success: true,
      userData,
      toastMessage: 'Login successfully',
      accessToken
    }
  } else {
    return {
      error: true,
      errorReason: 'Invalid credentials.',
      success: false,
      toastMessage: 'Thông tin đăng nhập không chính xác.'
    }
  }
})

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-password -role -refreshToken')
  return {
    error: user ? true : false,
    errorReason: null,
    success: user ? true : false,
    object: user ? user : 'User not found'
  }
})

const refreshAccessTokenUser = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies

  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken) {
    return {
      error: true,
      errorReason: 'No refresh token in cookies',
      success: false,
      toastMessage: 'No refresh token in cookies'
    }
  }

  // Check token có hợp lệ hay không
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET_KEY)

  // Check xem token có khớp với token đã lưu trong db
  const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken })
  return {
    error: response ? true : false,
    errorReason: null,
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken) {
    return {
      error: true,
      errorReason: 'No refresh token in cookies',
      success: false,
      toastMessage: 'No refresh token in cookies'
    }
  }

  // Xóa refreshToken ở db
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })

  // Xóa refreshToken ở trình duyệt
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  })

  return {
    error: false,
    errorReason: null,
    success: true,
    message: 'Logout is successfully'
  }
})

const forgotPasswordUser = asyncHandler(async (req, res) => {
  const email = req.query

  if (!email) {
    return {
      error: true,
      errorReason: 'Missing email',
      success: false,
      message: 'Missing email'
    }
  }

  const user = await User.findOne(email)
  if (!user) {
    return {
      error: true,
      errorReason: 'Email not found',
      success: false,
      message: 'Email not found'
    }
  }
  const resetToken = user.createPasswordChangedToken()
  await user.save()

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
                Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
                <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>
                Nhấn vào đây
                </a>`

  const data = {
    email,
    html
  }
  const result = await sendMail(data)

  return {
    success: true,
    result
  }

})

const resetPasswordUser = asyncHandler(async (req, res) => {
  const { password, token } = req.body

  // Check null password, token
  if (!password || !token) {
    return {
      error: true,
      errorReason: 'Missing inputs',
      success: false,
      message: 'Missing inputs'
    }
  }

  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({ passwordResetToken, passwordResetExpire: { $gt: Date.now() } })

  // Check user
  if (!user) {
    return {
      error: true,
      errorReason: 'Invalid reset token',
      success: false,
      message: 'Invalid reset token'
    }
  }

  // set value fields
  user.password = password
  user.passwordResetToken = undefined
  user.passwordChangedAt = Date.now()
  user.passwordResetExpires = undefined
  await user.save()

  return {
    error: user ? true : false,
    errorReason: user ? 'Updated password' : 'Something went wrong',
    success: user ? true : false,
    message: user ? 'Updated password' : 'Something went wrong'
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select('-password -role -refreshToken -mobile -passwordResetExpire')
  return {
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    user: response
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query
  if (!_id) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      object: 'Bạn chưa truyền id user cần xóa'
    }
  }

  // Get the schema keys of the User model
  const schemaKeys = Object.keys(User.schema.paths)

  // Check if bid exists in the schema keys
  if (!schemaKeys.includes('_id')) {
    return {
      error: true,
      errorReason: `Invalid userID: ${_id}`,
      success: false,
      object: `ID người dùng không hợp lệ: ${_id}`
    }
  }

  try {
    const response = await User.findByIdAndDelete(_id)

    return {
      error: response ? false : true,
      errorReason: response ? null : 'Something went wrong',
      success: response ? true : false,
      toastMessage: response ? `User with email ${response.email} deleted` : 'Something went wrong'
    }
  } catch (error) {
    return {
      error: true,
      errorReason: error.message,
      success: false,
      toastMessage: 'User not found'
    }
  }

})

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  if (!_id || Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      object: !_id ? 'Bạn chưa truyền id user cần cập nhật' : 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }

  // Get the schema keys of the Blog model
  const schemaKeys = Object.keys(User.schema.paths)

  // Check if the keys in req.body are in the schema keys
  for (let key in req.body) {
    if (!schemaKeys.includes(key)) {
      return {
        error: true,
        errorReason: `Key "${key}" does not exist for updating`,
        success: false,
        object: `Key "${key}" không tồn tại để cập nhật`
      }
    }
  }

  const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role -refreshToken')
  return {
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    toastMessage: response ? response : 'Something went wrong'
  }
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params
  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      object: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }
  const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role -refreshToken')
  return {
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    toastMessage: response ? response : 'Something went wrong'
  }
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessTokenUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin
}
