const root = require('./rewires/common').root
const rewireResolve = require('./rewires/resolve')

module.exports = function override(config, env) {
  return rewireResolve(config, env)
}
