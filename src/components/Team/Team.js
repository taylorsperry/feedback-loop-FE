import React, { Component } from 'react'

export class Team extends Component {

  render() {
    // let displayMembers
    // console.log(this.props.teamMembers)
    // if(this.props.teamMembers.length) {
    //   displayMembers = this.props.teamMembers.map(member => {
    //     return <p key={member.id}>{member.name}</p>
    //   })
    // }
    
    const names = this.props.members.map(member => {
      return member.name
    })
    return(
      <div className='team' id={this.props.id}>
        Team
        {names}
      </div>
    )
  } 
}

export default Team