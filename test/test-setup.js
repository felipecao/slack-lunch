var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var expect = chai.expect;
var sinonChai = require('sinon-chai');

global.chai = chai;
global.sinon = sinon;
global.should = should;
global.expect = expect;

chai.use(sinonChai);
