import {USER_NAME, PLACE_NAME, TEAM_ID} from '../../Constants';

function validRequest(){
  return {body: {user_name: USER_NAME, text: PLACE_NAME, team_id: TEAM_ID}};
}

module.exports = validRequest;
