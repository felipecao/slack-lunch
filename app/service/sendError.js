
function sendError(res, err, userName = "", placeName = "") {
  console.log(`Error: ${JSON.stringify(err)}`);

  if (err.code === 11000) {
    console.log('constraint violation');
    return res.status(409).send(`@${userName} '${placeName}' could not saved. Please ask someone to have a look at the error log.`);
  }

  return res.status(400).send(err);
}

module.exports = sendError;
