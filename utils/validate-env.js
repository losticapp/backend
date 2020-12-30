module.exports.validateEnv = parameters => {
  parameters.forEach(parameter => {
    if (!Object.prototype.hasOwnProperty.call(process.env, parameter) || !process.env[parameter]) {
      throw new Error(`Environment variable "${parameter}" is not defined.`)
    }
  })
}
