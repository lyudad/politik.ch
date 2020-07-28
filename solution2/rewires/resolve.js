const path = require('path')

const root = path.join(process.cwd(), 'src')

const rewireResolve = config => {
  config.resolve.modules.push(root)
  return config
}

module.exports = rewireResolve
