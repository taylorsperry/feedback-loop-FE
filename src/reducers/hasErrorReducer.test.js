import { hasErrorReducer } from './hasErrorReducer'
import * as actions from '../actions'

describe('hasErrorReducer', () => {
  it('should return an empty string by default', () => {
    const expected = ''
    const result = hasErrorReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return a string if the action type is HAS_ERROR', () => {
    const message = 'Something went wrong'
    const action = actions.hasError(message)
    const result = hasErrorReducer(undefined, action)
    expect(result).toEqual(message)
  })
})