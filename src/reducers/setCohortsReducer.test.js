import { setCohortsReducer } from './setCohortsReducer'
import * as actions from '../actions'

describe('setCohortsReducer', () => {
  it('should return state by default', () => {
    const expected = []
    const result = setCohortsReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set state with an array of cohorts if the type is SET_COHORTS', () => {
    const initialState = []
    const cohorts = ['1811', '1901']
    const action = actions.setCohorts(cohorts)
    const result = setCohortsReducer(undefined, action)
    expect(result).toEqual(cohorts)
  })
})