const R = require('ramda')

class SequelizeDataProvider {
  constructor (app, opts) {
    if (!opts || !opts.model) {
      throw new Error('SequelizeDataProvider requires model instance to be provided')
    }
    if (!R.path(['context', 'sequelize'], app)) {
      throw new Error(
        'SequelizeDataProvider requires app.context.sequelize to contain sequelize instance'
      )
    }
    Object.assign(this, {app, opts})
  }

  makeQuery (listMeta) {
    const query = {
      where: listMeta.query || {},
      limit: listMeta.limit,
      offset: listMeta.offset
    }

    if (listMeta.order) {
      query.order = listMeta.order.map(fieldOrder => {
        const field = R.nth(0, R.keys(fieldOrder))
        return [field, String(fieldOrder[field]).toUpperCase()]
      })
        .filter(R.nth(0))
    }

    return query
  }

  runListQuery (listMeta) {
    const query = this.transformQuery(this.makeQuery(listMeta))
    let selected
    return this.opts.model.findAll(query)
      .then(rows => {
        selected = rows
        if (rows.length >= query.limit) {
          return this.opts.model.count(query)
        } else {
          return rows.length
        }
      })
      .then(total => {
        const newListMeta = Object.assign({}, listMeta, {
          stats: {
            total,
            returned: selected.length
          }
        })
        return [selected, newListMeta]
      })
  }

  transformQuery (query) {
    return query
  }

  findById (id) {
    const fieldName = this.opts.idFieldName || 'id'
    const query = this.transformQuery({
      where: {
        [fieldName]: id
      }
    })
    return this.opts.model.findOne(query)
  }
}

module.exports = SequelizeDataProvider
