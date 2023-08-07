const User = require('../models/user')
const userService = require('../service/userService')
const { sendResponse } = require('../utils/sendResponse')

const register = async function (req, res) {
  const response = await userService.registerUser(req, res)

  sendResponse(res, response)
}

const login = async function (req, res) {
  const response = await userService.loginUser(req, res)

  sendResponse(res, response)
}

const getCurrent = async function (req, res) {
  const response = await userService.getCurrentUser(req, res)

  sendResponse(res, response)
}

const refreshAccessToken = async function (req, res) {
  const response = await userService.refreshAccessTokenUser(req, res)

  sendResponse(res, response)
}

const logout = async function (req, res) {
  const response = await userService.logoutUser(req, res)

  sendResponse(res, response)
}

const forgotPassword = async function (req, res) {
  const response = await userService.forgotPasswordUser(req, res)

  sendResponse(res, response)
}

const resetPassword = async function (req, res) {
  const response = await userService.resetPasswordUser(req, res)

  sendResponse(res, response)
}

const getAll = async function (req, res) {
  const response = await userService.getAllUsers(req, res)

  sendResponse(res, response)
}

const deleteUserById = async function (req, res) {
  const response = await userService.deleteUser(req, res)

  sendResponse(res, response)
}

const updateUserById = async function (req, res) {
  const response = await userService.updateUser(req, res)

  sendResponse(res, response)
}

const updateUserByAdminController = async function (req, res) {
  const response = await userService.updateUserByAdmin(req, res)

  sendResponse(res, response)
}

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAll,
  deleteUserById,
  updateUserById,
  updateUserByAdminController
}
