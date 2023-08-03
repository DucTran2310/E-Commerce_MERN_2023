const User = require('../models/user')
const userService = require('../service/userService')

const register = async function (req, res) {
  const response = await userService.registerUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const login = async function (req, res) {
  const response = await userService.loginUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const getCurrent = async function (req, res) {
  const response = await userService.getCurrentUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const refreshAccessToken = async function (req, res) {
  const response = await userService.refreshAccessTokenUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const logout = async function (req, res) {
  const response = await userService.logoutUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const forgotPassword = async function (req, res) {
  const response = await userService.forgotPasswordUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

const resetPassword = async function (req, res) {
  const response = await userService.resetPasswordUser(req, res)

  if (response.error) {
    return res.status(400).json(response);
  } else {
    return res.status(200).json(response);
  }
}

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword
}
