import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import { connect } from 'react-redux'

import apiRequest from '../../../_axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey: [], 
      message: '',
      type: '',
      active: false,
      buttonDisabled: false 
    }
    this.formMessage = this.formMessage.bind(this)
    this.fetchSurveyManagement = this.fetchSurveyManagement.bind(this)
    this.setEvaluation = this.setEvaluation.bind(this)

    this.submitSurvey = this.submitSurvey.bind(this)
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  fetchSurveyManagement(){
    apiRequest('get', `/survey-management/fetchAllWithoutPagination`, false, this.props.token)
      .then((res)=>{
        console.log(res)
        if(res.data){
          let result = res.data.data
          
          let survey = []
          result.map((attr)=>{
            let data = {
              criteria: attr.criteria,
              descriptions: []
            }
            attr.descriptions.map((desc)=>{
              data.descriptions = [...data.descriptions, { description: desc.description, evaluation: '' }]
            })
            survey = [...survey, data]
          })
          this.setState({
            survey: survey
          })
        }
      })
      .catch((err)=>{

      })
  }
  setEvaluation(surveyIndex, descriptionsIndex, evaluation){
    let survey = this.state.survey

    let selectedSurvey = survey[surveyIndex]

    let descriptions = selectedSurvey.descriptions
    
    descriptions = [...descriptions.slice(0, descriptionsIndex), {description: descriptions[descriptionsIndex].description, evaluation: evaluation } ,...descriptions.slice(descriptionsIndex + 1) ]
    
    selectedSurvey.descriptions = descriptions

    survey = [...survey.slice(0, surveyIndex), selectedSurvey, ...survey.slice(surveyIndex + 1)]
    
    this.setState({
      survey: survey
    })
  }
  submitSurvey(){
    let survey = this.state.survey

    let data = {
      user: this.props.user.id,
      date: Date.now(),
      survey: survey
    }
    apiRequest('post', `/survey-user?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        this.formMessage('Survey has been submitted', 'success', true, false)
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    this.fetchSurveyManagement()
  }
  render() {
    return (
      <Grid fluid>
        <Grid.X>
          <Grid.Cell large={12} medium={12} small={12}>
            <div className='element-container'>
              <div className='title-text-container'>
                <div className='title'>SOFTWARE EVALUATION RATING SHEET (FUNCTIONAL GROUP)</div>
              </div>
              <div className='survey-instruction'>
                <span>
                  The objective of this software evaluation is to determine the level of the features of 
                  Balik Aral System in relation to ISO 9126-1 evaluation criteria. 
                  Kindly check the appropriate column which you think the system demonstrates pertaining 
                  to a certain criterion.
                  <strong>Thank you for your participation!</strong>
                </span>

                <div className='instruction-button-container'>
                  <div className='instruction-button'>5 - Strongly Agree</div>
                  <div className='instruction-button'>4 - Agree</div>
                  <div className='instruction-button'>3 - Neither Agree nor Disagree</div>
                  <div className='instruction-button'>2 - Disagree</div>
                  <div className='instruction-button'>1 - Strongly Disagree</div>
                </div>

              </div>

              {this.state.survey.map((attr, index)=>{
                return (
                  <div key={index} className='take-survey-container'>

                    <div className='survey-title'>
                      {attr.criteria}
                    </div>

                    
                    {attr.descriptions.map((desc, i)=>{
                      return (
                        <div key={i}>
                           <div className='survey-description'> {desc.description}</div>
                           <div className='survey-button-container'>
                            <div className={'survey-button ' + (desc.evaluation === 5 ? 'active' : '')} onClick={() => this.setEvaluation(index, i, 5)}>5</div>
                            <div className={'survey-button ' + (desc.evaluation === 4 ? 'active' : '')} onClick={() => this.setEvaluation(index, i, 4)}>4</div>
                            <div className={'survey-button ' + (desc.evaluation === 3 ? 'active' : '')} onClick={() => this.setEvaluation(index, i, 3)}>3</div>
                            <div className={'survey-button ' + (desc.evaluation === 2 ? 'active' : '')} onClick={() => this.setEvaluation(index, i, 2)}>2</div>
                            <div className={'survey-button ' + (desc.evaluation === 1 ? 'active' : '')} onClick={() => this.setEvaluation(index, i, 1)}>1</div>
                           </div>

                        </div>
                      )
                    })}
                   

                  </div>


                )
              })}
             <Grid.X>
                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                  <button className='secondary button small' onClick={this.submitSurvey}>Submit</button>
                </Grid.Cell>
              </Grid.X>
            </div>

          </Grid.Cell>
        </Grid.X>
      </Grid>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.token,
    role: state.role,
    user: state.user
  }
}
const TakeSurvey = connect(mapStateToProps)(Layout)
export default TakeSurvey