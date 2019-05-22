import { isLoadingReducer } from './isLoadingReducer'
import * as actions from '../actions'

describe('isLoadingReducer', () => {
  it('should return state by default', () => {
    const expected = false
    const result = isLoadingReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return a boolean if the action type is IS_LOADING', () => {
    const bool = true
    const action = actions.isLoading(bool)
    const result = isLoadingReducer(undefined, action)
    expect(result).toEqual(bool)
  })
})