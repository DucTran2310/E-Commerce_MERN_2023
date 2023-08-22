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

function checkNullFieldCreateProduct(title, description, brand, price) {
  let errorReason = null
  if (!title) {
    errorReason = 'Title is not null'
    return errorReason
  }
  if (!description) {
    errorReason = 'Description is not null'
    return errorReason
  }
  if (!brand) {
    errorReason = 'Brand is not null'
    return errorReason
  }
  if (!price) {
    errorReason = 'Price is not null'
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

function checkNullFieldCreateBlog(title, description, category) {
  let errorReason = null
  if (!title) {
    errorReason = 'Title is not null'
    return errorReason
  }
  if (!description) {
    errorReason = 'Description is not null'
    return errorReason
  }
  if (!category) {
    errorReason = 'Category is not null'
    return errorReason
  }
}

function checkNullFieldCreateCoupon(name, discount, expiry) {
  let errorReason = null
  if (!name) {
    errorReason = 'Name is not null'
    return errorReason
  }
  if (!discount) {
    errorReason = 'Discount is not null'
    return errorReason
  }
  if (!expiry) {
    errorReason = 'Expiry is not null'
    return errorReason
  }
}

function checkNullFieldUpdateCart(pid, quantity, color) {
  let errorReason = null
  if (!pid) {
    errorReason = 'Product ID is not null'
    return errorReason
  }
  if (!quantity) {
    errorReason = 'Quantity is not null'
    return errorReason
  }
  if (!color) {
    errorReason = 'Color is not null'
    return errorReason
  }
}

module.exports = {
  checkNullFieldRegister,
  isValidEmail,
  checkNullFieldLogin,
  checkNullFieldCreateProduct,
  checkNullFieldCreateBlog,
  checkNullFieldCreateCoupon,
  checkNullFieldUpdateCart
};