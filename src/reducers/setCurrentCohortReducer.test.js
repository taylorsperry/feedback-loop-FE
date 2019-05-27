import { setCurrentCohortReducer } from './setCurrentCohortReducer'
import * as actions from '../actions'

describe('setCurrentCohortReducer', () => {
  const initialState = []

  it('should return state by default', () => {
    const expected = []
    const result = setCurrentCohortReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should set state with a cohort if the type is SET_CURRENT_COHORT', () => {
    const currentCohort = [
      { id: 1, name: "April" },
      { id: 2, name: "Peter" },
      { id: 3, name: "Taylor" },
      { id: 4, name: "Kim" }
    ]
    const action = actions.setCurrentCohort(currentCohort)
    const result = setCurrentCohortReducer(initialState, action)
    expect(result).toEqual(currentCohort)
  })
})