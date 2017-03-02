const halifier = require('halifier')
const SequelizeDataProvider = require('./SequelizeDataProvider')
const SequelizeItemHalifier = require('./SequelizeItemHalifier')

class SequelizeHalController extends halifier.AbstractHalController {
  constructor (app, opts) {
    // avoid side effects when overwritings opts
    opts = Object.assign({}, opts)
    if (!opts.dataProvider) {
      opts.dataProvider = new SequelizeDataProvider(app, opts)
    }
    if (!opts.itemHalifier) {
      opts.itemHalifier = new SequelizeItemHalifier(app, opts)
    }

    super(app, opts)
  }
}

module.exports = SequelizeHalController
