import { setClosedSurveysReducer } from './setClosedSurveysReducer'
import * as actions from '../actions'

describe('setClosedSurveysReducer', () => {
  const initialState = []

  it('should return state by default', () => {
    const expected = []
    const result = setClosedSurveysReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should return surveys to state if the type is SET_CLOSED_SURVEYS', () => {
    const surveys = [
      { id: 1, name: "Survey 1"},
      { id: 2, name: "Survey 2"}
    ]
    const action = actions.setClosedSurveys(surveys)
    const result = setClosedSurveysReducer(initialState, action)
    expect(result).toEqual(surveys)
  })
})
