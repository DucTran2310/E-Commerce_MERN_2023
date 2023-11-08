const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const {
  checkNullFieldRegister,
  isValidEmail,
  checkNullFieldLogin,
  checkNullFieldUpdateCart
} = require('../utils/validate')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')

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

  // res.header("Access-Control-Allow-Headers", "*");
  // res.header('Access-Control-Allow-Credentials', true);
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  const token = makeToken()

  //gắn token vào cookie
  // res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000, sameSite: 'None', secure: true })
  // const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký.
  //               Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  //               <a href=${process.env.URL_SERVER}/api/user/finalRegister/${token}>
  //               Nhấn vào đây
  //               </a>`

  //đưa token cho người dùng
  const emailEdited = btoa(email) + '@' + token
  const newUser = await User.create({
    email: emailEdited,
    password, lastName, firstName, mobile
  })

  if (newUser) {
    const html = `<h2>Register code:</h2><br /><blockquote>${token}</blockquote>`
    const data = {
      email,
      html,
      subject: 'Xác nhận đăng ký tài khoản web ecommerce'
    }

    const result = await sendMail(data)
  }

  setTimeout(async () => {
    await User.deleteOne({email: emailEdited})
  }, [300000])

  return {
    error: false,
    success: true,
    toastMessage: 'Please check your email to active account'
  }
})

const finalRegister = asyncHandler(async (req, res) => {
  // const cookie = req.cookies

  // if (!cookie || cookie?.dataregister?.token !== token) {
  //   res.clearCookie('dataregister')
  //   return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
  // }

  // const newUser = await User.create({
  //   email: cookie?.dataregister?.email,
  //   password: cookie?.dataregister?.password,
  //   firstName: cookie?.dataregister?.firstName,
  //   lastName: cookie?.dataregister?.lastName,
  //   mobile: cookie?.dataregister?.mobile,
  // })

  // res.clearCookie('dataregister')

  // if (newUser) {
  //   return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
  // } else {
  //   return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
  // }

  const { token } = req.params

  const notActiveEmail = await User.findOne ({ email: new RegExp(`${token}$`) })

  if (notActiveEmail) {
    notActiveEmail.email = atob(notActiveEmail.email.split('@')[0])
    notActiveEmail.save( )
  }

  return {
    error: notActiveEmail ? false : true,
    errorReason: notActiveEmail ? 'Register successfully' : 'Not found User',
    success: notActiveEmail ? true : false,
    toastMessage: notActiveEmail ? 'Register successfully' : 'Something went wrong, please try again. '
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
    error: user ? false : true,
    errorReason: null,
    success: user ? true : false,
    toastMessage: user ? 'Lấy thông tin người dùng thành công' : 'Lấy thông tin người dùng thất bại',
    object: user ? user : null
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
    toastMessage: response ? 'generateAccessToken success' : 'generateAccessToken failed',
    object: response ? generateAccessToken(response._id, response.role) : null
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
    toastMessage: 'Logout is successfully'
  }
})

const forgotPasswordUser = asyncHandler(async (req, res) => {
  const { email } = req.body; // Destructure the email property from req.body

  if (!email) {
    return {
      error: true,
      errorReason: 'Missing email',
      success: false,
      toastMessage: 'Missing email'
    }
  }

  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: true,
      errorReason: 'User not found',
      success: false,
      toastMessage: 'User not found'
    }
  }

  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
                Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
                <a href=${process.env.CLIENT_URL}/resetpassword/${resetToken}>
                Nhấn vào đây
                </a>`;

  const data = {
    email,
    html,
    subject: 'Forgot password'
  };
  const result = await sendMail(data);

  return {
    error: false,
    success: true,
    result,
    toastMessage: result.response?.includes('OK') ? 'Hãy check mail của bạn' : 'Đã có lỗi xảy ra, vui lòng thử lại'
  };
});

const resetPasswordUser = asyncHandler(async (req, res) => {
  const { password, token } = req.body

  // Check null password, token
  if (!password || !token) {
    return {
      error: true,
      errorReason: 'Missing inputs',
      success: false,
      toastMessage: 'Missing inputs'
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
      toastMessage: 'Invalid reset token'
    }
  }

  // set value fields
  user.password = password
  user.passwordResetToken = undefined
  user.passwordChangedAt = Date.now()
  user.passwordResetExpires = undefined
  await user.save()

  return {
    error: user ? false : true,
    errorReason: user ? 'Updated password' : 'Something went wrong',
    success: user ? true : false,
    toastMessage: user ? 'Updated password' : 'Something went wrong'
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select('-password -role -refreshToken -mobile -passwordResetExpire')
  return {
    error: response ? false : true,
    errorReason: null,
    success: response ? true : false,
    toastMessage: response ? 'Get all users success' : 'Get all users failed',
    object: response ? response : null
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query
  if (!_id) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      toastMessage: 'Bạn chưa truyền id user cần xóa'
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
      toastMessage: `ID người dùng không hợp lệ: ${_id}`
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
      toastMessage: !_id ? 'Bạn chưa truyền id user cần cập nhật' : 'Bạn chưa nhập thông tin cần cập nhật'
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
        toastMessage: `Key "${key}" không tồn tại để cập nhật`
      }
    }
  }

  const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
  return {
    error: response ? false : true,
    errorReason: response ? 'Update user success' : 'Something went wrong',
    success: response ? true : false,
    toastMessage: response ? 'Update user success' : 'Something went wrong',
    object: response ? response : null
  }
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params
  if (Object.keys(req.body).length === 0) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
  return {
    error: response ? false : true,
    errorReason: response ? 'Update user success' : 'Something went wrong',
    success: response ? true : false,
    toastMessage: response ? 'Update user success' : 'Something went wrong',
    object: response ? response : null
  }
})

const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user
  if (!req.body.address) {
    return {
      error: true,
      errorReason: 'Id user is not null',
      success: false,
      toastMessage: 'Bạn chưa nhập thông tin cần cập nhật'
    }
  }

  const user = await User.findById(_id)
  if (!user) {
    return {
      error: true,
      errorReason: 'User not found',
      success: false,
      toastMessage: 'Không tìm thấy người dùng',
      object: null
    }
  }

  const existingAddress = user.address.find((address) => address === req.body.address)
  if (existingAddress) {
    return {
      error: true,
      errorReason: 'Duplicate address',
      success: false,
      toastMessage: 'Địa chỉ đã tồn tại',
      object: null
    }
  }

  user.address.push(req.body.address)
  const response = await user.save()

  return {
    error: response ? false : true,
    errorReason: response ? 'Cập nhật địa chỉ người dùng thành công' : 'Cập nhật địa chỉ người dùng thất bại',
    success: response ? true : false,
    toastMessage: response ? 'Cập nhật địa chỉ người dùng thành công' : 'Cập nhật địa chỉ người dùng thất bại',
    object: response ? response : null
  }
})

const updateCartService = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { pid, quantity, color } = req.body

  if (!pid || !quantity || !color) {
    return {
      error: true,
      errorReason: checkNullFieldUpdateCart(pid, quantity, color),
      success: false,
      toastMessage: 'Thông tin không được để trống.'
    }
  }

  const user = await User.findById(_id).select('cart')

  const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)

  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": quantity } }, {
        new: true
      })

      return {
        error: response ? false : true,
        errorReason: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
        success: response ? true : false,
        toastMessage: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
        object: response ? response : null
      }

    } else {
      const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
      return {
        error: response ? false : true,
        errorReason: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
        success: response ? true : false,
        toastMessage: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
        object: response ? response : null
      }
    }
  } else {
    const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
    return {
      error: response ? false : true,
      errorReason: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
      success: response ? true : false,
      toastMessage: response ? 'Thêm sản phẩm vào giỏ hành thành công' : 'Thêm sản phẩm vào giỏ hành thất bại',
      object: response ? response : null
    }
  }

})

module.exports = {
  registerUser,
  finalRegister,
  loginUser,
  getCurrentUser,
  refreshAccessTokenUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCartService
}
