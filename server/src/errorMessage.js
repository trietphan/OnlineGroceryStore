function missingConnection(...connections) {
  return {
    error: `This model requires a connection. One of ${[...connections]} must be an object with an 'id' property.`
  }
}

module.exports = {
  missingConnection,
}
