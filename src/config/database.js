const path = require('node:path');

module.exports = {
  dbOptions: {
    host: 'localhost',
    port: 3050,
    database: path.resolve(__dirname, '..', '..', '..', 'NODEFIREBIRD.FDB'),
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: 'false',
    role: null,
    pageSize: 4096,
  }
};
