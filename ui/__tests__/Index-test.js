/* global it, describe, expect */
import index from '../index'

describe('A suite for main index', function () {
  it('should contain elements', function () {
    expect(index.start).toBeInstanceOf(Function)
  })
})
