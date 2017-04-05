import {USER_NAME, PLACE_NAME} from '../Constants';
import validRequestWithUserName from './builder/RequestBuilder';
import defaultError from './builder/ErrorBuilder';

require('sinon-mongoose');
require('../../app/model/Place');

var res;
var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var PlaceMock = sinon.mock(Place);

const req = validRequestWithUserName();
const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();
const pickRandomPlace = proxyquire('../../app/router/pickRandomPlace', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

describe('pickRandomPlace', () => {

  beforeEach(() => {
    res = sinon.stub();
  });

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();
  });

  it('should suggest adding a place if there are no saved places', () => {
    const NO_PLACES_MESSAGE = `@${USER_NAME} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`;

    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(null, []);

    pickRandomPlace(req, res);

    assert(sendResponseStub.calledWith(res, NO_PLACES_MESSAGE));
    assert(0 == sendErrorStub.callCount);
  });

  it('should suggest the place returned in findRandom', () => {
    const RANDOM_PLACE_MESSAGE = `@${USER_NAME} you should have lunch at *${PLACE_NAME}*`;

    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(null, [{name: PLACE_NAME}]);

    pickRandomPlace(req, res);

    assert(sendResponseStub.calledWith(res, RANDOM_PLACE_MESSAGE));
    assert(0 == sendErrorStub.callCount);
  });

  it('should invoke sendError in the case of an error', () => {
    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(defaultError(), []);

    pickRandomPlace(req, res);

    assert(sendErrorStub.calledWith(res, defaultError()));
    assert(0 == sendResponseStub.callCount);
  });

});
