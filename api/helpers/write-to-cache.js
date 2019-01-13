module.exports = {


  friendlyName: 'Write to cache',


  description: '',


  inputs: {
    cacheKey: {
      type: 'string',
      description: 'cache key',
      required: true,
    },
    cacheValue: {
      type: 'ref',
      description: 'cache value, should be a object',
    },
    cacheTime: {
      type: 'number',
      description: 'cache time (second)',
      defaultsTo: 2 * 60 * 60
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const { cacheKey, cacheValue, cacheTime } = inputs;

    if (sails.config.environment !== 'production') {
      sails.log.debug(`helpers.write-to-cache ${cacheKey}: cache disabled for ${sails.config.environment}`);
      return exits.success();
    }

    try {
      await sails.getDatastore('cache').leaseConnection(async db => {
        await db.setAsync([cacheKey, JSON.stringify(cacheValue), 'EX', cacheTime]);
      });

      return exits.success();
    } catch (e) {
      sails.log.error(`helpers.write-to-cache: save ${cacheKey} / ${cacheValue} / ${cacheTime} error ${e}`);
      return exits.error(e);
    }
  }


};

