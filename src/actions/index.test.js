import * as actions from '../actions'

describe('actions', () => {
  it('should have a type of HAS_ERROR', () => {
    const message = 'Something went wrong'
    const expectedAction = {
      type: 'HAS_ERROR',
      message
    }

    const result = actions.hasError(message)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of IS_LOADING', () => {
    const isLoading = false
    const expectedAction = {
      type: 'IS_LOADING',
      isLoading
    }

    const result = actions.isLoading(isLoading)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_SURVEY', () => {
    const survey = { survey: 'survey object'}
    const expectedAction = {
      type: 'SET_SURVEY',
      survey
    }

    const result = actions.setSurvey(survey)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_COHORTS', () => {
    const cohorts = ['1810', '1811']
    const expectedAction = {
      type: 'SET_COHORTS',
      cohorts
    }

    const result = actions.setCohorts(cohorts)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_USER', () => {
    const user = {
      cohort: '1811',
      id: 3,
      name: 'Jessica Hansen',
      program: 'F',
      status: 'active'
    }
    const expectedAction = {
      type: 'SET_USER',
      user
    }

    const result = actions.setUser(user)
    expect(result).toEqual(expectedAction)
  })
})