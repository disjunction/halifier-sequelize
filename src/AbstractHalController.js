class AbstractHalController {
  constructor (app, opts, entityHalifier) {
    Object.assign(this, {app, opts, entityHalifier})
  }
}

module.exports = AbstractHalController
