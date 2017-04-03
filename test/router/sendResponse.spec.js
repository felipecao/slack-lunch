var sinon = require('sinon');
var assert = require('assert');
var sendResponse = require('../../app/router/sendResponse');

const successStatus = 200;
const responseContract = {
  status: function(number) {

  },
  send: function(json) {

  }
};

describe('sendResponse', function() {
  it("should send an 'in-channel' notification", function() {
    const notificationText = "notification text";

    var statusStub = sinon.stub(responseContract, 'status');
    var sendStub = sinon.stub(responseContract, 'send');

    statusStub.withArgs(successStatus).returns(responseContract);

    sendResponse(responseContract, notificationText);

    assert(sendStub.calledWith({
      response_type: "in_channel",
      text: notificationText
    }));
  });
});
