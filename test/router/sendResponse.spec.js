import emptyResponse from './builder/ResponseBuilder';

var sinon = require('sinon');
var assert = require('assert');
var sendResponse = require('../../app/router/sendResponse');

const responseContract = Object.assign({}, emptyResponse(), {})
const statusStub = sinon.stub(responseContract, 'status');
const sendStub = sinon.stub(responseContract, 'send');

describe('sendResponse', function() {
  it("should send an 'in-channel' notification", function() {
    const NOTIFICATION_TEXT = "notification text";
    const SUCCESS_STATUS = 200;

    statusStub.withArgs(SUCCESS_STATUS).returns(responseContract);

    sendResponse(responseContract, NOTIFICATION_TEXT);

    assert(statusStub.calledWith(SUCCESS_STATUS));
    assert(sendStub.calledWith({
      response_type: "in_channel",
      text: NOTIFICATION_TEXT
    }));
  });
});
