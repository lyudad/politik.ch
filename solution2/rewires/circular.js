const CircularDependencyPlugin = require('circular-dependency-plugin')

const rewireCircular = config => {
  config.plugins.push(
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    })
  )

  return config
}

module.exports = rewireCircular
