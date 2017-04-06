import validRequest from './builder/RequestBuilder';

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var req = null;

const res = sinon.stub();
const fetchTeamsAndTokensStub = sinon.stub();
const isPermissionTokenValid = proxyquire('../../app/service/checkPermissionToken', {
  './fetchTeamsAndTokens': fetchTeamsAndTokensStub
});

describe('checkPermissionToken', function() {

  beforeEach(() => {
    req = validRequest();
  });

  it('return false if the request contains no token', () => {
    fetchTeamsAndTokensStub.returns({});

    assert.equal(false, isPermissionTokenValid(req, res));
  });

  it('return false if the request a token but token store is empty', () => {
    req.body.token = 'token';

    fetchTeamsAndTokensStub.returns({});

    assert.equal(false, isPermissionTokenValid(req, res));
  });

  it('return false if the request has no token although token store is not empty', () => {
    fetchTeamsAndTokensStub.returns({TEAM_ID:"token"});

    assert.equal(false, isPermissionTokenValid(req, res));
  });

  it('return false if the request token does not match the expected token', () => {
    req.body.token = 'unexpected_token';
    req.body.team_id = 'TEAM_ID';

    fetchTeamsAndTokensStub.returns({TEAM_ID:"token"});

    assert.equal(false, isPermissionTokenValid(req, res));
  });

  it('return false if the request team_id does not match the expected team_id', () => {
    req.body.token = 'token';
    req.body.team_id = 'UNEXPECTED_TEAM_ID';

    fetchTeamsAndTokensStub.returns({TEAM_ID:"token"});

    assert.equal(false, isPermissionTokenValid(req, res));
  });

  it('return true if the request token and team_id match the expected token and team_id', () => {
    req.body.token = 'token';
    req.body.team_id = 'TEAM_ID';

    fetchTeamsAndTokensStub.returns({TEAM_ID:"token"});

    assert.equal(true, isPermissionTokenValid(req, res));
  });
});
