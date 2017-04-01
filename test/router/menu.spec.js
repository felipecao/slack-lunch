var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('assert');
var sendResponse = require('../../app/router/sendResponse');
var subject = require('../../app/router/menu');

describe('Menu', function() {
  it('should print information about the available commands', function() {

    var req = sinon.stub();
    var res = sinon.stub();
    var spy = sinon.spy(sendResponse, "sendResponse");

    req.body.user_name = 'felipe';

    subject.menu(req, res);

    expect(sendResponse).to.have.been.called.with(res, 'felipe');

  });
});
