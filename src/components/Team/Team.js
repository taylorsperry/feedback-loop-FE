import React, { Component } from 'react'

export class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    }, () => {
      this.props.handleTeamName(this.state.id, this.state.name)
    })
  }

  render() {
    const names = this.props.members.map(member => {
      return <div className="student-nametage" key={member.id}>{member.name}</div>
    })
    return(
      <div className='team' id={this.props.id}>
        <input 
          placeholder='Name this team'
          name='name'
          onChange={this.handleChange}
        />
        {names}
      </div>
    )
  } 
}

export default Team