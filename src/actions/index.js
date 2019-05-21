export const hasError = (message) => ({
  type: 'HAS_ERROR',
  message
})

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  boolean
})

export const setSurvey = (survey) => ({
  type: 'SET_SURVEY',
  survey
})