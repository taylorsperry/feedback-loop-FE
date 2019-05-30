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

  it('should have a default state', () => {
    const defaultState = {
      averages: {},
      userAverages: {},
      survey: {}
    }

    expect(wrapper.state()).toEqual(defaultState)
  })

  it('should return the average', () => {
    const mockState = {
      userAverages: {
        averages : [
          {
            average_rating: "4.0000000000000000",
            fullName: "Peter Lapicola",
            question_id: 20,
            user_id: 1
          },
          {
            average_rating: "4.0000000000000000",
            fullName: "Peter Lapicola",
            question_id: 21,
            user_id: 1
          },
          {
            average_rating: "3.0000000000000000",
            fullName: "April Dagonese",
            question_id: 20,
            user_id: 2
          },
          {
            average_rating: "3.0000000000000000",
            fullName: "April Dagonese",
            question_id: 21,
            user_id: 2
          }
        ]
      }
    }
    wrapper.setState(mockState)
    expect(wrapper.instance().findUserAve(2, 21)).toBe("3.00")
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