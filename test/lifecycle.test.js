const sails = require('sails');

module.exports = {
  setup () {
    return new Promise((resolve, reject) => {
      sails.lift({
        hooks: { grunt: false },
        log: { level: 'warn' },
      }, (err) => {
        if (err) { return reject(err); }
        return resolve();
      });
    });
  },
  teardown () {
    return new Promise((resolve, reject) => {
      sails.lower((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }
};
