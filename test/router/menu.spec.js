var proxyquire = require('proxyquire').noCallThru();

var sinon = require('sinon');
var assert = require('assert');

const sendResponseStub = sinon.stub();
const menu = proxyquire('../../app/router/menu', {
  './sendResponse': sendResponseStub
});

const userName = 'felipe';
const menuMessage = `@${userName} these are the commands we have available:
\`/add\`: add a new place to have lunch
\`/show\`: shows all places saved to our database
\`/random\`: picks a random place for you to have lunch
\`/menu\`: displays this message`

describe('Menu', function() {
  it('should print information about the available commands', function() {

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    menu(req, res);

    assert(sendResponseStub.calledWith(res, menuMessage));
  });
});
