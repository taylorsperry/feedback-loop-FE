import { setInstructorSurveysReducer } from './setInstructorSurveysReducer'
import * as actions from '../actions'

describe('setInstructorSurveysReducer', () => {
  const initialState = []

  it('should return state by default', () => {
    const expected = []
    const result = setInstructorSurveysReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should return surveys to state if the type is SET_INSTRUCTOR_SURVEYS', () => {
    const surveys = [
      { id: 1, name: "Survey 1"},
      { id: 2, name: "Survey 2"}
    ]
    const action = actions.setInstructorSurveys(surveys)
    const result = setInstructorSurveysReducer(initialState, action)
    expect(result).toEqual(surveys)
  })
})