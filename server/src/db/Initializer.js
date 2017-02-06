const dqg = require('./ddlQueryGenerator')
const db = require('./driver')


class Initializer {
  constructor(models, additionalQueries=[]) {
    this.models = models
    this.additionalQueries = additionalQueries
  }

  async execute(instructions, retry=false) {
    await db.connect()
    let failedInstructions = []
    for (let instruction of instructions) {
      try {
        await db.execute(instruction, {}, { throwBack: true })
      } catch (err) {
        if (!err.message.includes('does not exist')) {
          failedInstructions = failedInstructions.concat([instruction])
        }
      }
    }

    if (retry && failedInstructions.length > 0) {
      this.execute(failedInstructions, true)
    }
  }

  create() {
    return this.execute(
      dqg.flattenInstructions(this.models, dqg.getCreationInstructions).concat(this.additionalQueries)
    )
  }

  drop() {
    return this.execute(
      dqg.flattenInstructions(this.models, dqg.getTeardownInstructions).concat(this.additionalQueries),
      true
    )
  }
}

module.exports = Initializer
