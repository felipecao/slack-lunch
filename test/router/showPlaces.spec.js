require('sinon-mongoose');
require('../../app/model/Place');

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var assert = require('assert');
var mongoose = require('mongoose');

const sendResponseStub = sinon.stub();
const sendErrorStub = sinon.stub();

const userName = 'felipe';
const showPlaces = proxyquire('../../app/router/showPlaces', {
  './sendResponse': sendResponseStub,
  './sendError': sendErrorStub
});

describe('showPlaces', function () {

  afterEach(() => {
    sendResponseStub.reset();
    sendErrorStub.reset();
  });

  var Place = mongoose.model('Place');
  var PlaceMock = sinon.mock(Place);

  it('should suggest adding a place if there are no saved places', function () {
    const noPlacesMessage = `@${userName} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`;

    PlaceMock
      .expects('find')
      .yields(null, []);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    showPlaces(req, res);

    assert(sendResponseStub.calledWith(res, noPlacesMessage));
    assert(0 == sendErrorStub.callCount);
  });

  it('should suggest adding a place if there are no saved places', function () {

    const placesWithNames = [{name: 'name0'}, {name: 'name1'}];
    const allPlacesMessage = `@${userName} these are the places in our database: \n${placesWithNames.map(p => `*${p.name}*`).join('\n')}`;

    PlaceMock
      .expects('find')
      .yields(null, placesWithNames);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    showPlaces(req, res);

    assert(sendResponseStub.calledWith(res, allPlacesMessage));
    assert(0 == sendErrorStub.callCount);
  });

  it('should send an error in case mongoose-returns an error', function () {

    const error = {code: 123};

    PlaceMock
      .expects('find')
      .yields(error, []);

    var req = {body: {user_name: userName}};
    var res = sinon.stub();

    showPlaces(req, res);

    assert(sendErrorStub.calledWith(res, error));
    assert(0 == sendResponseStub.callCount);
  });

});
