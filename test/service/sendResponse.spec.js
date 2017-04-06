import emptyResponse from './builder/ResponseBuilder';

var sendResponse = require('../../app/service/sendResponse');

const responseContract = emptyResponse();
const statusStub = sinon.stub(responseContract, 'status');
const sendStub = sinon.stub(responseContract, 'send');

describe('sendResponse', function() {
  it("should send an 'in-channel' notification", function() {
    const NOTIFICATION_TEXT = "notification text";
    const SUCCESS_STATUS = 200;

    statusStub.withArgs(SUCCESS_STATUS).returns(responseContract);

    sendResponse(responseContract, NOTIFICATION_TEXT);

    expect(statusStub).to.have.been.calledWith(SUCCESS_STATUS);
    expect(sendStub).to.have.been.calledWith({
      response_type: "in_channel",
      text: NOTIFICATION_TEXT
    });
  });
});
