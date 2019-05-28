import React from 'react'
import { Response } from './Response'
import { shallow } from 'enzyme'

describe('Response', () => {
  let wrapper
  let mockFn = jest.fn()
  let mockMember = { id: 18 }
  let mockQuestions = [
    {
      id: 1,
      questionTitle: "Question One",
      options: [{
          id: "a",
          description: "Option One"
        },
        {
          id: "b",
          description: "Option Two"
        }
      ]
    },
    {
      id: 2,
      questionTitle: "Question Two",
      options: [
        {
          id: "c",
          description: "Option Three"
        },
        {
          id: "d",
          description: "Option Four"
        }
      ]
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<Response 
      member={mockMember}
      questions={mockQuestions}
      collectResponses={mockFn}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should have a default state', () => {
    const expected = {
      responses: [],
      displayQuestions: false,
      saveResponses: false,
    }
    expect(wrapper.state()).toEqual(expected)
  })

  it('should update state when completeSurvey is called', () => {
    wrapper.instance().completeSurvey()
    expect(wrapper.state('displayQuestions')).toBe(true)
  })

  it('should return ResponseCard components for each question in props', () => {
    const result = wrapper.instance().renderQuestions()
    expect(result).toHaveLength(2)
  })

  it('should set state with a new response if there are no responses in state', () => {
    wrapper.setState({
      responses: []
    })

    const newResponse = {
      question: 1,
      answer: 2,
      member: 4
    }
    wrapper.instance().checkResponse(newResponse)
    expect(wrapper.state('responses')).toEqual([newResponse])
  })

  it('should call addResponse if there are responses in state', () => {
    const addResponseSpy = jest.spyOn(wrapper.instance(), 'addResponse')
    wrapper.setState({
      responses: [{
        question: 15,
        answer: 2,
        member: 4
      }]
    })
    const newResponse = {
      question: 1,
      answer: 2,
      member: 4
    }
    wrapper.instance().checkResponse(newResponse)
    expect(addResponseSpy).toHaveBeenCalledWith(newResponse)
  })

  it('should call updateResponse if there are responses in state', () => {
    const updateResponseSpy = jest.spyOn(wrapper.instance(), 'updateResponse')
    wrapper.setState({
      responses: [{
        question: 15,
        answer: 2,
        member: 4
      }]
    })
    const newResponse = {
      question: 15,
      answer: 2,
      member: 4
    }
    wrapper.instance().checkResponse(newResponse)
    expect(updateResponseSpy).toHaveBeenCalledWith(newResponse)
  })

  it('should add a response to state when addResponse is called', () => {
    wrapper.setState({
      responses: [{
        question: 15,
        answer: 2,
        member: 4
      }]
    })
    const newResponse = {
      question: 1,
      answer: 2,
      member: 4
    }
    const expected = [
      {
        question: 15,
        answer: 2,
        member: 4
      },
      {
        question: 1,
        answer: 2,
        member: 4
      }
    ]
    wrapper.instance().addResponse(newResponse)
    expect(wrapper.state('responses')).toEqual(expected)
  })

  it('should update the correct response in state when updateResponse is called', () => {
    wrapper.setState({
      responses: [{
        question: 15,
        answer: 2,
        member: 4
      }]
    })
    const newResponse = {
      question: 15,
      answer: 3,
      member: 4
    }
    const expected = [
      {
        question: 15,
        answer: 3,
        member: 4
      }
    ]
    wrapper.instance().updateResponse(newResponse)
    expect(wrapper.state('responses')).toEqual(expected)
  })

  it('should call warnToast when closeResponse is called', () => {
    const warnToastSpy = jest.spyOn(wrapper.instance(), 'warnToast')
    wrapper.setState({
      responses: [ { question: 4 } ]
    })
    wrapper.instance().closeResponse()
    expect(warnToastSpy).toHaveBeenCalled()

  })

  it('should toggle displayQuestions when closeResponse is called', () => {
    wrapper.setState({
      responses: [ { question: 1 }, { question: 2 } ],
      displayQuestions: true
    })
    wrapper.instance().closeResponse()
    expect(wrapper.state('displayQuestions')).toBe(false)
  })
})