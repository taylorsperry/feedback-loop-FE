import React from 'react'
import { shallow } from 'enzyme'
import Team from './Team'

describe('Team', () => {
  let wrapper
  let mockTeam = {
    id: 4,
    members: [{id: 1, name: "Taylor"}, {id: 2, name: "Kim"}]
  }
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Team 
      id={mockTeam.id}
      members={mockTeam.members}
      handleTeamName={mockFn}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should update state onChange', () => {
    const mockEvent = { target: { name: 'name', value: 'xyz'}}
    wrapper.find('.team-input').simulate('change', mockEvent)
    expect(wrapper.state('name')).toBe('xyz')
  })
})