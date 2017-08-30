/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchGrid } from '../reducer'
import * as actionTypes from '../actionTypes'
import * as actions from '../actions'
import {TOGGLE_PRELOAD} from '../../../UploadForm/actionTypes'

describe('A suite for <Grid /> batch container', function () {
  const initialState = Map({
    data: Map(),
    checkedRow: Map({}),
    pagination: Map({
      pageSize: 25,
      pageNumber: 1,
      recordsTotal: 0
    }),
    changeId: 0,
    fetchBatches: List()
  })

  it('should return the initial state', function () {
    expect(bulkBatchGrid(undefined, {})).toEqual(initialState)
  })

  it('should handle actionTypes.FETCH_BATCHES', function () {
    expect(
      bulkBatchGrid(undefined, {
        type: actionTypes.FETCH_BATCHES,
        methodRequestState: 'finished',
        result: {
          data: [1, 2, 3],
          pagination: {
            pageSize: 20,
            pageNumber: 2,
            recordsTotal: 33
          }
        }
      })).toEqual(Map({
        data: Map(),
        checkedRow: Map({}),
        pagination: Map({
          pageSize: 20,
          pageNumber: 2,
          recordsTotal: 33
        }),
        changeId: 0,
        fetchBatches: List([1, 2, 3])
      }))
  })

  it('should handle actionTypes.CHECK_ROW', function () {
    expect(
      bulkBatchGrid(undefined, {
        type: actionTypes.CHECK_ROW,
        params: {
          row: {
            batchId: '1'
          }
        }
      })).toEqual(Map({
        data: Map(),
        checkedRow: Map({batchId: '1'}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        changeId: 0,
        fetchBatches: List()
      }))
  })

  it('should handle actionTypes.CHECK_ROW', function () {
    expect(
      bulkBatchGrid(Map({
        data: Map(),
        checkedRow: Map({batchId: '1'}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        changeId: 0,
        fetchBatches: List()
      }), {
        type: actionTypes.CHECK_ROW,
        params: {
          row: {
            batchId: '1'
          }
        }
      })).toEqual(Map({
        data: Map(),
        checkedRow: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        changeId: 0,
        fetchBatches: List()
      }))
  })

  it('should handle TOGGLE_PRELOAD', function () {
    expect(
      bulkBatchGrid(Map({
        data: Map(),
        checkedRow: Map({batchId: '1'}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        changeId: 0,
        fetchBatches: List()
      }), {
        type: TOGGLE_PRELOAD
      })).toEqual(Map({
        data: Map(),
        checkedRow: Map({}),
        pagination: Map({
          pageSize: 25,
          pageNumber: 1,
          recordsTotal: 0
        }),
        changeId: 0,
        fetchBatches: List()
      }))
  })

  it('should handle actionTypes.BATCH_UPDATE_PAGINATION', function () {
    expect(
      bulkBatchGrid(undefined, {
        type: actionTypes.BATCH_UPDATE_PAGINATION,
        methodRequestState: 'finished',
        result: {
          data: [1, 2, 3],
          pagination: {
            pageSize: 20,
            pageNumber: 2,
            recordsTotal: 33
          }
        }
      })).toEqual(Map({
        data: Map(),
        checkedRow: Map({}),
        pagination: Map({
          pageSize: 20,
          pageNumber: 2,
          recordsTotal: 33
        }),
        changeId: 0,
        fetchBatches: List([1, 2, 3])
      }))
  })

  it('should create an action fetchBatches', function () {
    expect(actions.fetchBatches('test')).toEqual({
      type: actionTypes.FETCH_BATCHES,
      method: 'bulk.batch.fetch',
      params: 'test'
    })
  })

  it('should create an action fetchBatches with no params', function () {
    expect(actions.fetchBatches()).toEqual({
      type: actionTypes.FETCH_BATCHES,
      method: 'bulk.batch.fetch',
      params: {}
    })
  })

  it('should create an action updatePagination', function () {
    expect(actions.updatePagination(Map({}))).toEqual({
      type: actionTypes.BATCH_UPDATE_PAGINATION,
      method: 'bulk.batch.fetch',
      params: {}
    })
  })

  it('should create an action updatePagination with no params', function () {
    expect(actions.updatePagination()).toEqual({
      type: actionTypes.BATCH_UPDATE_PAGINATION,
      method: 'bulk.batch.fetch',
      params: {}
    })
  })

  it('should create an action checkRow', function () {
    expect(actions.checkRow({rowId: 1})).toEqual({
      type: actionTypes.CHECK_ROW,
      params: {row: {rowId: 1}}
    })
  })
})
