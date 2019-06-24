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
      option_1: {pointValue: 4, description: ''},
      option_2: {pointValue: 3, description: ''},
      option_3: {pointValue: 2, description: ''},
      option_4: {pointValue: 1, description: ''}
    }

    expect(wrapper.state()).toEqual(defaultState)
  })

  it('should update description in state on change', () => {
    const mockEvent = { target: { name: 'option_1', value: 'First Option'}}
    wrapper.find('#op1').simulate('change', mockEvent)
    expect(wrapper.state('option_1')).toEqual({ "pointValue": 4, "description": 'First Option'})
  })

  it('should update questionTitle in state on change', () => {
    const mockEvent = { target: { name: 'questionTitle', value: 'My Question'} }
    wrapper.find('.question-input').simulate('change', mockEvent)
    expect(wrapper.state('questionTitle')).toBe('My Question')
  })

  it('should call updateQuestions when handleSubmit is invoked', () => {
    const preventDefault = { preventDefault: jest.fn()}
    const mockState = {
      id: 'abd',
      questionTitle: 'New Question',
      option_1: {pointValue: 4, description: 'a'},
      option_2: {pointValue: 3, description: 'b'},
      option_3: {pointValue: 2, description: 'c'},
      option_4: {pointValue: 1, description: 'd'}
    }

    const optionsArr = [
      { option_1: {pointValue: 4, description: 'a'} },
      { option_2: {pointValue: 3, description: 'b'} },
      { option_3: {pointValue: 2, description: 'c'} },
      { option_4: {pointValue: 1, description: 'd'} }
    ]

    wrapper.setState(mockState)
    
    const newQuestion = {
      id: 'abd',
      questionTitle: 'New Question',
      options: optionsArr,
    }
    
    wrapper.instance().handleSubmit(preventDefault)
    expect(mockFn).toHaveBeenCalledWith(newQuestion)
  })
})
