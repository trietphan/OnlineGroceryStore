const oracledb = require('oracledb')
const dbconfig = require('../config/db')
const logger = require('../logger')

const log = logger.log('db')

function normalizeObject(obj) {
  return Object.keys(obj).reduce((result, currKey) => {
    result[currKey.toLocaleLowerCase()] = obj[currKey]
    return result
  }, {})
}

class Database {
  connect() {
    oracledb.autoCommit = true
    oracledb.outFormat = oracledb.OBJECT

    return new Promise((resolve, reject) => {
      oracledb.getConnection(dbconfig)
        .then(conn => {
          this._connection = conn
          resolve(log('connected to oracledb!', logger.colors.success))
        })
        .catch(err => reject(log(`failed to connect to oracledb: ${err}`, logger.colors.success)))
    })
  }

  execute(query, bindings={}, options={}) {
    log(`executing ${query}`)
    return this._connection.execute(query, bindings)
      .then(
        result => {
          if (result.rows) {
            return result.rows.map(normalizeObject)
          } else {
            return result
          }
        },
        err => {
          log(err, logger.colors.error)
          if (options.throwBack) {
            throw(err)
          }
        }
      )
  }
}

const db = new Database()

module.exports = db

