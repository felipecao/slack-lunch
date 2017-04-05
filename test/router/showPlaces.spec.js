import {USER_NAME, PLACE_NAME} from '../Constants';
import validRequest from './builder/RequestBuilder';
import defaultError from './builder/ErrorBuilder';

require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var mongoose = require('mongoose');

const req = validRequest();
const res = sinon.stub();
const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();
const showPlaces = proxyquire('../../app/router/showPlaces', {
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
      .expects('find')
      .yields(null, []);

    showPlaces(req, res);

    assert(sendResponseStub.calledWith(res, NO_PLACES_MESSAGE));
    assert(0 == sendErrorStub.callCount);
  });

  it('should suggest adding a place if there are no saved places', () => {

    const PLACES_WITH_NAMES = [{name: 'name0'}, {name: 'name1'}];
    const ALL_PLACES_MESSAGE = `@${USER_NAME} these are the places in our database: \n${PLACES_WITH_NAMES.map(p => `*${p.name}*`).join('\n')}`;

    PlaceMock
      .expects('find')
      .yields(null, PLACES_WITH_NAMES);

    showPlaces(req, res);

    assert(sendResponseStub.calledWith(res, ALL_PLACES_MESSAGE));
    assert(0 == sendErrorStub.callCount);
  });

  it('should send an error in case mongoose-returns an error', () => {

    PlaceMock
      .expects('find')
      .yields(defaultError(), []);

    showPlaces(req, res);

    assert(sendErrorStub.calledWith(res, defaultError()));
    assert(0 == sendResponseStub.callCount);
  });

});
