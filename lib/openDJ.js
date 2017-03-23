'use strict';
var request = require('request');
var merge = require('lodash.merge');

// request.debug = true;

module.exports = function() {
  var settings = {};

  var empty = function() {};

  var init = function() {
    settings = {
      API: {
        cert: process.env.OPENDJ_CACERT,
        baseUrl: process.env.OPENDJ_URL_BASE,
        userManagementPath: process.env.OPENDJ_PATH_USERS || '/users',
        passwordManagementPath: process.env.OPENDJ_PATH_PASSWORD || '/users',
        headers: {
          userName: process.env.OPENDJ_USERNAME,
          password: process.env.OPENDJ_PASSWORD,
        },
        requestType: {
          CREATE_USER: 0,
          UPDATE_USER: 1,
          DELETE_USER: 2,
          READ_USER: 3,
          CHANGE_USER_PASSWORD: 4,
          RESET_USER_PASSWORD: 5,
        },
      },
    };
  };

  var getDefaultOption = function() {
    return {
      'cacert': settings.API.cert,
      'rejectUnauthorized': false,
      'headers': {
        'X-OpenIDM-Username': settings.API.headers.userName,
        'X-OpenIDM-Password': settings.API.headers.password,
        'Content-Type': 'application/json',
      },
    };
  };

  var getAPIPath = function(apiSegment) {
    return apiSegment;
  };

  var createUser = function(data, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.userManagementPath);
    var options = merge(getDefaultOption(), {
      'url': url,
      'qs': {'_action': 'create'},
      'method': 'POST',
      'json': data,
    });
    makeAPICall(options, callback, settings.API.requestType.CREATE_USER);
  };

  var updateUser = function(userName, data, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.userManagementPath + '/' + userName);
    var options = merge(getDefaultOption(), {
      'url': url,
      'method': 'PUT',
      'json': data,
      'headers': {
        'If-Match': '*',
      },
    });
    makeAPICall(options, callback, settings.API.requestType.UPDATE_USER);
  };

  var getUser = function(userName, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.userManagementPath + '/' + userName);
    var options = merge(getDefaultOption(), {
      'url': url,
      'method': 'GET',
    });
    makeAPICall(options, callback, settings.API.requestType.READ_USER);
  };

  var deleteUser = function(userName, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.userManagementPath + '/' + userName);
    var options = merge(getDefaultOption(), {
      'url': url,
      'method': 'DELETE',
    });
    makeAPICall(options, callback, settings.API.requestType.DELETE_USER);
  };

  var changeUserPassword = function(userName, data, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.passwordManagementPath + '/' + userName);
    var options = merge(getDefaultOption(), {
      'url': url,
      'qs': {'_action': 'passwordModify'},
      'method': 'POST',
      'json': data,
    });
    // Override user headers to change password
    options.headers['X-OpenIDM-Username'] = userName;
    options.headers['X-OpenIDM-Password'] = data.oldPassword;
    makeAPICall(options, callback, settings.API.requestType.CHANGE_USER_PASSWORD);
  };

  var resetUserPassword = function(userName, data, callback) {
    var url = settings.API.baseUrl + getAPIPath(settings.API.passwordManagementPath + '/' + userName);
    var options = merge(getDefaultOption(), {
      'url': url,
      'qs': {'_action': 'passwordModify'},
      'method': 'POST',
      'json': data,
    });
    makeAPICall(options, callback, settings.API.requestType.RESET_USER_PASSWORD);
  };

  var makeAPICall = function(options, callback, type) {
    var _callback = callback || empty;
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
        _callback({code: error.statusCode}, error);
        return;
      }
      if (response.statusCode !== 200) {
        _callback({code: response.statusCode}, null);
        return;
      }

      var content = body.results;
      _callback({code: response.statusCode}, content);
    });
  };

  init();

  return {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    changeUserPassword: changeUserPassword,
    resetUserPassword: resetUserPassword,
  };
};
