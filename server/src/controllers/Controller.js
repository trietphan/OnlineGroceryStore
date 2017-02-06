class Controller {
  constructor({ onGet, onGetId, onPut, onPost, onDelete }) {
    this._onGet = onGet
    this._onGetId = onGetId
    this._onPut = onPut
    this._onPost = onPost
    this._onDelete = onDelete
  }

  onGet() {
    const self = this
    return async function (req, res, next) {
      try {
        const result = await self._onGet()
        return res.status(200).json(result)
      } catch (err) {
        return next(err)
      }
    }
  }

  onGetId() {
    const self = this
    return async function (req, res, next) {
      try {
        const result = await self._onGetId(req.params.id)
        return res.status(200).json(result)
      } catch (err) {
        return next(err)
      }
    }
  }

  onPut() {
    const self = this
    return async function (req, res, next) {
      try {
        const result = await self._onPut(req.params.id, req.body)
        return res.status(200).json(result)
      } catch (err) {
        return next(err)
      }
    }
  }

  onPost() {
    const self = this
    return async function (req, res, next) {
      try {
        const result = await self._onPost(req.body)
        return res.status(201).json(result)
      } catch (err) {
        return next(err)
      }
    }
  }

  onDelete() {
    const self = this
    return async function (req, res, next) {
      try {
        const result = await self._onDelete(req.params.id)
        return res.status(200).json(result)
      } catch (err) {
        return next(err)
      }
    }
  }
}

module.exports = Controller
