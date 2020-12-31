const { validateEnv } = require('./validate-env')

test('validate-env', () => {
  process.env.EXISTENT_VAR_NAME = 'value'
  delete process.env.NON_EXISTENT_VAR_NAME;

  expect(() => {
    validateEnv(['EXISTENT_VAR_NAME'])
  }).not.toThrow()

  expect(() => {
    validateEnv(['NON_EXISTENT_VAR_NAME'])
  }).toThrow('Environment variable "NON_EXISTENT_VAR_NAME" is not defined.')
})
