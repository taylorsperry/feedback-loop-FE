import { handlePost } from './handlePost'
import { isLoading, hasError } from '../actions'
import { exportAllDeclaration } from '@babel/types';

describe('handlePost', () => {
  let mockUrl
  let mockDispatch
  let mockData

  beforeEach(() => {
    mockUrl = 'www.posthere.com'
    mockDispatch = jest.fn()
    mockData = { data: 'data'}
  })

  it('should dispatch isLoading with false if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData)
    }))

    const thunk = await handlePost(mockUrl)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch hasError with a message and isLoading false if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: "Something went wrong"
    }))

    const thunk = await handlePost(mockUrl)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError("Something went wrong"))
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })
})