import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { shallow, mount } from 'enzyme';
import Login from '../Login/Login'
import InstructorDashboard from '../InstructorDashboard/InstructorDashboard'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import { MemoryRouter } from 'react-router'
jest.mock('../../thunks/fetchCohorts')

describe('App', () => {
  let wrapper;
  let mockBool;
  let mockError;

  beforeEach(() => {
    mockBool = false
    mockError = "Something went wrong"
    wrapper = shallow(
      <App
         isLoading={mockBool}
         error={mockError}
         fetchCohorts={jest.fn()}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it.skip('should route to Login component for / route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/']}>
        <Login />
      </MemoryRouter>
    )
    expect(wrapper.find(Login)).toHaveLength(1);
  })

  it.skip('should route to Dashboard for /dashboard route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/dashboard']}>
        <InstructorDashboard />
      </MemoryRouter>
    )

    expect(wrapper.find(InstructorDashboard)).toHaveLength(1)
  })

  it('should route to PageNotFound for invalid path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/random-path']}>
        <PageNotFound />
      </MemoryRouter>
    )

    expect(wrapper.find(Login)).toHaveLength(0)
    expect(wrapper.find(PageNotFound)).toHaveLength(1)
  })

  describe('mapStateToProps', () => {
    it('should return the expected state as props', () => {
      const mockState = {
        isLoading: false,
        error: "Something went wrong",
        fakeState: "fakeState"
      }
      const expected = {
        isLoading: false,
        error: "Something went wrong"
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return fetchCohorts to dispatch', () => {
      const mockDispatch = jest.fn()
      const fetchCohorts = jest.fn()
      const actionToDispatch = fetchCohorts('www.cohorts.com')
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.fetchCohorts('www.cohorts.com')

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})
