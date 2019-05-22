import { setSurveyReducer } from './setSurveyReducer'
import * as actions from '../actions'

describe('setSurveyReducer', () => {
  it('should return state by default', () => {
    const expected = {}
    const result = setSurveyReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set state with a survey object if the type is SET_SURVEY', () => {
    const survey = { survey: 'new survey'}
    const action = actions.setSurvey(survey)
    const result = setSurveyReducer(undefined, action)
    expect(result).toEqual(survey) 
  })
})