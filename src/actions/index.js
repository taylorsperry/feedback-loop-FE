const hasError = (message) => ({
  type: 'HAS_ERROR',
  message
})

const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  boolean
})