const querystring = require('querystring')
const meta = require('./meta')

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

  makeLinkForListFromQuery (query) {
    return this.opts.baseUrl + '?' + querystring.stringify(query)
  }

  makeNextPrevLinks (list, proto) {
    const result = {}
    const meta = proto._listMeta
    if (!meta.query || !meta.totalCount) {
      throw new Error('default implementation requires _listMeta.query and _listMeta.totalCount')
    }
    const query = Object.assign({}, meta.query)

    if (meta.offset > 0) {
      query.offset = Math.max(0, meta.offset - meta.limit)
      if (!meta.offset) {
        delete query.offset
      }
      result.prev = {
        href: this.makeLinkForListFromQuery(query)
      }
    }

    if (meta.offset + list.length < meta.totalCount) {
      query.offset = meta.offset + meta.limit
      result.next = {
        href: this.makeLinkForListFromQuery(query)
      }
    }

    return result
  }

  getLinksForSingle (entity) {
    return {
      self: {
        href: this.opts.baseUrl + '/' + this.getId(entity),
        title: 'get single ' + this.opts.name
      }
    }
  }

  makeProtoFromReq (req) {
    const listMeta = meta.getListMetaFromReq(req, this.opts)
    return {
      _listMeta: listMeta
    }
  }

  getLinksForList (list, proto) {
    const listMeta = Object.assign(
      {},
      proto._listMeta,
      this.makeNextPrevLinks(list, proto)
    )
    return listMeta
  }

  getEmbeddedForList (list, proto) {
    return {
      [this.opts.name]: list.map(entity => this.halifyListItem(entity))
    }
  }

  halifyListItem (entity) {
    return this.halifySingle(entity)
  }

  halifySingle (entity) {
    return Object.assign(
      {_links: this.getLinksForSingle(entity)},
      entity
    )
  }

  halifyList (list, proto) {
    return Object.assign(
      {
        _links: this.getLinksForList(list, proto),
        _embedded: this.getEmbeddedForList(list, proto)
      },
      proto
    )
  }
}

module.exports = AbstractEntityHalifier
