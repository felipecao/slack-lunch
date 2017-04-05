import {USER_NAME, PLACE_NAME} from '../Constants';

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
const req = {body: {user_name: USER_NAME, text: PLACE_NAME}};
const createPlace = proxyquire('../../app/router/createPlace', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

function stubSaveCall(callback) {
  sinon.stub(Place.prototype, 'save', callback);
}

function restoreSaveStub() {
  Place.prototype.save.restore();
}

describe('createPlace', () => {

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();

    restoreSaveStub();
  });

  it('should send a response saying the new place has been created', () => {
    const NEW_PLACE_MESSAGE = `@${USER_NAME} your new place *${PLACE_NAME}* has been added!`;

    stubSaveCall((callback) => {
      callback(null);
    });

    createPlace(req, res);

    assert(sendResponseStub.calledWith(res, NEW_PLACE_MESSAGE, 201));
    assert(0 == sendErrorStub.callCount);
  });

  it("should send an error response in case there's an error", () => {
    var error = {code: 123};

    stubSaveCall((callback) => {
      callback(error);
    });

    createPlace(req, res);

    assert(0 == sendResponseStub.callCount);
    assert(sendErrorStub.calledWith(res, error, USER_NAME, PLACE_NAME));
  });

});
