import React from 'react'
import { NewSurvey, mapDispatchToProps } from './NewSurvey'
import { shallow } from 'enzyme'
import * as actions from '../../actions'

describe('NewSurvey', () => {
  let wrapper
  let mockFn = jest.fn()
  let mockHistory = { push: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(<NewSurvey 
      setSurvey={mockFn}
      history={mockHistory}
    />)
  })

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    expect(wrapper.state().surveyName).toEqual('')
    expect(wrapper.state().questions).toEqual([])
  })

  it('should call setSurvey when handleSubmit is invoked', () => {
    const preventDefault = { preventDefault: jest.fn() }
    wrapper.instance().handleSubmit(preventDefault)
    expect(mockFn).toHaveBeenCalled()
  })

  it('should update state on change', () => {
    const mockEvent = { target: { name: 'surveyName', value: 'My Survey'}}
    wrapper.find('.survey-name').simulate('change', mockEvent)
    expect(wrapper.state('surveyName')).toBe('My Survey')
  })

  it('should update state with a new question when updateQuestions is invoked', () => {
    const mockState = {
      questions: [{ id: 1}]
    }
    const updatedQuestion = { 
      id: 1,
      questionTitle: 'My Question',
      option_1: {pointValue: 1, questionText: 'How are you feeling today?'}
    }
    const expected = [{ id: 1, questionTitle: 'My Question', option_1: {pointValue: 1, questionText: 'How are you feeling today?'}}]
    wrapper.setState(mockState)
    wrapper.instance().updateQuestions(updatedQuestion)
    expect(wrapper.state('questions')).toEqual(expected)
  })

  it('should add a question to the questions array in state when addQuestion is invoked', () => {
    const mockState = {
      questions: [{ id: 1, questionTitle: 'My Question', option_1: {pointValue: 1, questionText: 'How are you feeling today?'}}]
    }
    wrapper.setState(mockState)
    wrapper.instance().addQuestion()
    expect(wrapper.state('questions')).toHaveLength(2)
  })

  it('should call displayQuestion cards once for every question in state', () => {
    const mockState = {
      questions: [{ id: 1, questionTitle: 'My Question', option_1: {pointValue: 1, questionText: 'How are you feeling today?'}}]
    }
    const displayQuestionSpy = jest.spyOn(wrapper.instance(), 'displayQuestion')
    wrapper.setState(mockState)
    expect(displayQuestionSpy).toHaveBeenCalledTimes(1)
  })

  describe('mapDispatchToProps', () => {
    it('should set a survey in the store', () => {
      let survey = {
        surveyName: 'My Survey',
        questions: [{ id: 1, questionTitle: 'My Question', option_1: {pointValue: 1, questionText: 'How are you feeling today?'}}]
      }
      let dispatch = jest.fn()
      let actionToDispatch = actions.setSurvey(survey)
      const mappedProps = mapDispatchToProps(dispatch)
      mappedProps.setSurvey(survey)
      expect(dispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})