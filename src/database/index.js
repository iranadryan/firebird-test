const Firebird = require('node-firebird');

const { dbOptions } = require("../config/database");

module.exports = {
  query(query, params, callback) {
    Firebird.attach(dbOptions, function (err, db) {
      if (err) {
        return callback(err, []);
      }

      db.query(query, params, function (err, result) {
        db.detach();

        if (err) {
          return callback(err, []);
        }

        callback(null, result);
      });
    });
  }
}
