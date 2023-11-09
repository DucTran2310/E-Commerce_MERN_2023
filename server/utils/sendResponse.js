function sendResponse(res, response) {
    return res.status(200).json(response)
}

module.exports = {
  sendResponse
}