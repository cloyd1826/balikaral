import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'


 
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      exam: [],
      lengthOfCorrectAnswer: 0,

      message: '',
      type: '',
      active: false,
    
      checkingExam: false,
      totalHours: 0
    } 
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
 
  fetchExamType(){
    apiRequest('get', `/generated-exam/${this.props.location.state.id}`, false, this.props.token)
      .then((res)=>{  
        if(res.data){
			let result = res.data.data
			let checkedExam = []
			let exam = result.exam
			exam.map((attr)=>{
				checkedExam = [...checkedExam, {...attr, correctAnswer: attr.question.question.answer} ]
			})
			let lengthOfCorrectAnswer = checkedExam.filter((attr)=>{
				return attr.answer === attr.correctAnswer
			})
			this.setState({
				generating: false,
				checkingExam: true,
				exam: checkedExam,
                lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
				examType: result.examType ? result.examType : {}
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
                      	<Link to={
                      		(this.props.role === 'Learner' ? '/learner/exam/list' : '') 
                      		+ (this.props.role === 'Administrator' ? '/admin/management/exam/learner' : '')
                      		+ (this.props.role === 'Teacher' ? '/teacher/management/exam/learner' : '')
                      	}>
                        	<div className='button primary small'>List of Generated Exam</div>
                     	</Link>
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