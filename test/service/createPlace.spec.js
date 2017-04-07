import {USER_NAME, PLACE_NAME, TEAM_ID} from '../Constants';
import defaultError from './builder/ErrorBuilder';
import validRequest from './builder/RequestBuilder';

require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var PlaceMock = sinon.mock(Place);

const req = validRequest();
const res = sinon.stub();
const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();
const createPlace = proxyquire('../../app/service/createPlace', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

describe('createPlace', () => {

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();
  });

  it('should send a response saying the new place has been created', () => {
    const NEW_PLACE_MESSAGE = `@${USER_NAME} your new place *${PLACE_NAME}* has been added!`;

    PlaceMock
      .expects('create')
      .withArgs({ name: PLACE_NAME, teamId: TEAM_ID, url: undefined })
      .yields(null, {id: 123, name: PLACE_NAME, teamId: TEAM_ID});

    createPlace(req, res);

    expect(sendResponseStub).to.have.been.calledWith(res, NEW_PLACE_MESSAGE, 201);
    sendErrorStub.callCount.should.equal(0);
  });

  it("should send an error response in case there's an error", () => {

    PlaceMock
      .expects('create')
      .withArgs({ name: PLACE_NAME, teamId: TEAM_ID, url: undefined })
      .yields(defaultError(), null);

    createPlace(req, res);

    sendResponseStub.callCount.should.equal(0);
    expect(sendErrorStub).to.have.been.calledWith(res, defaultError(), USER_NAME, PLACE_NAME);
  });

});
