'use strict'
require('dotenv').config()
const http = require('http')
const directus = require('directus')
const getPort = require('get-port')

// func: ({ addr: string }) => Promise<void>
module.exports.runInServerContext = func => {
  return new Promise((resolve, reject) => {
    directus
      .createApp()
      .then(async app => {
        const port = await getPort()
        const addr = `http://localhost:${port}`
        const server = http.createServer(app);
        let funcErr = null

        // wait for server to start listening
        await new Promise(resolve => server.listen(port, resolve))

        try {
          await Promise.resolve(func({ addr }))
        } catch (err) {
          funcErr = err
        }

        server.close(closeErr => {
          if (funcErr) {
            return reject(funcErr)
          }

          if (closeErr) {
            return reject(closeErr)
          }

          resolve()
        })
      })
      .catch(err => {
        console.log('CreateContentType: Error:', err)
        next(err)
      })
  })
}
