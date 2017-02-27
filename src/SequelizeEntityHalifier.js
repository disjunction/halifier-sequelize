const halifier = require('halifier')

class SequelizeEntityHalifier extends halifier.AbstractEntityHalifier {
  /**
   * @return {Promise}
   */
  halifySingle (entity) {
    return Promise.resolve(Object.assign(
      {_links: this.getLinksForSingle(entity)},
      entity.toJSON ? entity.toJSON() : entity
    ))
  }
}

module.exports = SequelizeEntityHalifier
