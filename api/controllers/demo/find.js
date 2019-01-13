module.exports = {

  friendlyName: 'A demo',

  inputs: {
    name: {
      type: 'string',
      description: 'Just for demo',
      defaultsTo: 'sails.js'
    }
  },


  exits: {
    success: {
      description: 'return welcome message'
    }
  },


  fn: async function (inputs, exits) {

    const message = `hello, ${inputs.name}`

    return exits.success(
      message
    );
  }
};
