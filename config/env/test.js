module.exports = {
  datastores: {
    default: {
      url: 'mysql://[username]:[password]@localhost:3306/[database]'
    }
  },
  models: {
    migrate: 'drop'
  }
};
