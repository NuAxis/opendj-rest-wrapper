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

# Build

    npm test
