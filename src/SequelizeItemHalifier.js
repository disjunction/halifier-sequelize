const halifier = require('halifier')

class SequelizeItemHalifier extends halifier.AbstractItemHalifier {
  /**
   * @return {Promise}
   */
  halifyItem (item) {
    return Promise.resolve(Object.assign(
      {_links: this.getLinksForSingle(item)},
      item.toJSON ? item.toJSON() : item
    ))
  }
}

module.exports = SequelizeItemHalifier
