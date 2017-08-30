/* global it, describe, expect */
import { Map, List } from 'immutable'

import { bulkBatchGrid } from '../reducer'
import * as actionTypes from '../actionTypes'
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
})
