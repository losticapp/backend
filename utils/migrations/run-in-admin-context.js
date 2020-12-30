const axios = require('axios').default
const { validateEnv } = require('../validate-env')
const { runInServerContext } = require('./run-in-server-context')

// Run a function in the admin context to perform authorized operations on the application
// func: ({ addr: string, authHeaders: {} }) => Promise<void>
module.exports.runInAdminContext = async func => {
  validateEnv(['ADMIN_EMAIL', 'ADMIN_PASSWORD'])

  await runInServerContext(async meta => {
    const resp = await axios.post(`${meta.addr}/auth/login`, {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    })
    const authHeaders = {
      Authorization: `Bearer ${resp.data.data.access_token}`
    }
    const nmeta = {
      ...meta,
      authHeaders
    }
    let error = null

    try {
      await Promise.resolve(func(nmeta))
    } catch(err) {
      error = err
    }

    // logout
    await axios.post(`${meta.addr}/auth/logout`, { refresh_token: resp.data.data.refresh_token })

    if (error) {
      throw error
    }
  })
}
