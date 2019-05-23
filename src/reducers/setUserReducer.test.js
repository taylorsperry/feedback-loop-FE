import { setUserReducer } from './setUserReducer'
import * as actions from '../actions'

describe('setUserReducer', () => {
  it('should return state by default', () => {
    const expected = {}
    const result = setUserReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set state with a user object if the type is SET_USER', () => {
    const initialState = {}
    const user = {
      cohort: '1811',
      id: 3,
      name: 'Jessica Hansen',
      program: 'F',
      status: 'active'
    }
    const action = actions.setUser(user)
    const result = setUserReducer(initialState, action)
    expect(result).toEqual(user)
  })
})