function checkNullFieldRegister(email, password, firstName, lastName, mobile) {
  let errorReason = null
  if (!email) {
    errorReason = 'Email is not null'
    return errorReason
  }
  if (!password) {
    errorReason = 'Password is not null'
    return errorReason
  }
  if (!firstName) {
    errorReason = 'FirstName is not null'
    return errorReason
  }
  if (!lastName) {
    errorReason = 'LastName is not null'
    return errorReason
  }
  if (!mobile) {
    errorReason = 'Mobile is not null'
    return errorReason
  }
}

function checkNullFieldLogin(email, password) {
  let errorReason = null
  if (!email) {
    errorReason = 'Email is not null'
    return errorReason
  }
  if (!password) {
    errorReason = 'Password is not null'
    return errorReason
  }
}

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}

module.exports = {
  checkNullFieldRegister,
  isValidEmail,
  checkNullFieldLogin
};