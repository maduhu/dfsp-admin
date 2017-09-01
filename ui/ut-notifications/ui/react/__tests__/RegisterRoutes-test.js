/* global it, describe, expect */
import registerRoutes from '../registerRoutes'

describe('A suite for registerRoutes', function () {
  it('should register ut-bulk:home', function () {
    expect(registerRoutes()).toEqual(['ut-notifications:templates', 'ut-notifications:reports'])
  })
})
