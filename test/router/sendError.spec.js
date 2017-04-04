var sinon = require('sinon');
var assert = require('assert');
var sendError = require('../../app/router/sendError');
var statusStub;
var sendStub;

let error = {};

const clientErrorStatus = 400;
const constraintViolationStatus = 409;
const constraintViolationErrorCode = 11000;
const responseContract = Object.assign({}, require('./responseContract'), {})

describe('sendError', function() {
  before(() => {
    statusStub = sinon.stub(responseContract, 'status');
    sendStub = sinon.stub(responseContract, 'send');
  });

  beforeEach(() => {
    error.code = 0;
  });

  it("should issue a 409 error for a constraint violation error", function() {
    const userName = "user";
    const placeName = "place";

    statusStub.withArgs(constraintViolationStatus).returns(responseContract);
    error.code = constraintViolationErrorCode;

    sendError(responseContract, error, userName, placeName);

    assert(statusStub.calledWith(constraintViolationStatus));
    assert(sendStub.calledWith(`@${userName} '${placeName}' already exists`));
  });

  it("should issue a 400 error for a non-constraint violation error", function() {
    statusStub.withArgs(clientErrorStatus).returns(responseContract);

    sendError(responseContract, error);

    assert(statusStub.calledWith(clientErrorStatus));
    assert(sendStub.calledWith(error));
  });
});
