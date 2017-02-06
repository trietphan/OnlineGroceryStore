const logger = require('../logger')
const log = logger.log('error')


module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  log(err, 'red')
  res.status(500).json({ message: 'An internal server error occurred' })
}
