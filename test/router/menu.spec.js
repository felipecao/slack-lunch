var proxyquire = require('proxyquire').noCallThru();

var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('assert');

const sendResponseStub = sinon.stub();
const menu = proxyquire('../../app/router/menu', {
  './sendResponse': sendResponseStub
});

describe('Menu', function() {
  it('should print information about the available commands', function() {

    var req = {body: {user_name: 'felipe'}};
    var res = sinon.stub();

    menu(req, res);

    expect(sendResponse).to.have.been.called.with(res, 'felipe');

  });
});
