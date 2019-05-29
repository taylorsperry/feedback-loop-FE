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
    const user = 'fL8Denah3foen'
    const expectedAction = {
      type: 'SET_USER',
      user
    }

    const result = actions.setUser(user)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_CURRENT_COHORT', () => {
    const cohort = [
      {id: 13, name:'1903', students: []}
    ]
    const expectedAction = {
      type: 'SET_CURRENT_COHORT',
      cohort
    }

    const result = actions.setCurrentCohort(cohort)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_ROLE', () => {
    const role = "Instructor"
    const expectedAction = {
      type: 'SET_ROLE',
      role
    }

    const result = actions.setRole(role)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_STUDENT_SURVEYS', () => {
    const surveys = [
      { id: 1, name: "Survey1"},
      { id: 2, name: "Survey2"}
    ]
    const expectedAction = {
      type: 'SET_STUDENT_SURVEYS',
      surveys
    }

    const result = actions.setStudentSurveys(surveys)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_INSTRUCTOR_SURVEYS', () => {
    const surveys = [
      { id: 1, name: "Survey1"},
      { id: 2, name: "Survey2"}
    ]
    const expectedAction = {
      type: 'SET_INSTRUCTOR_SURVEYS',
      surveys
    }

    const result = actions.setInstructorSurveys(surveys)
    expect(result).toEqual(expectedAction)
  })
})