
function sendError(res, err, userName = "", placeName = "") {
  console.log(err);

  if (err.code === 11000) {
    console.log('constraint violation');
    return res.status(409).send(`@${userName} '${placeName}' already exists`);
  }

  return res.status(400).send(err);
}

module.exports = sendError;
