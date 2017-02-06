const Initializer = require('../Initializer')
const collectModels = require('../collectModels')
const { teardownJunctions } = require('../../models/junctions')

const logger = require('../../logger')
const log = logger.log('db-create')

;(async () => {
  const models = await collectModels()
  const initializer = new Initializer(models, teardownJunctions)
  log('starting', logger.colors.success)
  await initializer.drop()
  log('done!', logger.colors.success)
})()
