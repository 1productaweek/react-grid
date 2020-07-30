const path = require('path')

module.exports = ({ config, env }) => {
  config.module.rules[0].test = /\.(mjs|(t|j)sx?)$/

  config.output.globalObject = 'this'

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
