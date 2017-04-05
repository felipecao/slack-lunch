import {USER_NAME, PLACE_NAME} from '../Constants';
import emptyResponse from './builder/ResponseBuilder';
import defaultError from './builder/ErrorBuilder';

var sinon = require('sinon');
var assert = require('assert');
var sendError = require('../../app/router/sendError');
var statusStub;
var sendStub;

let error = Object.assign({}, defaultError(), {});
const responseContract = Object.assign({}, emptyResponse(), {});

describe('sendError', function() {
  before(() => {
    statusStub = sinon.stub(responseContract, 'status');
    sendStub = sinon.stub(responseContract, 'send');
  });

  beforeEach(() => {
    error.code = 0;
  });

  it("should issue a 409 error for a constraint violation error", function() {
    const CONSTRAINT_VIOLATION_STATUS = 409;
    const CONSTRAINT_VIOLATION_ERROR_CODE = 11000;

    statusStub.withArgs(CONSTRAINT_VIOLATION_STATUS).returns(responseContract);
    error.code = CONSTRAINT_VIOLATION_ERROR_CODE;

    sendError(responseContract, error, USER_NAME, PLACE_NAME);

    assert(statusStub.calledWith(CONSTRAINT_VIOLATION_STATUS));
    assert(sendStub.calledWith(`@${USER_NAME} '${PLACE_NAME}' already exists`));
  });

  it("should issue a 400 error for a non-constraint violation error", function() {
    const CLIENT_ERROR_STATUS = 400;

    statusStub.withArgs(CLIENT_ERROR_STATUS).returns(responseContract);

    sendError(responseContract, error);

    assert(statusStub.calledWith(CLIENT_ERROR_STATUS));
    assert(sendStub.calledWith(error));
  });
});
