function checkNullFieldRegister(email, password, firstName, lastName) {
  let errorReason = null
  if (!email) {
    errorReason = 'Email is not null'
  }
  if (!password) {
    errorReason = 'Password is not null'
  }
  if (!firstName) {
    errorReason = 'FirstName is not null'
  }
  if (!lastName) {
    errorReason = 'LastName is not null'
  }
  return errorReason
}

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email)
}

module.exports = {
  checkNullFieldRegister,
  isValidEmail
};