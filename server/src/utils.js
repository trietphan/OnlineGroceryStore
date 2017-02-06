const fs = require('fs')
const path = require('path')


function resolvePath(...args) {
  return path.resolve(...args)
}

function getFilenames(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.map(f => resolvePath(dir, f)))
      }
    })
  })
}

function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.isDirectory())
      }
    })
  })
}

function zipWithIndex(seq) {
  return seq.map((e, i) => [e, i])
}

module.exports = {
  getFilenames,
  isDirectory,
  resolvePath,
  zipWithIndex,
}
