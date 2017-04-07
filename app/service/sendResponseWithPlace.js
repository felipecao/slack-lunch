function sendResponseWithPlace(res, text, place = {}) {
  var responseObject = {
    response_type: "in_channel",
    text: text
  };

  if (undefined !== place.url) {
    responseObject.attachments = [
      {
        "fallback": `${place.name} is your random restaurant for today.`,
        "title": place.name,
        "title_link": place.url,
        "text": "This is your random restaurant for today!"
      }
    ];
  }

  return res.status(200).send(responseObject);
}

module.exports = sendResponseWithPlace;
