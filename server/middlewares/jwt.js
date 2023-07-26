const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) => {

  const options = {
    algorithm: 'HS256',
    expiresIn: '2d'
  }

  return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET_KEY, options)
}

const generateRefreshToken = (uid, role) => {

  const options = {
    algorithm: 'HS256',
    expiresIn: '7d'
  }

  return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET_KEY, options)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}