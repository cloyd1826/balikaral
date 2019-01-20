import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import { connect } from 'react-redux'

import apiRequest from '../../../_axios'

import moment from 'moment'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey: [], 
      user: '',
      date: '',
      message: '',
      type: '',
      active: false,
      buttonDisabled: false 
    }
    this.formMessage = this.formMessage.bind(this)
    this.fetchSurvey = this.fetchSurvey.bind(this)
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  fetchSurvey(){
    apiRequest('get', `/survey-user/${this.props.location.state.id}`, false, this.props.token)
      .then((res)=>{
        console.log(res)
        if(res.data){
          let result = res.data
          console.log(result)
          this.setState({
            survey: result.data.survey,
            user: result.data.user,
            date: result.data.date
          })
        }
      })
      .catch((err)=>{

      })
  }
  
  componentDidMount(){
    this.fetchSurvey()
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

              <div className='survey-user'>
                <div className='user'>
                  {this.state.user ? this.state.user.personalInformation ? 
                    this.state.user.personalInformation.lastName && this.state.user.personalInformation.firstName ? 
                      this.state.user.personalInformation.firstName + ' ' + this.state.user.personalInformation.lastName
                    : '' : '' : ''}
                  {this.state.user ? this.state.user.google ? this.state.user.google.name ? this.state.user.google.name : '' : '' : ''}
                  {this.state.user ? this.state.user.facebook ? this.state.user.facebook.name ? this.state.user.facebook.name : '' : '' : ''}
                </div>
                <div className='date'>{moment(this.state.date).format('MMM DD, YYYY - LTS')}</div>
              </div>

              <div className='survey-instruction'>
                

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
                            <div className={'survey-button ' + (parseInt(desc.evaluation) === 5 ? 'active' : '')}>5</div>
                            <div className={'survey-button ' + (parseInt(desc.evaluation) === 4 ? 'active' : '')}>4</div>
                            <div className={'survey-button ' + (parseInt(desc.evaluation) === 3 ? 'active' : '')}>3</div>
                            <div className={'survey-button ' + (parseInt(desc.evaluation) === 2 ? 'active' : '')}>2</div>
                            <div className={'survey-button ' + (parseInt(desc.evaluation) === 1 ? 'active' : '')}>1</div>
                           </div>

                        </div>
                      )
                    })}
                   

                  </div>


                )
              })}
             
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