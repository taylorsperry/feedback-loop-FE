import React from 'react'
import { Question } from './Question'
import { shallow } from 'enzyme'

describe('Question', () => {
  let wrapper
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Question 
      id='abc'
      updateQuestions={mockFn}
    />)
  })
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const defaultState = {
      id: 'abc',
      questionTitle: '',
      option_1: {pointValue: 1, questionText: ''},
      option_2: {pointValue: 2, questionText: ''},
      option_3: {pointValue: 3, questionText: ''},
      option_4: {pointValue: 4, questionText: ''},
      option_5: {pointValue: 5, questionText: ''}
    }

    expect(wrapper.state()).toEqual(defaultState)
  })

  it('should update questionText in state on change', () => {
    const mockEvent = { target: { name: 'option_1', value: 'First Option'}}
    wrapper.find('#op1').simulate('change', mockEvent)
    expect(wrapper.state('option_1')).toEqual({ "pointValue": 1, "questionText": 'First Option'})
  })

  it('should update questionTitle in state on change', () => {
    const mockEvent = { target: { name: 'questionTitle', value: 'My Question'} }
    wrapper.find('.question-input').simulate('change', mockEvent)
    expect(wrapper.state('questionTitle')).toBe('My Question')
  })

  it('should call updateQuestions when handleSubmit is invoked', () => {
    const preventDefault = { preventDefault: jest.fn()}
    const updatedState = {
      id: 'abc',
      questionTitle: 'New Q',
      option_1: {pointValue: 1, questionText: 'a'},
      option_2: {pointValue: 2, questionText: 'b'},
      option_3: {pointValue: 3, questionText: 'c'},
      option_4: {pointValue: 4, questionText: 'd'},
      option_5: {pointValue: 5, questionText: 'e'}
    }
    
    wrapper.setState(updatedState)
    wrapper.instance().handleSubmit(preventDefault)
    expect(mockFn).toHaveBeenCalledWith(updatedState)
  })
})
