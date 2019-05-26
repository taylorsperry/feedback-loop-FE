import { setCohortsReducer } from './setCohortsReducer'
import * as actions from '../actions'

describe('setCohortsReducer', () => {
  const initialState = []

  it('should return state by default', () => {
    const expected = []
    const result = setCohortsReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should set state with an array of cohorts if the type is SET_COHORTS', () => {
    const cohorts = ['1811', '1901']
    const action = actions.setCohorts(cohorts)
    const result = setCohortsReducer(initialState, action)
    expect(result).toEqual(cohorts)
  })
})