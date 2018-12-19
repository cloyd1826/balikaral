import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'



import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        question: '',
        questionImage: '',
        answer: '',
        level: '',
        learningStrand: '',
        a: '',
        b: '',
        c: '',
        d: '',

        aImage: '',
        bImage: '',
        cImage: '',
        dImage: '',

        uploader: '',
        validation: false,
        validator: [],

        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        disableReview: false,

        modalActive: false


      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.toggleModal = this.toggleModal.bind(this)

  }

  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  toggleModal(){
    if(this.state.modalActive){
      this.setState({
        modalActive: false
      })
    }else{
      this.setState({
        modalActive: true
      })
    }
  }
  componentDidMount(){
    this.fetchSingle()
  }
  fetchSingle(){
    console.log(this.props.location.state.id)
    apiRequest('get', `/exam-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            console.log('result', res.data.data)
            if(res.data){
                let result = res.data.data
                let validator = result.validator

                //check if the current user has validated the reviewer already
                let isValidatedByCurrentUser = validator.map((attr)=>{
                  return attr.user._id
                }).indexOf(this.props.user.id)

                this.setState({
                    questionImage: (result.question ? result.question.images ? result.question.images : '' : ''),
                    question: (result.question ? result.question.details ? result.question.details : '' : ''),
                    answer: (result.question ? result.question.answer ? result.question.answer : '' : ''),
                    difficulty: (result.question ? result.question.difficulty ? result.question.difficulty : '' : ''),
                    level: (result.level ? result.level.name ? result.level.name : '' : ''),
                    learningStrand: (result.learningStrand ? result.learningStrand.name ? result.learningStrand.name : '' : ''),
                    a: (result.question ? result.question.choices ? result.question.choices.a ? result.question.choices.a.details ? result.question.choices.a.details : '' : '' : '' : '' ),
                    b: (result.question ? result.question.choices ? result.question.choices.b ? result.question.choices.b.details ? result.question.choices.b.details : '' : '' : '' : '' ),
                    c: (result.question ? result.question.choices ? result.question.choices.c ? result.question.choices.c.details ? result.question.choices.c.details : '' : '' : '' : '' ),
                    d: (result.question ? result.question.choices ? result.question.choices.d ? result.question.choices.d.details ? result.question.choices.d.details : '' : '' : '' : '' ),
                   
                    aImage: (result.question ? result.question.choices ? result.question.choices.a ? result.question.choices.a.image ? result.question.choices.a.image : '' : '' : '' : '' ),
                    bImage: (result.question ? result.question.choices ? result.question.choices.b ? result.question.choices.b.image ? result.question.choices.b.image : '' : '' : '' : '' ),
                    cImage: (result.question ? result.question.choices ? result.question.choices.c ? result.question.choices.c.image ? result.question.choices.c.image : '' : '' : '' : '' ),
                    dImage: (result.question ? result.question.choices ? result.question.choices.d ? result.question.choices.d.image ? result.question.choices.d.image : '' : '' : '' : '' ),

                    uploader: (result.uploader ? result.uploader.personalInformation ? 
                              (result.uploader.personalInformation.firstName ? result.uploader.personalInformation.firstName : '') 
                              + ' ' + 
                              (result.uploader.personalInformation.middleName ? result.uploader.personalInformation.middleName.substring(0,1) : '')
                              + ' ' + 
                              (result.uploader.personalInformation.lastName ? result.uploader.personalInformation.lastName : '')
                              : '' : ''),
                    validation: result.validation,
                    validator: (result.validator ? result.validator : [] ),

                    disableReview: ( isValidatedByCurrentUser > -1 || this.props.user.id === result.uploader._id  ? true : false )
                   
                })
            }
            
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }
 
  handleChange(e){
    let name = e.target.name
    let value = e.target.value

    this.setState({
        [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Updating Data...', 'loading', true, true)

    let validator = this.state.validator
    validator = [...validator, { user: this.props.user.id }]
    let data = {
      validator: validator,
      validation: (validator.length >= 3 || this.props.role === 'Administrator' ? true : false)
    }
    
    apiRequest('put', `/exam-management/validate/${this.props.location.state.id}`, data, this.props.token)
        .then((res)=>{
          this.formMessage('Data has been updated', 'success', true, false)
          this.fetchSingle()
          this.setState({
            modalActive: false
          })
      })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  render() { 
    return (
        <div>
            <Grid fluid>
                <Grid.X>
                    <Grid.Cell large={12}>
                        <div className='element-container'>
                            <div className='title-text-container'>
                                <div className='title'>Exam Management > Validate</div>
                                <div className='title-action'>
                                    <Link to={ (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
                                        <div className='button primary small'>List of Exams</div>
                                    </Link>
                                </div>
                            </div>
                           <Grid.X className='exam-view'>

                              <Grid.Cell large={3} medium={6} small={12}>
                                <div className='context-montserrat'>Level: <span>{this.state.level}</span></div>
                              </Grid.Cell>
                              <Grid.Cell large={3} medium={6} small={12}>
                                <div className='context-montserrat'>Learning Strand: <span>{this.state.learningStrand}</span></div>
                              </Grid.Cell>
                              <Grid.Cell large={3} medium={6} small={12}>
                                <div className='context-montserrat'>Teacher: <span>{this.state.uploader}</span></div>
                              </Grid.Cell>
                              <Grid.Cell large={3} medium={6} small={12}>
                                <div className='context-montserrat'>Validation Status: <span>{this.state.validation ? 'Validated' : 'For Validation' }</span></div>
                              </Grid.Cell>
                              <Grid.Cell large={12} medium={6} small={12}>
                                <div className='context-montserrat'>Validators: 
                                 
                                  {
                                    this.state.validator.length > 0 ?
                                        this.state.validator.map((attr,index)=>{
                                          return (
                                             <span key={index} className='validator-name'>
                                             {  attr.user ? attr.user.personalInformation ? 
                                                 (attr.user.personalInformation.firstName ? attr.user.personalInformation.firstName : '') 
                                                 + ' ' + 
                                                 (attr.user.personalInformation.middleName ? attr.user.personalInformation.middleName.substring(0,1) : '')
                                                 + ' ' + 
                                                 (attr.user.personalInformation.lastName ? attr.user.personalInformation.lastName : '')
                                             : '' : ''}
                                            </span>
                                          )
                                        })
                                        :
                                        <span className='no-validator'>No validators</span>
                                         
                                  }
                                  
                                </div>
                              </Grid.Cell>
                             
                              <Grid.Cell large={12} medium={12} small={12}>
                                <div className='question-card'>
                                  <div className='question-action'>
                                    <button disabled={this.state.disableReview} className='button primary' onClick={this.toggleModal}>Validate Exam</button>
                                  </div>
                                  <div className='question'>{this.state.question}</div>

                                  {
                                    this.state.questionImage != '' ?
                                    <div className='question-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.state.questionImage + ')'}}></div>
                                    : null }                                  
                                  <div className='answer-container'>

                                      <div className='answer-box'>
                                        <div className='answer-text'>
                                          <span className={'letter ' + (this.state.answer === 'A' ? 'correct' : '')}>A.</span>
                                          <span className='answer'>
                                             {
                                              this.state.aImage != '' ?
                                              <div className='answer-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.state.aImage + ')'}}></div>
                                              : null }
                                            {this.state.a}
                                          </span>
                                        </div>
                                        
                                      </div>
                                      <div className='answer-box'>
                                        <div className='answer-text'>
                                          <span className={'letter ' + (this.state.answer === 'B' ? 'correct' : '')}>B.</span>
                                          <span className='answer'>
                                            {
                                              this.state.bImage != '' ?
                                              <div className='answer-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.state.bImage + ')'}}></div>
                                              : null }
                                            {this.state.b}
                                          </span>
                                        </div>
                                       
                                      </div>
                                      <div className='answer-box'>
                                        <div className='answer-text'>
                                          <span className={'letter ' + (this.state.answer === 'C' ? 'correct' : '')}>C.</span>
                                          <span className='answer'>
                                           {
                                              this.state.cImage != '' ?
                                              <div className='answer-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.state.cImage + ')'}}></div>
                                              : null }
                                            {this.state.c}
                                          </span>
                                        </div>
                                      </div>
                                      <div className='answer-box'>
                                        <div className='answer-text'>
                                          <span className={'letter ' + (this.state.answer === 'D' ? 'correct' : '')}>D.</span>
                                          <span className='answer'>
                                            {
                                              this.state.dImage != '' ?
                                              <div className='answer-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.state.dImage + ')'}}></div>
                                              : null }
                                            {this.state.d}
                                          </span>
                                        </div>
                                      </div>

                                  </div>
                                  <div className='difficulty'>Difficulty: {this.state.difficulty}</div>
                                </div>
                              </Grid.Cell>
                          </Grid.X>
                        </div>
                    </Grid.Cell>
                </Grid.X>
            </Grid>

            {this.state.modalActive ? 
              <div className='modal'>
                <div className='confirm-modal'>
                  <span className='close-button la la-close' onClick={this.toggleModal}></span>
                  <div className='delete-title text-center'>Validate Question: {this.state.question} ?</div>
                  <div className='context-montserrat text-center'>You will be recorded as a validator of this question.</div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className='delete-button-group'>
                    <button type='button' className='button yes small' onClick={this.handleSubmit}>YES</button>
                    <button type='button' className='button no small' onClick={this.toggleModal}>CANCEL</button>
                  </div>
                </div> 
              </div>
            : null}

        </div>
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
const ValidateExam = connect(mapStateToProps)(Layout)
export default ValidateExam