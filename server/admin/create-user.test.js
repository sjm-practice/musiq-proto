import {chai} from 'meteor/practicalmeteor:chai';
const expect = chai.expect;

import '/server/admin/create-user';

describe("Sign-up server side", function () {
  describe("Create User Account", function () {

    let removeTestUser = function () {
      let tUser = Accounts.findUserByUsername('test');
      if (tUser) { Meteor.users.remove(tUser._id); }
    };

    beforeEach(function () {
      removeTestUser();
    });

    afterEach(function () {
      removeTestUser();
    });

    it("without a username throws an exception", function () {

      // to test a function throwing an exception, you must wrap the function in an
      // anonymous function (or use .bind), so expect can call the function.
      // else, expect gets the return value of the passed in function
      // http://stackoverflow.com/questions/21587122/mocha-chai-expect-to-throw-not-catching-thrown-errors

      // test for throw, using an anonymous function wrapper
      expect(function () {
        Accounts.createUser({
          email: 'test@test.com',
          password: 'asdfasdf',
          profile: {selectedPlayer: 'test'}
        });
      }).to.throw(/Username must have at lest 3 characters/);

    });

    it("with a username does not throw an exception", function () {
      // test for throw, using bind
      expect(Accounts.createUser.bind(Accounts, {
          username: 'test',
          email: 'test@test.com',
          password: 'asdfasdf',
          profile: {selectedPlayer: 'test'}
      })).to.not.throw(/Username must have at lest 3 characters/);
    });

    it("creates profile with selectedPlayer set to username", function () {

      Accounts.createUser({
        username: 'test',
        email: 'test@test.com',
        password: 'asdfasdf'
      });

      expect(Accounts.findUserByUsername('test').profile.selectedPlayer).to.equal('test');
    });
  });
});
