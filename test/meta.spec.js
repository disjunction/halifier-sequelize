/* eslint-env jasmine */
const meta = require('../src/meta')

describe('meta', () => {
  describe('getListMetaFromReq()', () => {
    it('reads values from query', () => {
      const req = {query: {limit: 17, offset: 5}}
      const opts = {autoLimit: 50}
      const listMeta = meta.getListMetaFromReq(req, opts)
      expect(listMeta.limit).toBe(17)
      expect(listMeta.offset).toBe(5)
    })
    it('sets default values', () => {
      const req = {query: {}}
      const opts = {autoLimit: 50}
      const listMeta = meta.getListMetaFromReq(req, opts)
      expect(listMeta.limit).toBe(50)
      expect(listMeta.offset).toBe(0)
    })
  })
  describe('extrasFromHyphened()', () => {
    it('reads limit', () => {
      const query = meta.extrasFromHyphened({
        '-s': 10,
        '-l': 5
      })
      expect(query.limit).toBe(5)
    })

    it('limit can be undefined', () => {
      const query = meta.extrasFromHyphened({
        '-s': 10
      })
      expect(query.limit).not.toBeDefined()
    })
  })
})
