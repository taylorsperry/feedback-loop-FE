import { setStudentSurveysReducer } from './setStudentSurveysReducer'
import * as actions from '../actions'

describe('setStudentSurveysReducer', () => {
  const initialState = []

  it('should return state by default', () => {
    const expected = []
    const result = setStudentSurveysReducer(initialState, {})
    expect(result).toEqual(expected)
  })

  it('should return surveys to state if the type is SET_STUDENT_SURVEYS', () => {
    const surveys = [
      { id: 1, name: "Survey 1"},
      { id: 2, name: "Survey 2"}
    ]
    const action = actions.setStudentSurveys(surveys)
    const result = setStudentSurveysReducer(initialState, action)
    expect(result).toEqual(surveys)
  })
})