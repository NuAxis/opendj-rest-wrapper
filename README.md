# opendj-rest-wrapper
JavaScript library for OpenDJ REST API to access directory data as JSON resources over HTTP

    npm install opendj-rest-wrapper

# Interfaces
```javascript
var client = require('opendj-rest-wrapper');

client.getUser(userName, callback),
client.createUser(data, callback),
client.updateUser(userName, data, callback),
client.deleteUser(userName, callback),
client.changeUserPassword(userName, data, callback),
client.resetUserPassword(userName, data, callback),

```

# Configuration
```Environment variables
# OPENDJ REST API
export OPENDJ_URL_BASE=(URL of the server including port, Must be HTTPS for password management)
export OPENDJ_PATH_USERS=(Path of user management, Default '/users')
export OPENDJ_PATH_PASSWORD=(Path of password management, Default '/users')
export OPENDJ_USERNAME=(Admin username for basic auth)
export OPENDJ_PASSWORD=(Admin user password for basic auth)
export OPENDJ_CACERT=(Certificate if not using well-known CA, Must be specified for password management)

```

# Test

    npm test
