import {chai} from 'meteor/practicalmeteor:chai';
const expect = chai.expect;

import '/server/admin/create-user';

describe("Sign-up", function () {
  describe("Create User Account", function () {
    it("without a username throws an exception", function () {
      expect(5).to.equal(5);
    });

    it("with a username does not throw an exception", function () {
      expect(6).to.equal(5);
    });
  });
});
