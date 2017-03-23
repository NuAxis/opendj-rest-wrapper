'use strict';

var json = {
  '_id': 'newuser',
  '_rev': '0000000090ed73ac',
  'schemas': [
    'urn:scim:schemas:core:1.0',
  ],
  'userName': 'newuser@example.com',
  'displayName': 'New User',
  'name': {
    'givenName': 'User',
    'familyName': 'New',
  },
  'contactInformation': {
    'telephoneNumber': '+1 408 555 1212',
    'emailAddress': 'newuser@example.com',
  },
  'meta': {
    'created': '2017-03-08T02:53:08Z',
  },
  'manager': [{
    '_id': 'kvaughan',
    'displayName': 'Kirsten Vaughan',
  }],
};

module.exports = json;
