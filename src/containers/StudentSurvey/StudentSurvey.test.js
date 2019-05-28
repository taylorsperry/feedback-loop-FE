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
        questions: [ { id: 7 }, { id: 8 } ], 
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

  it('should have default state', () => {
    expect(wrapper.state('allResponses')).toEqual([])
    expect(wrapper.state('membersReviewed')).toBe(0)
  })

  it('should set state on componentDidMount', () => {
    const expected = {
      allResponses: [],
      membersReviewed: 0,
      surveyName: 'Survey 1',
      id: 1,
      questions: [ { id: 7 }, { id: 8} ],
      members: [{id: 1, name: "name1"}, {id: 2, name: "name2"}], 
    }
    wrapper.instance().componentDidMount()
    expect(wrapper.state()).toEqual(expected)
  })
  
  it('should return a Response component for each member', () => {
    wrapper.instance().componentDidMount()
    const result = wrapper.instance().renderResponse()
    expect(result).toHaveLength(2)
  })

  it('should update empty allResponses in state if collectResponses is called', () => {
    wrapper.setState({
      allResponses: []
    })
    const individualResponse = [{ question: 4, answer: 2, member: 7 }]
    wrapper.instance().collectResponses(individualResponse)
    expect(wrapper.state('allResponses')).toEqual(individualResponse)
    expect(wrapper.state('membersReviewed')).toEqual(1)
  })

  it('should update populated allResponses in state if collectResponses is called', () => {
    wrapper.setState({
      allResponses: [{ question: 5, answer: 3, member: 2 }]
    })
    const individualResponse = [{ question: 4, answer: 2, member: 7 }]
    const expected = [{ question: 5, answer: 3, member: 2 }, { question: 4, answer: 2, member: 7 }]
    wrapper.instance().collectResponses(individualResponse)
    expect(wrapper.state('allResponses')).toEqual(expected)
  })


  it('should call warnToast if membersReviewed is less than the number of members', () => {
    const warnToastSpy = jest.spyOn(wrapper.instance(), 'warnToast')
    wrapper.instance().postResponse()
    expect(warnToastSpy).toHaveBeenCalled()
  })

  it('should call handlePost when postResponse is called', () => {
    const individualResponse = [{ question: 4, answer: 2, member: 7 }]
    wrapper.instance().collectResponses(individualResponse)
    wrapper.instance().collectResponses(individualResponse)
    wrapper.instance().postResponse()
    expect(mockHandlePost).toHaveBeenCalled()
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