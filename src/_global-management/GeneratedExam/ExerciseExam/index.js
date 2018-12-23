import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'
import config from '../../../_config'

import { connect } from 'react-redux'



class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      question: {},
      learningStrand: '',
      answer: '',
    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
    this.newExam = this.newExam.bind(this)
  }

  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  setAnswer(answer){
    this.setState({
      answer: answer
    })
  }
  newExam(){
    this.setState({
      answer: ''
    })
    this.fetchExamType()
  }
  fetchExamType(){
    
    apiRequest('get', `/exam-management/exercise/${this.props.location.state.id}`, false, this.props.token)
      .then((res)=>{ 
        let result = res.data
        console.log(result)
        if(result){
          this.setState({
            question: result.data[0] ? result.data[0].question ? result.data[0].question : {} : {}
          })
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  componentDidMount(){
    this.fetchExamType()
  }
  render() {
    let question =  this.state.question
    console.log(this.state.answer)
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Exercise Exam - {this.props.location.state.learningStrand}</div>
                    <div className='title-action'>
                       <Link to='/learner/exam/learning-strand'>
                        <div className='button primary small'>Learning Strand List</div>
                      </Link>
                      <Link to='/learner/dashboard'>
                        <div className='button primary small'>Return to Dashboard</div>
                      </Link>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 

                  <div className={'grid-exam-container ' + (this.state.answer !== '' ? 'answered' : '')}>
                    <div className='prev-icon' onClick={this.newExam}>
                      <i className='la la-chevron-circle-left' />
                    </div>
                    <div className='next-icon' onClick={this.newExam}>
                      <i className='la la-chevron-circle-right' />
                    </div>
                    <div className='grid-exam'>
                      <div className='grid-question-details'>
                        <span>
                          {question.details ? question.details : ''}

                        </span>
                      </div>
                      { question.images ? 
                          <div className='grid-question-image' style={{backgroundImage: `url(${config}/` + question.images + ')'}}></div>
                      : ''}  


                      {this.state.answer !== '' ? 
                        this.state.answer === question.answer ? 
                          <div className='grid-correct-answer'>Congratulations. Your answer is correct</div>
                        : 
                          <div className='grid-wrong-answer'>Nice Try. The correct answer is {question.answer} </div>
                      : null}

                      <div className='grid-answer'>
                        
                        <div className={'answer-text ' + (this.state.answer === 'A' ? 'active' : '' )} onClick={()=>{this.setAnswer('A')}}>
                          <span className='letter'>A.</span>
                          <span className='answer'>
                              {question.choices ? question.choices.a ? question.choices.a.image ? question.choices.a.image != '' ?  
                                <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.a.image + ')'}}></div>
                              : '' : '' : '' : '' }
                            { question.choices ? question.choices.a ? question.choices.a.details ? question.choices.a.details : '' : '' : '' }
                          </span>
                        </div>

                        <div className={'answer-text ' + (this.state.answer === 'B' ? 'active' : '' )}  onClick={()=>{this.setAnswer('B')}}>
                          <span className='letter'>B.</span>
                          <span className='answer'>
                              {question.choices ? question.choices.b ? question.choices.b.image ? question.choices.b.image != '' ?  
                                <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.b.image + ')'}}></div>
                              : '' : '' : '' : '' }
                            { question.choices ? question.choices.b ? question.choices.b.details ? question.choices.b.details : '' : '' : '' }
                          </span>
                        </div>


                        <div className={'answer-text ' + (this.state.answer === 'C' ? 'active' : '' )}  onClick={()=>{this.setAnswer('C')}}>
                          <span className='letter'>C.</span>
                          <span className='answer'>
                              {question.choices ? question.choices.c ? question.choices.c.image ? question.choices.c.image != '' ?  
                                <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.c.image + ')'}}></div>
                              : '' : '' : '' : '' }
                            { question.choices ? question.choices.c ? question.choices.c.details ? question.choices.c.details : '' : '' : '' }
                          </span>
                        </div>

                        <div className={'answer-text ' + (this.state.answer === 'D' ? 'active' : '' )}  onClick={()=>{this.setAnswer('D')}}>
                          <span className='letter'>D.</span>
                          <span className='answer'>
                              {question.choices ? question.choices.d ? question.choices.d.image ? question.choices.d.image != '' ?  
                                <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.d.image + ')'}}></div>
                              : '' : '' : '' : '' }
                            { question.choices ? question.choices.d ? question.choices.d.details ? question.choices.d.details : '' : '' : '' }
                          </span>
                        </div>
                      </div>    
                    </div>
                  </div>
                </div>
              </Grid.Cell>
            </Grid.X>
          </Grid>

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
const ListLevel = connect(mapStateToProps)(Layout)
export default ListLevel  