import {USER_NAME, PLACE_NAME, TEAM_ID} from '../Constants';
import validRequest from './builder/RequestBuilder';

const req = validRequest();
const placeName = 'wallabiesthai';
const url = 'http://www.wallabiesthai.com.au/';

var PlaceFactory = require('../../app/service/PlaceFactory');

describe('PlaceFactory', function() {
  describe('#fromRequestBody', function() {

    it('should return a place without URL if an URL is not contained in text', function() {
      req.body.text = `${placeName}`;

      var newPlace = PlaceFactory.fromRequestBody(req.body);

      newPlace.name.should.equal(placeName);
      newPlace.teamId.should.equal(TEAM_ID);
      expect(newPlace.url).to.equal(undefined);
    });

    it("should return a place without URL if there's no place between name and url", function() {
      req.body.text = `${placeName}${url}`;

      var newPlace = PlaceFactory.fromRequestBody(req.body);

      newPlace.name.should.equal(req.body.text);
      newPlace.teamId.should.equal(TEAM_ID);
      expect(newPlace.url).to.equal(undefined);
    });

    it('should return a place with URL if an URL is contained in body text', function() {
      req.body.text = `${placeName} ${url}`;

      var newPlace = PlaceFactory.fromRequestBody(req.body);

      newPlace.name.should.equal(placeName);
      newPlace.teamId.should.equal(TEAM_ID);
      newPlace.url.should.equal(url);
    });
  });
});
