var fetchTeamsAndTokens = require('../../app/service/fetchTeamsAndTokens');
var assert = require('assert');

describe('fetchTeamsAndTokens', () => {

  before(() => {
    process.env.TEAMS_AND_TOKENS = '{"ToC0":"cRUArd3nd0", "S3nh0R":"BaRR1g4"}';
  });

  after(() => {
    delete process.env.TEAMS_AND_TOKENS;
  });

  it("should return a collection of maps containing teams id's along with respective tokens", () => {

    var teamsAndTokens = fetchTeamsAndTokens();

    assert(2 == Object.keys(teamsAndTokens).length);
    assert.equal("cRUArd3nd0", teamsAndTokens["ToC0"]);
    assert.equal("BaRR1g4", teamsAndTokens["S3nh0R"]);
  });

});
