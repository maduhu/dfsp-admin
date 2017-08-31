/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchPayPopup } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'

describe('A suite for <PayBatch /> popup', function () {
  const initialState = Map({
    batchId: null,
    accounts: List(),
    expirationDate: null,
    startDate: null,
    selectedAccount: null
  })

  it('should return the initial state', function () {
    expect(bulkBatchPayPopup(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.OPEN_PAY_BATCH_POPUP', function () {
    expect(
      bulkBatchPayPopup(undefined, {
        type: actionTypes.OPEN_PAY_BATCH_POPUP,
        params: {
          batchId: '1'
        }
      })).toEqual(Map({
        batchId: '1',
        accounts: List(),
        expirationDate: null,
        startDate: null,
        selectedAccount: null
      }))
  })

  it('should handle actionTypes.GET_BATCH_TOTAL_AMOUNT', function () {
    expect(
      bulkBatchPayPopup(undefined, {
        type: actionTypes.GET_BATCH_TOTAL_AMOUNT,
        result: {
          totalAmount: 42
        }
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: null,
        startDate: null,
        selectedAccount: null,
        totalAmount: 42
      }))
  })

  it('should handle actionTypes.CLOSE_PAY_BATCH_POPUP', function () {
    expect(
      bulkBatchPayPopup(Map({
        batchId: '1',
        accounts: List(),
        expirationDate: '2017-01-01',
        startDate: '2016-01-01',
        selectedAccount: 'ailce'
      }), {
        type: actionTypes.CLOSE_PAY_BATCH_POPUP
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: '2017-01-01',
        startDate: '2016-01-01',
        selectedAccount: 'ailce'
      }))
  })

  it('should handle actionTypes.CHANGE_EXPIRATION_DATE', function () {
    expect(
      bulkBatchPayPopup(undefined, {
        type: actionTypes.CHANGE_EXPIRATION_DATE,
        params: {
          expirationDate: '2017-01-01'
        }
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: '2017-01-01',
        startDate: null,
        selectedAccount: null
      }))
  })

  it('should handle actionTypes.CHANGE_START_DATE', function () {
    expect(
      bulkBatchPayPopup(undefined, {
        type: actionTypes.CHANGE_START_DATE,
        params: {
          startDate: '2016-01-01'
        }
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: null,
        startDate: '2016-01-01',
        selectedAccount: null
      }))
  })

  it('should handle actionTypes.CHANGE_PAY_ACCOUNT', function () {
    expect(
      bulkBatchPayPopup(undefined, {
        type: actionTypes.CHANGE_PAY_ACCOUNT,
        params: {
          account: 'alice'
        }
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: null,
        startDate: null,
        selectedAccount: 'alice'
      }))
  })

  it('should handle actionTypes.FETCH_PAY_ACCOUNTS', function () {
    expect(
      bulkBatchPayPopup(Map({
        batchId: null,
        accounts: List([1, 2, 3]),
        expirationDate: null,
        startDate: null,
        selectedAccount: null
      }), {
        type: actionTypes.FETCH_PAY_ACCOUNTS
      })).toEqual(Map({
        batchId: null,
        accounts: List(),
        expirationDate: null,
        startDate: null,
        selectedAccount: null
      }))
  })

  it('should handle actionTypes.FETCH_PAY_ACCOUNTS', function () {
    expect(
      bulkBatchPayPopup(Map({
        batchId: null,
        accounts: List([1, 2, 3]),
        expirationDate: null,
        startDate: null,
        selectedAccount: null
      }), {
        type: actionTypes.FETCH_PAY_ACCOUNTS,
        result: [
          {id: '1', name: 'bob'},
          {id: '2', name: 'alice'}
        ]
      })).toEqual(Map({
        batchId: null,
        accounts: List([
          {key: '1', name: 'bob'},
          {key: '2', name: 'alice'}
        ]),
        expirationDate: null,
        startDate: null,
        selectedAccount: null
      }))
  })

  it('should create an action fetchAccounts', function () {
    expect(actions.fetchAccounts(1)).toEqual({
      type: actionTypes.FETCH_PAY_ACCOUNTS,
      method: 'ledger.account.fetch',
      params: { actorId: 1 }
    })
  })

  it('should create an action openPayPopup', function () {
    expect(actions.openPayPopup(1)).toEqual({
      type: actionTypes.OPEN_PAY_BATCH_POPUP,
      params: { batchId: 1 }
    })
  })

  it('should create an action closePayPopup', function () {
    expect(actions.closePayPopup(1)).toEqual({
      type: actionTypes.CLOSE_PAY_BATCH_POPUP,
      params: {}
    })
  })

  it('should create an action pay', function () {
    expect(actions.pay(1, 2, 3, 4)).toEqual({
      type: actionTypes.PAY_BATCH,
      method: 'bulk.batch.process',
      params: {
        batchId: 1,
        expirationDate: 2,
        startDate: 3,
        account: 4
      }
    })
  })

  it('should create an action changeExpirationDate', function () {
    expect(actions.changeExpirationDate('2017-01-01')).toEqual({
      type: actionTypes.CHANGE_EXPIRATION_DATE,
      params: { expirationDate: '2017-01-01' }
    })
  })

  it('should create an action changeStartDate', function () {
    expect(actions.changeStartDate('2017-01-01')).toEqual({
      type: actionTypes.CHANGE_START_DATE,
      params: { startDate: '2017-01-01' }
    })
  })

  it('should create an action changePayAccount', function () {
    expect(actions.changePayAccount('alice')).toEqual({
      type: actionTypes.CHANGE_PAY_ACCOUNT,
      params: { account: 'alice' }
    })
  })

  it('should create an action getBatchTotalAmount', function () {
    expect(actions.getBatchTotalAmount(1)).toEqual({
      type: actionTypes.GET_BATCH_TOTAL_AMOUNT,
      method: 'bulk.batch.getTotalAmount',
      params: { batchId: 1 }
    })
  })
})
