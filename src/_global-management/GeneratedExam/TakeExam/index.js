import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import GridExam from '../View.GridExam'
import QuestionAnswered from '../View.QuestionAnswered'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      exam: [],
      examType: {},
      currentPage: 1,

      lengthOfAnsweredQuestion: 0,

      learningStrand: [],

      percentagePerLearningStrand: [],

      generatingExam: true,
      takingExam: false,
      questionAnswered: false,
      checking: false
    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.changePage = this.changePage.bind(this)

    this.setAnswer = this.setAnswer.bind(this)

    this.setGrid = this.setGrid.bind(this)
    this.toggleQuestionAnswered = this.toggleQuestionAnswered.bind(this)

    this.saveExam = this.saveExam.bind(this)

    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)
  }
  setGrid(currentPage){
    this.setState({
      takingExam: true,
      questionAnswered: false,
      currentPage: currentPage
    })
  }
  toggleQuestionAnswered(){
    this.setState({
      questionAnswered: (this.state.questionAnswered ? false : true),
      takingExam: (this.state.questionAnswered ? true : false ),
    })
  }

  changePage(page){
    this.setState({
      currentPage: page
    })
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }


  setAnswer(answer, index){
    let exam = this.state.exam

    let answeredQuestion = exam[index]
    if(answeredQuestion.answer === answer){
       answeredQuestion = { ...answeredQuestion, answer: ''}
    }else{
       answeredQuestion = { ...answeredQuestion, answer: answer}
    }
    exam = [...exam.slice(0,index), answeredQuestion, ...exam.slice(index + 1)]
    
    let lengthOfAnsweredQuestion = exam.filter((attr)=>{
      return attr.answer != '' 
    })

    
    if(lengthOfAnsweredQuestion.length === exam.length){
      this.updateExam(exam, true)
    }else{
      this.setState({
        exam: exam,
        lengthOfAnsweredQuestion: lengthOfAnsweredQuestion.length,
        currentPage: index + 2,
        questionAnswered: (index === this.state.exam.length - 1  ? true : false),
        takingExam: (index === this.state.exam.length - 1 ? false : true),
      })
    }
  }
  saveExam(){
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
    let learningStrandData = this.state.learningStrand

    let percentagePerLearningStrand = []

    let data = {}

    if(finished){
      data = {
        exam: newExam,
        dateFinished: Date.now(),
        score: lengthOfCorrectAnswer.length
      }

      let listOfQuestionsPerLearningStrand = []
      let learningStrand = this.state.examType.learningStrandQuestions
      learningStrand.map((attr)=>{
        listOfQuestionsPerLearningStrand = [...listOfQuestionsPerLearningStrand, { id: attr.learningStrand, content: [] } ]
      })
      let lsId = listOfQuestionsPerLearningStrand.map((attr)=>{
        return attr.id
      })    
      checkedExam.map((attr)=> {
        let index = lsId.indexOf(attr.question.learningStrand) 
        let content = listOfQuestionsPerLearningStrand[index].content
        content = [...content, attr]
        listOfQuestionsPerLearningStrand[index].content = content
     
      })
     
      listOfQuestionsPerLearningStrand.map((attr)=>{
        let correctAnswerOfQuestions = attr.content.filter((attr)=>{
          return attr.answer === attr.correctAnswer
        }) 

        let data = {
          learningStrand: attr.id,
          learningStrandName: learningStrandData[learningStrandData.map((attr)=>{return attr._id}).indexOf(attr.id)].name,
          percentage: Math.round((correctAnswerOfQuestions.length/attr.content.length) * 100),
          score: correctAnswerOfQuestions.length,
          totalQuestion: attr.content.length
        }
        percentagePerLearningStrand = [...percentagePerLearningStrand, data]
      })
      if(Math.round((lengthOfCorrectAnswer.length/exam.length) * 100) < 90 ){
        //retake
        data = {...data, status: 'Retake', percentagePerLearningStrand: percentagePerLearningStrand}
      }else{
        //completed
        data = {...data, status: 'Completed',  percentagePerLearningStrand: percentagePerLearningStrand}

      }


    }else{
      data = {
        exam: newExam,
        timeRemaining: 120, 
        status: 'Pending' 
      }
    }
    apiRequest('put', `/generated-exam/update/${this.props.location.state.id}`, data, this.props.token)
      .then((res)=>{ 
       if(finished){
          this.setState({
            exam: checkedExam,
            lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
            lengthOfAnsweredQuestion: checkedExam.length,
            percentagePerLearningStrand: percentagePerLearningStrand,
            takingExam: false,
            questionAnswered: true,
            checking: true,
          })
        }else{
            this.setState({
              cancelExam: true,
              takingExam: false,
              questionAnswered: false,
              checking: false
            })
          }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  fetchExamType(){
    apiRequest('get', `/generated-exam/${this.props.location.state.id}`, false, this.props.token)
      .then((res)=>{ 
        if(res.data){
          let result = res.data.data
          console.log('res',result)
          let exam = [] 
          result.exam.map((attr)=>{
            exam = [...exam, {answer: attr.answer, question: attr.question}]
          })
          let lengthOfAnsweredQuestion = exam.filter((attr)=>{
            return attr.answer != '' 
          })

          this.setState({
            currentPage: 1,
            exam: exam,
            lengthOfAnsweredQuestion: lengthOfAnsweredQuestion.length,
            examType: result.examType ? result.examType : {},
            generatingExam: false,  
            takingExam: true,
            
          })
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  fetchLearningStrand(){
    apiRequest('get', `/learning-strand/all`, false, this.props.token)
      .then((res)=>{ 
        if(res.data){
          let result = res.data.data
          console.log('ls', result)
          this.setState({
            learningStrand: result
          })
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  componentDidMount(){
    this.fetchExamType()
    this.fetchLearningStrand()
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
                        
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 

                   { // generating exam loader
                    this.state.generating ?
                    <div className='question-card-loader'>
                      <div className='question-loader-container'>
                        <span>
                          <i className='la la-spinner'></i>
                        </span>
                        <div className='subtitle-montserrat'>Retreiving Exam</div>
                      </div>
                    </div>
                  : null }

                   { //cancel exam
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


                  {this.state.takingExam || this.state.questionAnswered && !this.state.checking ? 
                    <div className='grid-question-action'>
                        <div className='action' >
                          <i className='la la-list-ol' />
                          {this.state.lengthOfAnsweredQuestion}/{this.state.exam.length}
                        </div>
                        <div className='action'>
                          <i className='la la-hourglass-2' />
                          5:00
                        </div>
                        <div className='action' onClick={this.toggleQuestionAnswered}>
                            <i className='la la-list' /> 
                            Question No.
                        </div>
                        <div className='action' onClick={this.saveExam}>
                            <i className='la la-floppy-o' />
                            Save Exam
                        </div>
                      </div>
                  : null}

                  {this.state.checking ?
                    <div className='grid-question-action'>
                      <div className='action'>
                        <i className='la la-list-alt' />
                        Result: &nbsp;
                        {this.state.lengthOfCorrectAnswer}/{this.state.exam.length}
                      </div>
                      <div className='action'>
                        <i className='la la-smile-o' />
                        Percent: &nbsp;
                        {Math.round((this.state.lengthOfCorrectAnswer/this.state.exam.length) * 100)} %
                      </div>
                      <div className='action'>
                        <i className='la la-hourglass-2' />
                        5:00
                      </div>
                      <Link to='/learner/dashboard'>
                        <div className='action'>
                            <i className='la la-home' />
                            Return to Dashboard
                        </div>
                      </Link>
                    </div>
                  : null}

                  {this.state.takingExam ?
                      <GridExam 
                          totalPage={this.state.exam.length}
                          currentPage={this.state.currentPage}
                          question={this.state.exam[this.state.currentPage - 1] ? this.state.exam[this.state.currentPage - 1].question ? this.state.exam[this.state.currentPage - 1].question : {} : {}}
                          answer={this.state.exam[this.state.currentPage - 1] ? this.state.exam[this.state.currentPage - 1].answer ? this.state.exam[this.state.currentPage - 1].answer : '' : ''}
                          changePage={this.changePage}
                          setAnswer={this.setAnswer}
                        />
                  : null}
                   
                    
                  {this.state.questionAnswered ? 

                    <QuestionAnswered 
                      exam={this.state.exam}
                      setGrid={this.setGrid}
                      checking={this.state.checking}
                      percentagePerLearningStrand={this.state.percentagePerLearningStrand}
                    />
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