'use strict';

var nock = require('nock');
var chai = require('chai');
var client = require('../lib/openDJ');
var expect = chai.expect;
var url = process.env.OPENDJ_URL_BASE;

var USER_404_RESPONSE = require('../spec/fixtures/user404Response');
var GET_USER_RESPONSE = require('../spec/fixtures/getUser200Response');
var NEW_USER_REQUEST = require('../spec/fixtures/newUserRequest');
var NEW_USER_BAD_REQUEST = require('../spec/fixtures/newUserBadRequest');
var NEW_USER_201_RESPONSE = require('../spec/fixtures/newUser201Response');
var NEW_USER_400_RESPONSE = require('../spec/fixtures/newUser400Response');
var NEW_USER_412_RESPONSE = require('../spec/fixtures/newUser412Response');
var EDIT_USER_REQUEST = require('../spec/fixtures/editUserRequest');
var EDIT_USER_400_RESPONSE = require('../spec/fixtures/editUser400Response');
var EDIT_USER_200_RESPONSE = require('../spec/fixtures/editUser200Response');
var DELETE_USER_200_RESPONSE = require('../spec/fixtures/deleteUser200Response');
var CHANGE_USER_PASSWORD_REQUEST = require('../spec/fixtures/changeUserPasswordRequest');
var RESET_USER_PASSWORD_REQUEST = require('../spec/fixtures/resetUserPasswordRequest');

describe('Open DJ Client module', function() {
  describe('User Management', function() {
    afterEach(function() {
      nock.cleanAll();
    });

    describe('Add User', function() {
      it('should raise error for invalid payload', function(done) {
        nock.cleanAll();
        nock(url).post('/users?_action=create').reply(400, NEW_USER_400_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(400);
          done();
        };
        client().createUser(NEW_USER_BAD_REQUEST, callback);
      });

      it('should be able to add user', function(done) {
        nock(url).post('/users?_action=create').reply(201, NEW_USER_201_RESPONSE);
        var callback = function(result, error) {
          expect(result.code).to.be.equal(201);
          done();
        };
        client().createUser(NEW_USER_REQUEST, callback);
      });

      it('should raise error if user already exist', function(done) {
        nock(url).post('/users?_action=create').reply(412, NEW_USER_412_RESPONSE);
        var callback = function(result, error) {
          expect(result.code).to.be.equal(412);
          done();
        };
        client().createUser(NEW_USER_REQUEST, callback);
      });
    });

    describe('Update User', function() {
      it('should raise error for invalid payload', function(done) {
        nock(url).put('/users/newuser').reply(400, EDIT_USER_400_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(400);
          done();
        };
        client().updateUser('newuser', {}, callback);
      });

      it('should be able to update user', function(done) {
        nock(url).put('/users/newuser').reply(200, EDIT_USER_200_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(200);
          done();
        };
        client().updateUser('newuser', EDIT_USER_REQUEST, callback);
      });

      it('should raise error if user doesn\'t exist', function(done) {
        nock(url).put('/users/newuser1').reply(404, USER_404_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(404);
          done();
        };
        client().updateUser('newuser1', EDIT_USER_REQUEST, callback);
      });
    });

    describe('Delete User', function() {
      it('should be able to delete user', function(done) {
        nock(url).delete('/users/newuser').reply(200, DELETE_USER_200_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(200);
          done();
        };
        client().deleteUser('newuser', callback);
      });

      it('should raise error if user doesn\'t exist', function(done) {
        nock(url).delete('/users/newuser1').reply(404, USER_404_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(404);
          done();
        };
        client().deleteUser('newuser1', callback);
      });
    });

    describe('Get User', function() {
      it('should be able to get user', function(done) {
        nock(url).get('/users/newuser').reply(200, GET_USER_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(200);
          done();
        };
        client().getUser('newuser', callback);
      });

      it('should raise error if user doesn\'t exist', function(done) {
        nock(url).get('/users/newuser1').reply(404, USER_404_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(404);
          done();
        };
        client().getUser('newuser1', callback);
      });
    });

    describe('Change User Password', function() {
      it('should be able to changer user password', function(done) {
        nock(url).post('/users/newuser?_action=passwordModify').reply(200, CHANGE_USER_PASSWORD_REQUEST);
        var callback = function(result) {
          expect(result.code).to.be.equal(200);
          done();
        };
        client().changeUserPassword('newuser', CHANGE_USER_PASSWORD_REQUEST, callback);
      });

      it('should raise error if user doesn\'t exist', function(done) {
        nock(url).post('/users/newuser1?_action=passwordModify').reply(404, USER_404_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(404);
          done();
        };
        client().changeUserPassword('newuser1', CHANGE_USER_PASSWORD_REQUEST, callback);
      });
    });

    describe('Reset User Password', function() {
      it('should be able to reset user password', function(done) {
        nock(url).post('/users/newuser?_action=passwordModify').reply(200, {});
        var callback = function(result) {
          expect(result.code).to.be.equal(200);
          done();
        };
        client().resetUserPassword('newuser', RESET_USER_PASSWORD_REQUEST, callback);
      });

      it('should raise error if user doesn\'t exist', function(done) {
        nock(url).post('/users/newuser1?_action=passwordModify').reply(404, USER_404_RESPONSE);
        var callback = function(result) {
          expect(result.code).to.be.equal(404);
          done();
        };
        client().resetUserPassword('newuser1', {}, callback);
      });
    });
  });
});
