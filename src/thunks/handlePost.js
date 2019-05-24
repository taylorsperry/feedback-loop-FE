import { isLoading, hasError } from '../actions'

export const handlePost = (url, options) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, options)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const data = await response.json()
      dispatch(isLoading(false))
      // return data
      console.log(data)
    } catch (error) {
      dispatch(hasError(error.message))
      dispatch(isLoading(false))
    }
  }
}