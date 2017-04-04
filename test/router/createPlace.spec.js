require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var res = sinon.stub();

const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();

const userName = 'felipe';
const newPlaceName = 'Wallabies Thai';
const req = {body: {user_name: userName, text: newPlaceName}};
const createPlace = proxyquire('../../app/router/createPlace', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

describe('createPlace', () => {

  function stubSaveCall(callback) {
    sinon.stub(Place.prototype, 'save', callback);
  }

  function restoreSaveStub() {
    Place.prototype.save.restore();
  }

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();

    restoreSaveStub();
  });

  it('should send a response saying the new place has been created', () => {
    const newPlaceMessage = `@${userName} your new place *${newPlaceName}* has been added!`;

    stubSaveCall((callback) => {
      callback(null);
    });

    createPlace(req, res);

    assert(sendResponseStub.calledWith(res, newPlaceMessage, 201));
    assert(0 == sendErrorStub.callCount);
  });

  it("should send an error response in case there's an error", () => {
    var error = {code: 123};

    stubSaveCall((callback) => {
      callback(error);
    });

    createPlace(req, res);

    assert(0 == sendResponseStub.callCount);
    assert(sendErrorStub.calledWith(res, error, userName, newPlaceName));
  });

});
