/* eslint-env jasmine */
const SequelizeDataProvider = require('../src/SequelizeDataProvider')

describe('SequelizeDataProvider', () => {
  it('makeQuery() generates a valid query', () => {
    const testProvider = new SequelizeDataProvider(
      {context: {sequelize: {}}},
      {model: {}}
    )
    const query = testProvider.makeQuery({
      limit: 5,
      offset: 0,
      order: 'ok',
      query: {ok: 4}
    })
    expect(query.where.ok).toBe(4)
    expect(query.limit).toBe(5)
    expect(query.offset).toBe(0)
    expect(query.order).toEqual(['ok'])
  })
})
