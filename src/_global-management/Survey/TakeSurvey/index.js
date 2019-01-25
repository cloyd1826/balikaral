import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import { connect } from 'react-redux'

import apiRequest from '../../../_axios'

import FormMessage from '../../../_component/Form/FormMessage'

let surveyData = [
  {
    criteria: 'Functionality',
    descriptions: [
      {
        description: 'Isthe system able to include all the enumerated tasks for a specific user?',
        evaluation: '',
      },
      {
        description: 'Can the system performs all the modules required by the users?',
        evaluation: '',
      },
      {
        description: 'Are the functionalities able to produce accurate results once executed?',
        evaluation: '',
      },
      {
        description: 'Can the system communicates with other system components or modules?',
        evaluation: '',
      },
      {
        description: 'Can the system connects the users from one link to another to continue a specific transaction?',
        evaluation: '',
      },
      {
        description: 'Does the system provides a minimum needed security like access of authorized users or users with approved account only?',
        evaluation: '',
      },
    ]
  },
  {
    criteria: 'Reliability',
    descriptions: [
      {
        description: 'Does the system run without any errors every time accessed or used by a particular user?',
        evaluation: '',
      },
      {
        description: 'Does the system include in its design the ability to recover itself from a component or environmental failure?',
        evaluation: '',
      },
      {
        description: 'Does the system has the ability to recover from failed system component to its full operation, including data and network connections?',
        evaluation: '',
      },
      
    ]
  },
  {
    criteria: 'Usability',
    descriptions: [
      {
        description: 'Does the system provides easy to follow and understand User Interface?',
        evaluation: '',
      },
      {
        description: 'Does the system provides an interface that is easy to learn?',
        evaluation: '',
      },
      {
        description: 'Are clear instructions or help provided in the system?',
        evaluation: '',
      },
      {
        description: 'Can the users easily use any device whether computer or laptop?',
        evaluation: '',
      },
      {
        description: 'Does the system possesses an almost same look or design in the interface?',
        evaluation: '',
      },
      {
        description: 'Are the combinations of colors and graphics well-coordinated in the design?',
        evaluation: '',
      },
    ]
  },
  {
    criteria: 'Efficiency',
    descriptions: [
      {
        description: 'Does the system runs appropriately and accurately in the minimum requirements identified in the study',
        evaluation: '',
      },
    ]
  },
  {
    criteria: 'Maintainability',
    descriptions: [
      {
        description: 'Can the system provides accurate error messages once it encounters a failure?',
        evaluation: '',
      },
      {
        description: 'Are changes in the system easy to incorporate as less efforts are exerted?',
        evaluation: '',
      },
    ]
  },
  {
    criteria: 'Portability',
    descriptions: [
      {
        description: 'Does the system still functions well when installed in a new device?',
        evaluation: '',
      },
      {
        description: 'Does the system still functions well when installed in a new device?',
        evaluation: '',
      },
    ]
  }
]

















class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey: [], 
      message: '',
      type: '',
      active: false,
      buttonDisabled: false,
      takingSurvey: true
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
        this.setState({
          takingSurvey: false
        })
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    // this.fetchSurveyManagement()
    this.setState({
      survey: surveyData
    })
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
              <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
              {this.state.takingSurvey ? 
              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
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
                </Grid.Cell>
                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                  <button className='secondary button small' onClick={this.submitSurvey}>Submit</button>
                </Grid.Cell>

              </Grid.X>
              : 
               <Grid.X>
                  <Grid.Cell large={12} medium={12} small={12}>
                     <div className='exam-type-loader'>
                      <div>
                        <span>
                          <i className='la la-pencil-square'></i>
                        </span>
                        <div className='subtitle-montserrat'>Congratulations</div>
                        <div className='context-montserrat'>Naitapos mo na ang survey.</div>
                         <Link to='/learner/dashboard'>
                          <div className='button primary'>Dashboard</div>
                        </Link>
                      </div>
                    </div> 
                  </Grid.Cell>
                </Grid.X>
              }
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