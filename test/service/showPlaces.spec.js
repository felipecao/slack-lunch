import {USER_NAME, PLACE_NAME, TEAM_ID} from '../Constants';
import validRequest from './builder/RequestBuilder';
import defaultError from './builder/ErrorBuilder';

require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var mongoose = require('mongoose');

const req = validRequest();
const res = sinon.stub();
const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();
const showPlaces = proxyquire('../../app/service/showPlaces', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

var Place = mongoose.model('Place');
var PlaceMock = sinon.mock(Place);

describe('showPlaces', function () {

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();
  });

  it('should suggest adding a place if there are no saved places', function () {
    const NO_PLACES_MESSAGE = `@${USER_NAME} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`;

    PlaceMock
      .expects('where').withArgs('teamId', TEAM_ID)
      .chain('find')
      .yields(null, []);

    showPlaces(req, res);

    expect(sendResponseStub).to.have.been.calledWith(res, NO_PLACES_MESSAGE);
    sendErrorStub.callCount.should.equal(0);
  });

  it('should suggest adding a place if there are no saved places', () => {

    const PLACES_WITH_NAMES = [{name: 'name0'}, {name: 'name1'}];
    const ALL_PLACES_MESSAGE = `@${USER_NAME} these are the places in our database: \n${PLACES_WITH_NAMES.map(p => `*${p.name}*`).join('\n')}`;

    PlaceMock
      .expects('where').withArgs('teamId', TEAM_ID)
      .chain('find')
      .yields(null, PLACES_WITH_NAMES);

    showPlaces(req, res);

    expect(sendResponseStub).to.have.been.calledWith(res, ALL_PLACES_MESSAGE);
    sendErrorStub.callCount.should.equal(0);
  });

  it('should send an error in case mongoose-returns an error', () => {

    PlaceMock
      .expects('where').withArgs('teamId', TEAM_ID)
      .chain('find')
      .yields(defaultError(), []);

    showPlaces(req, res);

    expect(sendErrorStub).to.have.been.calledWith(res, defaultError());
    sendResponseStub.callCount.should.equal(0);
  });

});
