import {USER_NAME} from '../Constants';
import validRequestWithUserName from './builder/RequestBuilder';

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');

const req = validRequestWithUserName();
const sendResponseStub = sinon.stub();
const menu = proxyquire('../../app/router/menu', {
  './sendResponse': sendResponseStub
});

describe('Menu', function() {
  it('should print information about the available commands', function() {

    const MENU_MESSAGE = `@${USER_NAME} these are the commands we have available:
\`/add\`: add a new place to have lunch
\`/show\`: shows all places saved to our database
\`/random\`: picks a random place for you to have lunch
\`/menu\`: displays this message`

    var res = sinon.stub();

    menu(req, res);

    assert(sendResponseStub.calledWith(res, MENU_MESSAGE));
  });
});
