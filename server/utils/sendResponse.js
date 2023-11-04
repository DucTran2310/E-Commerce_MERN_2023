function sendResponse(res, response) {
  // if (response.error) {
  //   return res.status(400).json(response)
  // } else {
    return res.status(200).json(response)
  // }
}

module.exports = {
  sendResponse
}