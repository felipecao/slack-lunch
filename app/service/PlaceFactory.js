'use strict';

function separateNameAndUrl(text) {
  let parts = [];
  const splitText = ' http';

  if (!text.includes(splitText)) {
    parts[0] = text;
  } else {
    parts[0] = text.substring(0, text.indexOf(splitText)).trim();
    parts[1] = text.substring(text.indexOf(splitText) + 1, text.length).trim();
  }

  return parts;
}

class PlaceFactory {
    constructor() {

    }

    static fromRequestBody(body) {
      let nameAndUrl = separateNameAndUrl(body.text);
    	return { name: nameAndUrl[0], teamId: body.team_id, url: nameAndUrl[1] };
    }
}

module.exports = PlaceFactory;
