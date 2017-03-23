'use strict';

var json = {
  '_id': 'newuser',
  'contactInformation': {
    'telephoneNumber': '+1 408 555 1212',
    'emailAddress': 'newuser@example.com',
  },
  'name': {
    'familyName': 'New',
    'givenName': 'User',
  },
  'displayName': 'New User',
  'manager': [{
    '_id': 'kvaughan',
    'displayName': 'Kirsten Vaughan',
  }],
};

module.exports = json;
