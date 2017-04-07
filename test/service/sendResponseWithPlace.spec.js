import {PLACE_NAME, TEAM_ID, PLACE_URL} from '../Constants';
import emptyResponse from './builder/ResponseBuilder';

var sendResponseWithPlace = require('../../app/service/sendResponseWithPlace');

const responseContract = emptyResponse();
const statusStub = sinon.stub(responseContract, 'status');
const sendStub = sinon.stub(responseContract, 'send');

describe('sendResponseWithPlace', () => {

  it("should send a regular 'in-channel' notification in case place was not provided", () => {
    const NOTIFICATION_TEXT = "notification text";
    const SUCCESS_STATUS = 200;

    statusStub.withArgs(SUCCESS_STATUS).returns(responseContract);

    sendResponseWithPlace(responseContract, NOTIFICATION_TEXT);

    expect(statusStub).to.have.been.calledWith(SUCCESS_STATUS);
    expect(sendStub).to.have.been.calledWith({
      response_type: "in_channel",
      text: NOTIFICATION_TEXT
    });
  });

  it("should send a regular 'in-channel' notification in case the place has no URL", () => {
    const NOTIFICATION_TEXT = "notification text";
    const SUCCESS_STATUS = 200;
    const PLACE = {name: PLACE_NAME, teamId: TEAM_ID};

    statusStub.withArgs(SUCCESS_STATUS).returns(responseContract);

    sendResponseWithPlace(responseContract, NOTIFICATION_TEXT, PLACE);

    expect(statusStub).to.have.been.calledWith(SUCCESS_STATUS);
    expect(sendStub).to.have.been.calledWith({
      response_type: "in_channel",
      text: NOTIFICATION_TEXT
    });
  });

  it("should send an 'in-channel' notification with attachments in case the place has an URL", () => {
    const NOTIFICATION_TEXT = "notification text";
    const SUCCESS_STATUS = 200;
    const PLACE = {name: PLACE_NAME, teamId: TEAM_ID, url: PLACE_URL};

    statusStub.withArgs(SUCCESS_STATUS).returns(responseContract);

    sendResponseWithPlace(responseContract, NOTIFICATION_TEXT, PLACE);

    expect(statusStub).to.have.been.calledWith(SUCCESS_STATUS);
    expect(sendStub).to.have.been.calledWith({
      response_type: "in_channel",
      text: NOTIFICATION_TEXT,
      attachments: [
        {
          "fallback": `${PLACE_NAME} is your random restaurant for today.`,
          "title": PLACE_NAME,
          "title_link": PLACE_URL,
          "text": "This is your random restaurant for today!"
        }
      ]
    });
  });
});
