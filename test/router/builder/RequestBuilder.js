import {USER_NAME, PLACE_NAME} from '../../Constants';

function validRequest(){
  return {body: {user_name: USER_NAME, text: PLACE_NAME}};
}

module.exports = validRequest;
