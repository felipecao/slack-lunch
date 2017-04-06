import {USER_NAME} from '../Constants';
import validRequest from './builder/RequestBuilder';

var proxyquire = require('proxyquire').noCallThru();

const req = validRequest();
const res = sinon.stub();
const sendResponseStub = sinon.stub();
const menu = proxyquire('../../app/service/menu', {
  './sendResponse': sendResponseStub
});

describe('Menu', function() {
  it('should print information about the available commands', function() {

    const MENU_MESSAGE = `@${USER_NAME} these are the commands we have available:
\`/add\`: add a new place to have lunch
\`/show\`: shows all places saved to our database
\`/random\`: picks a random place for you to have lunch
\`/menu\`: displays this message`

    menu(req, res);

    expect(sendResponseStub).to.have.been.calledWith(res, MENU_MESSAGE);
  });
});
