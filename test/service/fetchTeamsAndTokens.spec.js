var fetchTeamsAndTokens = require('../../app/service/fetchTeamsAndTokens');

describe('fetchTeamsAndTokens', () => {

  before(() => {
    process.env.TEAMS_AND_TOKENS = '{"ToC0":"cRUArd3nd0", "S3nh0R":"BaRR1g4"}';
  });

  after(() => {
    delete process.env.TEAMS_AND_TOKENS;
  });

  it("should return a collection of maps containing teams id's along with respective tokens", () => {

    var teamsAndTokens = fetchTeamsAndTokens();

    Object.keys(teamsAndTokens).length.should.equal(2);
    teamsAndTokens.should.have.keys("ToC0", "S3nh0R");
    teamsAndTokens["ToC0"].should.equal("cRUArd3nd0");
    teamsAndTokens["S3nh0R"].should.equal("BaRR1g4");
  });

});
