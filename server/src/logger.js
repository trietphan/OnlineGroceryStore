const chalk = require('chalk')
const inspect = require('util').inspect

class Logger {
  constructor(writeFn) {
    this.write = writeFn
    this.colors = {
      success: 'green',
      error: 'red',
      timestamp: 'blue'
    }
  }

  log (event, eventColor='blue') {
    return (msg, color='white') => {
      const now = new Date()
      const time = now.toISOString().split('T')[1].slice(0, 8)

      const prefix = chalk[eventColor](`[${time}-${event.toUpperCase()}]`)
      const body = chalk[color](typeof(msg) === 'string' ? msg : inspect(msg))

      this.write(`${prefix} ${body}`)
    }
  }
}

const logger = new Logger(console.log)
module.exports = logger
