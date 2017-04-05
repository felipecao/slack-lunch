import {USER_NAME} from '../../Constants';

function validRequestWithUserName(){
  return {body: {user_name: USER_NAME}};
}

module.exports = validRequestWithUserName;
