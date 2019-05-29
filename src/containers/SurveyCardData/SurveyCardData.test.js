import React from 'react'
import { shallow } from 'enzyme'
import { SurveyCardData, mapStateToProps, mapDispatchToProps } from './SurveyCardData'
jest.mock('../../thunks/handleGet')

describe('SurveyCardData', () => {
  let wrapper
  let handleGet
  let mockError
  
  beforeEach(() => {
    handleGet = jest.fn()
    mockError = "Something went wrong"
    wrapper = shallow(
      <SurveyCardData
        handleGet={handleGet}
        error={mockError}
      />
    )
  })

  it ('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {

    it('should return an error as props', () => {
      const mockState = {
        error: "Something went wrong",
        fakeState: "fakeState"
      }
      const expected = {
        error: "Something went wrong"
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handleGet as props', () => {
      const mockDispatch = jest.fn()
      const mockUrl = 'www.getSurveys.com'
      const handleGet = jest.fn()
      const actionToDispatch = handleGet(mockUrl)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.handleGet(mockUrl)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})