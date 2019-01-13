module.exports = {


  friendlyName: 'Read from cache',


  description: '',


  inputs: {
    cacheKey: {
      type: 'string',
      description: 'cache key',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const { cacheKey } = inputs;

    if (sails.config.environment !== 'production') {
      sails.log.debug(`helpers.read-from-cache ${cacheKey}: cache disabled for ${sails.config.environment}`);
      return exits.success(null);
    }

    try {
      const cacheData = await sails.getDatastore('cache').leaseConnection(async db => {
        const cachedData = await db.getAsync(cacheKey);
        if (cachedData) {
          sails.log.debug(`[hit cache] ${cacheKey} ${cachedData}`);
          return JSON.parse(cachedData);
        }

        return null;
      });

      return exits.success(cacheData);
    } catch (e) {
      sails.log.error(`helpers.read-from-cache: read ${cacheKey} error ${e}`);
      return exits.error(e);
    }
  }


};

