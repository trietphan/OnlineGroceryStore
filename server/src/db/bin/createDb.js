const Initializer = require('../Initializer')
const collectModels = require('../collectModels')
const { createJunctions } = require('../../models/junctions')
const addConstraints = require('../../models/constraints')
const seed = require('../../models/seed')

const logger = require('../../logger')
const log = logger.log('db-create')

;(async () => {
  const models = await collectModels()
  const initializer = new Initializer(models, [...createJunctions, ...addConstraints, ...seed])
  log('starting', logger.colors.success)
  await initializer.create()
  log('done!', logger.colors.success)
})()
