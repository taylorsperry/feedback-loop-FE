import React from 'react'
import { shallow } from 'enzyme'
import { StudentSurvey, mapStateToProps, mapDispatchToProps } from './StudentSurvey'
jest.mock('../../thunks/handlePost')

describe('StudentSurvey', () => {
  let wrapper
  let mockUser
  let mockHandlePost
  let mockStudentSurveys
  let mocklocation

  beforeEach(() => {
    mockUser = '12345'
    mockStudentSurveys = [
      { 
        id: 1, 
        surveyName: "Survey 1", 
        groups: [{members: [{id: 1, name: "name1"}, {id: 2, name: "name2"}]}]},
    ]
    mockHandlePost = jest.fn()
    mocklocation = { pathname : 'mockUrl/1' }
  
    wrapper = shallow(
      <StudentSurvey
        studentSurveys={mockStudentSurveys}
        user={mockUser}
        handlePost={mockHandlePost}
        location={mocklocation}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return the expected state as props', () => {
      const mockState = {
        user: '12345',
        studentSurveys: [
          { id: 1, name: "Survey 1"},
          { id: 2, name: "Survey 2"}
        ],
        fakeState: 'fakeState'
      }
      const expected = {
        user: '12345',
        studentSurveys: [
          { id: 1, name: "Survey 1"},
          { id: 2, name: "Survey 2"}
        ]
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handlePost to dispatch', () => {
      const mockUrl = 'www.postresponses.com'
      const mockOptions = {
        method: 'POST',
        body: { api_key: "12345",
                responses: [
                  {
                    "question": 7,
                    "answer": 11,
                    "member": 2
                  },
                  {
                    "question": 7,
                    "answer": 10,
                    "member": 6
                  },
                ]
              },
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const mockDispatch = jest.fn()
      const handlePost = jest.fn()
      const actionToDispatch = handlePost(mockUrl, mockOptions)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handlePost(mockUrl, mockOptions)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})