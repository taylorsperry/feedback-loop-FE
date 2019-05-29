import React, { Component } from 'react';
import SurveyCardData from '../SurveyCardData/SurveyCardData'

export class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDisplay: "none"
    }
  }

  toggleData = () => {
    let display
    this.state.dataDisplay === "none"
    ? display = "flex"
    : display = "none"

    this.setState({
      dataDisplay: display
    })
  }

  prettyDate = (dateString) => {
    let date = new Date(dateString)
    date = date.toLocaleDateString()
    return date
  }

  render() {
    const displayStatus = (status) => {
      if (status === "Active") {
       return ".5rem solid #F9AE05"
     } else {
       return ".5rem solid #13F1FC"
      }
    }

    return(
      <section className='survey-accordion'>
        <div className='survey-card'
             onClick={this.toggleData}
             style={{"borderTop": displayStatus(this.props.surveyData.status)}}>
          <article className='survey-card-name'>
            {this.props.surveyData.surveyName}
          </article>
          <article className='card-exp-date'>
            {this.prettyDate(this.props.surveyData.surveyExpiration)}
          </article>
        </div>
        <div className='survey-data'
             style={{display: this.state.dataDisplay}}>
          <SurveyCardData key={this.props.surveyData.id}
                          sData={this.props.surveyData}/>
        </div>
      </section>
    )
  }
}

export default SurveyCard