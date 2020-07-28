const rewireStyledComponents = require('react-app-rewire-styled-components')

const createRewireStyled = (options = {}) => (config, env) =>
  rewireStyledComponents(config, env, options)

module.exports = createRewireStyled
