import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserAvg from './UserAverages'
import AvgResp from './AverageResponses'

export default function SurveyCardData(props) {
  return(
    <>
      <section className="s-status">{props.sData.status}</section>
      <section className="s-groups">{props.sData.groups.map(group => {
        return <section className="s-group">{group.name}</section>
      })}
      </section>
    </>
  )
}
