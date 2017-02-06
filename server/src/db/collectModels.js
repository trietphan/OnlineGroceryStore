const { getFilenames, isDirectory, resolvePath } = require('../utils')

function isTestFile(filename) {
  return filename.includes('test')
}

async function isModelFile(filename) {
  const isDir = await isDirectory(filename)
  return !(isDir || isTestFile(filename))
}

async function getModelFiles(files) {
  let result = []

  for (let file of files) {
    const isModel = await isModelFile(file)
    if (isModel) result = result.concat([file])
  }

  return result
}

async function collectModels() {
  const files = await getFilenames(resolvePath('.', 'src', 'models'))
  const modelFiles = await getModelFiles(files)
  return modelFiles.map(m => require(m))
}

module.exports = collectModels
