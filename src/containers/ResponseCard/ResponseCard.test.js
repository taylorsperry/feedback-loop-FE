import React from 'react'
import { ResponseCard } from './ResponseCard'
import { shallow } from 'enzyme'

describe('ResponseCard', () => {
  let wrapper
  let mockQuestion = { 
    id: 7,
    questionTitle: 'My Question',
    options: [{
        id: 1,
        description: "Option One"
      },
      {
        id: 2,
        description: "Option Two"
      },
      {
        id: 3,
        description: "Option Three"
      },
      {
        id: 4,
        description: "Option Four"
      },
    ]
  }
  let mockMember = {
    id: 13
  }
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<ResponseCard 
      question={mockQuestion}
      member={mockMember}
      checkResponse={mockFn}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should have default state', () => {
    const expected = {
      response: {}
    }
    expect(wrapper.state()).toEqual(expected)
  })

  it('should update state onChange', () => {
    const mockEvent = { target: { name: 'option1', value: 1 }}
    const expected = {
      response: {
        question: 7,
        member: 13,
        answer: 1
      }
    }
    wrapper.find('#op1').simulate('change', mockEvent)
    expect(wrapper.state()).toEqual(expected)
  })

  it('should call checkResponse when handleChange is called', () => {
    const mockEvent = { target: { name: 'option1', value: 1 }}
    wrapper.instance().handleChange(mockEvent)
    expect(mockFn).toHaveBeenCalled()
  })
})