import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser, setRole } from '../../actions'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import { handlePost } from '../../thunks/handlePost'
import { Route, Switch, withRouter } from 'react-router-dom'
import cogoToast from 'cogo-toast';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
        newUser: false
    }
  }

  createAccount = () => {
    this.props.history.push('/register')
    this.setState({
      newUser: true
    })
  }

  handleLogin = (user) => {
    if(!this.state.newUser) {
      this.loginUser(user)
    } else {
      this.registerUser(user)
    }
  }

  loginUser = async (user) => {
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/users/login"
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: user.emailInput,
        password: user.passwordInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.props.handlePost(url, options)
    const data = await this.props.handlePost(url, options)
    data ? this.handleUser(data) : this.warnToast('Incorrect login. Please try again')
  }

  registerUser = async (user) => {
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/users/register"
    const options = {
      method: 'POST',
      body: JSON.stringify({
        fullName: user.full_name,
        role: user.role,
        email: user.email,
        password: user.password_1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = await this.props.handlePost(url, options)
    this.handleUser(data)
  }

  warnToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  handleUser = async (data) => {
    const validUser = data.api_key
    const userRole = data.role
    await this.props.setUser(validUser)
    await this.props.setRole(userRole)
    await localStorage.setItem('currentUser', validUser);
    await localStorage.setItem('userRole', userRole)
    await this.handleRedirect()
  }

  handleRedirect = () => {
    if (localStorage.getItem('userRole') === 'Student') {
      this.props.history.push('/student-dashboard')
    } else if (localStorage.getItem('userRole') === 'Instructor') {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return(
      <div className='login-landing'>
        <Switch>
          <Route exact path='/'
            render={() => <LoginForm  
              createAccount={this.createAccount} 
              handleLogin={this.handleLogin}
              />}
          />
          <Route exact path='/register'
            render={() => <RegisterForm 
              handleLogin={this.handleLogin}
            />}
          />
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  role: state.role,
  error: state,
})

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setRole: (role) => dispatch(setRole(role))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
