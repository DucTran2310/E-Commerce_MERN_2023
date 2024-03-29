const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // Bearer token
    // headers: { authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) return res.status(401).json({
                error: true,
                errorReason: err,
                success: false,
                toastMessage: 'Invalid access token'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            error: true,
            errorReason: 'Require authentication!',
            success: false,
            mes: 'Require authentication!'
        })
    }
})

const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user
    if (role !== 'admin' ) {
        return res.status(401).json({
            error: true,
            errorReason: 'Unauthorize',
            success: false,
            toastMessage: 'Unauthorize'
        })
    } 
    next()
})

module.exports = {
    verifyAccessToken,
    isAdmin
}