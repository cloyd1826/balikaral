import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import ListExamView from './ListExamView'

import Timer from 'react-compound-timer'
 
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      exam: [],
      examType: {},
      lengthOfAnsweredQuestion: 0,
      lengthOfCorrectAnswer: 0,

      message: '',
      type: '',
      active: false,
    
      cancelExam: false,
      generating: true,
      takingExam: false,
      checkingExam: false,

      totalHours: 0,
      timer: {}
    } 
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.updateExam = this.updateExam.bind(this)

    this.setAnswer = this.setAnswer.bind(this)

    this.discontinueExam = this.discontinueExam.bind(this)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  setAnswer(answer, id){
    let exam = this.state.exam
    let index = exam.map((attr)=>{
      return attr.question._id
    }).indexOf(id)
    let answeredQuestion = exam[index]
    answeredQuestion = { ...answeredQuestion, answer: answer}
    exam = [...exam.slice(0,index), answeredQuestion, ...exam.slice(index + 1)]

    let lengthOfAnsweredQuestion = exam.filter((attr)=>{
      return attr.answer != '' 
    })

    this.setState({
      exam: exam,
      lengthOfAnsweredQuestion: lengthOfAnsweredQuestion.length
    })

    if(lengthOfAnsweredQuestion.length === exam.length){
      this.updateExam(exam, true)
    }

  }
  fetchExamType(){
    console.log(this.props.location)
    apiRequest('get', `/generated-exam/${this.props.location.state.id}`, false, this.props.token)
      .then((res)=>{  
        console.log(res)
        if(res.data){
          let result = res.data.data
          let counter = result.examType ? result.examType.totalHours ?  result.examType.totalHours : 0 : 0
          console.log((parseInt(counter) * 60 * 60 * 1000))
          this.setState({
            generating: false,
            takingExam: true,
            exam: result.exam,
            examType: result.examType ? result.examType : {},
            totalHours: (parseInt(counter) * 60 * 60 * 1000)

          })
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  discontinueExam(){
    let exam = this.state.exam
    this.updateExam(exam, false)
  }
  
  updateExam(exam, finished){
    let newExam = []
    let checkedExam = []
    exam.map((attr)=>{
      newExam = [...newExam, { answer: attr.answer, question: attr.question._id} ]
      checkedExam = [...checkedExam, {...attr, correctAnswer: attr.question.question.answer} ]
    })

    let lengthOfCorrectAnswer = checkedExam.filter((attr)=>{
      return attr.answer === attr.correctAnswer
    })


    let data = {
      exam: newExam,
    }
    if(finished){
      data = {...data, 
                  score: {
                    points: lengthOfCorrectAnswer.length,
                    dateFinished: Date.now()
                  },
                  status: 'Completed',
              }
    }else{
      data = {...data, timeRemaining: 120, status: 'Pending', }
    }

    apiRequest('put', `/generated-exam/update/${this.props.location.state.id}`, data, this.props.token)
      .then((res)=>{ 
          if(finished){
            this.setState({
              exam: checkedExam,
              lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
              takingExam: false,
              checkingExam: true
            })
          }else{
            this.setState({
              cancelExam: true,
              takingExam: false,
              checkingExam: false,
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

    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Exam - {this.state.examType ? this.state.examType.examType ? this.state.examType.examType : '' : '' }</div>
                    <div className='title-action'>
                      
                        <div className='button primary small' onClick={this.discontinueExam}>Discontinue Exam</div>
                     
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 

                     

                  {
                    this.state.generating ?
                    <div className='question-card-loader'>
                      <div className='question-loader-container'>
                        <span>
                          <i className='la la-spinner'></i>
                        </span>
                        <div className='subtitle-montserrat'>Retreiving Exam</div>
                      </div>
                    </div>
                  : null 
                  }


                  {
                    this.state.cancelExam ?
                      <div className='question-card-loader'>
                        <div className='question-loader-container'>
                          <span>
                            <i className='la la-commenting'></i>
                          </span>
                          <div className='subtitle-montserrat'>Exam Discontinued</div>
                          <div className='context-montserrat'>You can always return to this exam anytime</div>
                          <Link to='/learner/dashboard'>
                            <div className='button primary'>Return to Dashboard</div>
                          </Link>
                        </div>
                      </div>
                    : null 
                  }

                 

                   
                    
                    
                    
                  

                  

                   
                        {this.state.takingExam ? 
                          <div>
                            <div className='question-actions'>
                                <div className='action'>
                                  <i className='la la-file'></i>&nbsp;
                                  {this.state.lengthOfAnsweredQuestion}/{this.state.exam.length}
                                </div>

                                <div className='action'>
                                  <i className='la la-list-ol'></i>&nbsp;
                                  {Math.round((this.state.lengthOfAnsweredQuestion/this.state.exam.length) * 100)} %
                                </div>

                                <div className='action'>
                                  <i className='la la-clock-o'></i>&nbsp;
                                  <Timer
                                        initialTime={3600000}
                                        direction="backward"
                                    >
                                        {(start, resume, pause, stop, reset, timerState) => (
                                            <React.Fragment>
                                                <Timer.Hours /> :
                                                <Timer.Minutes /> :
                                                <Timer.Seconds />
                                                <div>{timerState}</div>
                                            </React.Fragment>
                                        )}
                                    </Timer>
                                </div>
                              </div>

                              <Grid className='question-card-list-container'>
                                <Grid.X>
                                  <Grid.Cell large={12} medium={12} small={12}>
                                    <div className='question-card-list'>
                                      {this.state.exam.map((attr, index)=>{
                                          return(
                                            <ListExamView 
                                              key={index}
                                              question={attr.question} 
                                              answer={attr.answer} 
                                              index={index} 
                                              setAnswer={this.setAnswer}
                                              />
                                          )
                                      })}
                                    </div>
                                  </Grid.Cell>
                                 </Grid.X>
                               </Grid>
                           </div>
                        : null} 


                      {this.state.checkingExam ?
                        <Grid.X >
                          <Grid.Cell large={12} medium={12} small={12} className='question-result'>
                            <div className='context-montserrat'>Percent: <span>{Math.round((this.state.lengthOfCorrectAnswer/this.state.exam.length) * 100)}%</span></div>
                          
                            <div className='context-montserrat'>Score: <span>{this.state.lengthOfCorrectAnswer}/{this.state.exam.length}</span></div>
                          </Grid.Cell>

                          <Grid.Cell large={12} medium={12} small={12}>
                            <div className='question-checking'>
                              {this.state.exam.map((attr, index)=>{
                                  return(
                                   <div className={'question-box ' + (attr.answer === attr.correctAnswer ? 'correct' : 'wrong')} key={index}>
                                      <i className={'la ' + (attr.answer === attr.correctAnswer ? 'la-check' : 'la-close')}></i>
                                      {(index + 1)  + '. ' + (attr.question.question.details)}
                                   </div>
                                  )
                              })}
                            </div>
                          </Grid.Cell>
                        </Grid.X>
                      : null} 


                  
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