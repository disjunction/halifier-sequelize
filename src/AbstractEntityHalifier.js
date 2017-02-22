class AbstractEntityHalifier {
  /**
   * @param {Object} app - provides app context
   * @param {Object} opts
   * @param {String} opts.baseUrl - entities base url, e.g. /people
   * @param {String} [opts.name] - entity name
   */
  constructor (app, opts) {
    Object.assign(this, {app, opts})
  }

  getId (entity) {
    // another typical would be entity[this.opts.name + '_id']
    return entity.id
  }

  getLinksForSinle (entity) {
    return {
      self: {
        href: this.opts.baseUrl + '/' + this.getId(entity),
        title: 'get single ' + this.opts.name
      }
    }
  }

  halifySingle (entity) {
    return Object.assign(

    )
  }
}

module.exports = AbstractEntityHalifier
