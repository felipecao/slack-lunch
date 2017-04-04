require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var mongoose = require('mongoose');

const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();

const userName = 'felipe';
const pickRandomPlace = proxyquire('../../app/router/pickRandomPlace', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

describe('pickRandomPlace', () => {

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();
  });

  var Place = mongoose.model('Place');
  var PlaceMock = sinon.mock(Place);

  it('should suggest adding a place if there are no saved places', () => {
    const noPlacesMessage = `@${userName} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`;

    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(null, []);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    pickRandomPlace(req, res);

    assert(sendResponseStub.calledWith(res, noPlacesMessage));
    assert(0 == sendErrorStub.callCount);
  });

  it('should suggest the place returned in findRandom', () => {
    const placeName = 'Wallabies Thai';
    const randomPlaceMessage = `@${userName} you should have lunch at *${placeName}*`;

    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(null, [{name: placeName}]);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    pickRandomPlace(req, res);

    assert(sendResponseStub.calledWith(res, randomPlaceMessage));
    assert(0 == sendErrorStub.callCount);
  });

  it('should invoke sendError in the case of an error', () => {
    const error = {code: 123};

    PlaceMock
      .expects('findRandom')
      .chain('limit', 1)
      .chain('exec')
      .yields(error, []);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    pickRandomPlace(req, res);

    assert(sendErrorStub.calledWith(res, error));
    assert(0 == sendResponseStub.callCount);
  });

});
