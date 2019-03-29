import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ImageLoader from '../../../_component/ImageLoader'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'
import config from '../../../_config'

import { connect } from 'react-redux'
import Axios from 'axios';



class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      question: {},
      learningStrand: '',
      answer: '',
      examFalse: false
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
  
  async setAnswer(answer, status){
    this.setState({
      answer: answer
    })
    const data = {
      question: this.state.question,
      status: this.state.question.answer === answer ? true : false,
      answer: answer
    }
    apiRequest('post', `/practice-examination`, data, this.props.token)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
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
        let result = res.data.data
        if(result){
          this.setState({
            question: result ? result[0].question ? result[0].question : {} : {}
          })
        }else{
          this.setState({
            examFalse: true
          })
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  componentDidMount(){
    
    if(this.props.location.state){
      this.fetchExamType()
    }else{
      this.props.history.push('/')
    }
  }
  render() {
    let question =  this.state.question
    console.log(question)
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



                  {!this.state.examFalse ? 
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
                            <ImageLoader className='grid-question-image' image={question.images} />
                        : ''}  


                        {this.state.answer !== '' ? 
                          this.state.answer === question.answer ? 
                            <div className='grid-correct-answer'>TAMA KA!</div>
                          : 
                            <div className='grid-wrong-answer'>MALI ang sagot mo, pero OKs lang. Ang TAMANG sagot ay: {question.answer} </div>
                        : null}

                        <div className='grid-answer'>
                          
                          <div className={'answer-text ' + (this.state.answer === 'A' ? 'active' : '' )} onClick={()=>{this.setAnswer('A', this.state.answer === 'A' ? true : false)}}>
                            <span className='letter'>A.</span>
                            <span className='answer'>
                                {question.choices ? question.choices.a ? question.choices.a.image ? question.choices.a.image != '' ?  
                                  <ImageLoader className='grid-question-image' image={question.choices.a.image} />
                                : '' : '' : '' : '' }
                              { question.choices ? question.choices.a ? question.choices.a.details ? question.choices.a.details : '' : '' : '' }
                            </span>
                          </div>

                          <div className={'answer-text ' + (this.state.answer === 'B' ? 'active' : '' )}  onClick={()=>{this.setAnswer('B', this.state.answer === 'B' ? true : false)}}>
                            <span className='letter'>B.</span>
                            <span className='answer'>
                                {question.choices ? question.choices.b ? question.choices.b.image ? question.choices.b.image != '' ?  
                                  <ImageLoader className='grid-question-image' image={question.choices.b.image} />
                                : '' : '' : '' : '' }
                              { question.choices ? question.choices.b ? question.choices.b.details ? question.choices.b.details : '' : '' : '' }
                            </span>
                          </div>


                          <div className={'answer-text ' + (this.state.answer === 'C' ? 'active' : '' )}  onClick={()=>{this.setAnswer('C', this.state.answer === 'C' ? true : false)}}>
                            <span className='letter'>C.</span>
                            <span className='answer'>
                                {question.choices ? question.choices.c ? question.choices.c.image ? question.choices.c.image != '' ?  
                                  <ImageLoader className='grid-question-image' image={question.choices.c.image} />
                                : '' : '' : '' : '' }
                              { question.choices ? question.choices.c ? question.choices.c.details ? question.choices.c.details : '' : '' : '' }
                            </span>
                          </div>

                          <div className={'answer-text ' + (this.state.answer === 'D' ? 'active' : '' )}  onClick={()=>{this.setAnswer('D', this.state.answer === 'D' ? true : false)}}>
                            <span className='letter'>D.</span>
                            <span className='answer'>
                                {question.choices ? question.choices.d ? question.choices.d.image ? question.choices.d.image != '' ?  
                                  <ImageLoader className='grid-question-image' image={question.choices.d.image} />
                                : '' : '' : '' : '' }
                              { question.choices ? question.choices.d ? question.choices.d.details ? question.choices.d.details : '' : '' : '' }
                            </span>
                          </div>
                        </div>    
                      </div>
                    </div>
                  : 


                  <div className='question-card-loader'>
                    <div className='question-loader-container'>
                      <span>
                        <i className='la la-commenting'></i>
                      </span>
                      <div className='subtitle-montserrat'>Pasensya kaibigan</div>
                      <div className='context-montserrat'>Walang tanong na nakasave sa Learning Strand na ito.</div>
                      <Link to={'/learner/dashboard'}>
                        <div className='button primary'>Dashboard</div>
                      </Link>
                    </div>
                  </div>
                   }



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