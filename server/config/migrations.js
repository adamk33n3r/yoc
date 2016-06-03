'use strict';

module.exports = {
  development: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://localhost/yoc-dev'
  },
  production: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://localhost/yoc'
  }
}
