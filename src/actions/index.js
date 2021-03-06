export const hasError = (message) => ({
  type: 'HAS_ERROR',
  message
})

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  isLoading: boolean
})

export const setSurvey = (survey) => ({
  type: 'SET_SURVEY',
  survey
})

export const setCohorts = (cohorts) => ({
  type: 'SET_COHORTS',
  cohorts
})

export const setUser = (user) => ({
  type: 'SET_USER',
  user
})

export const setCurrentCohort = (cohort) => ({
  type: 'SET_CURRENT_COHORT',
  cohort
})

export const setRole = (role) => ({
  type: 'SET_ROLE',
  role
})

export const setStudentSurveys = (surveys) => ({
  type: 'SET_STUDENT_SURVEYS',
  surveys
})

export const setInstructorSurveys = (surveys) => ({
  type: 'SET_INSTRUCTOR_SURVEYS',
  surveys
})

export const setClosedSurveys = (surveys) => ({
  type: 'SET_CLOSED_SURVEYS',
  surveys
})
