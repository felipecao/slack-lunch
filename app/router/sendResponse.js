function sendResponse(res, text, status = 200) {
  return res.status(status).send({
    response_type: "in_channel",
    text: text
  });
}

module.exports = sendResponse;
