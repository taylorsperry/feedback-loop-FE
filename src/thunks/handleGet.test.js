import { handleGet } from './handleGet'
import { isLoading, hasError } from '../actions'

describe('handleGet', () => {
  let mockUrl
  let mockDispatch
  let mockSurveys

  beforeEach(() => {
    mockUrl = 'www.surveys.com'
    mockDispatch = jest.fn()
    mockSurveys = [ 
      { id: 1, name: "Survey 1" },
      { id: 2, name: "Survey 2"}
    ]
  })

  it('should dispatch isLoading with false if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockSurveys)
    }))

    const thunk = await handleGet(mockUrl)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch hasError with a message and isLoading with false if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: "Something went wrong"
    }))

    const thunk = await handleGet(mockUrl)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError("Something went wrong"))
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})