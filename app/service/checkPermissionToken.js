var fetchTeamsAndTokens = require('./fetchTeamsAndTokens');

function shouldBlockRequest(providedTeamToken, expectedTeamToken) {
  return undefined === providedTeamToken || undefined === expectedTeamToken || expectedTeamToken !== providedTeamToken;
}

function isPermissionTokenValid(req, res) {
  console.log('request: ' + JSON.stringify(req.body));
  console.log('headers: ' + JSON.stringify(req.headers));

  const permissions = fetchTeamsAndTokens();
  const providedTeamToken = req.body.token;
  const expectedTeamToken = permissions[req.body.team_id];

  if (shouldBlockRequest(providedTeamToken, expectedTeamToken)) {
    console.log('Denying access to request: ' + JSON.stringify(req.body));
    return false;
  }

  return true;
}

module.exports = isPermissionTokenValid;
