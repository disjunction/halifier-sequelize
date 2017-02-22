/* eslint-env jasmine */
const meta = require('../src/meta')

describe('meta', () => {
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
