import { setRoleReducer } from './setRoleReducer'
import * as actions from '../actions'

describe('setRoleReducer', () => {
  const initialState = ''

  it('should return state by default', () => {
    const expected = ''
    const result = setRoleReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should set state with a user role if the type is SET_ROLE', () => {
    const role = 'Student'
    const action = actions.setRole(role)
    const result = setRoleReducer(initialState, action)
    expect(result).toEqual(role)
  })
})