var sinon = require('sinon');
var assert = require('assert');
var sendResponse = require('../../app/router/sendResponse');

const successStatus = 200;
const responseContract = Object.assign({}, require('./responseContract'), {})

describe('sendResponse', function() {
  it("should send an 'in-channel' notification", function() {
    const notificationText = "notification text";

    var statusStub = sinon.stub(responseContract, 'status');
    var sendStub = sinon.stub(responseContract, 'send');

    statusStub.withArgs(successStatus).returns(responseContract);

    sendResponse(responseContract, notificationText);

    assert(statusStub.calledWith(successStatus));
    assert(sendStub.calledWith({
      response_type: "in_channel",
      text: notificationText
    }));
  });
});
