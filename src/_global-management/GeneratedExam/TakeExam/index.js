import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import GridExam from '../View.GridExam'
import QuestionAnswered from '../View.QuestionAnswered'

import { bindActionCreators } from 'redux';
import { logInUser } from '../../../_redux/actions/user'

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
      checking: false,

      hadPreTest: false,

      timeRemaining: 0,
      hours: 0,
      minutes: 0,
      seconds: 0



    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.changePage = this.changePage.bind(this)

    this.setAnswer = this.setAnswer.bind(this)

    this.setGrid = this.setGrid.bind(this)
    this.toggleQuestionAnswered = this.toggleQuestionAnswered.bind(this)

    this.saveExam = this.saveExam.bind(this)

    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)

    this.timer = this.timer.bind(this)
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
      let timeRemaining = Math.floor(this.state.timeRemaining / 60)
      clearInterval(this.timerID);
      this.updateExam(exam, true, timeRemaining)
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
  timer(){
    let timeRemaining = this.state.timeRemaining
    timeRemaining = timeRemaining - 1
    let hours = Math.floor(((timeRemaining * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor(((timeRemaining * 1000) % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor(((timeRemaining * 1000) % (1000 * 60)) / 1000);
   
    this.setState({
        timeRemaining: timeRemaining,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    })
    if(this.state.timeRemaining === 0){
        clearInterval(this.timerID);
        let exam = this.state.exam

       
        this.updateExam(exam, true, 0)
    }
  }
  saveExam(){
    let exam = this.state.exam
    let timeRemaining = Math.floor(this.state.timeRemaining / 60)
    clearInterval(this.timerID);
    this.updateExam(exam, false, timeRemaining)
  }
  componentWillUnmout(){
    let exam = this.state.exam
    let timeRemaining = Math.floor(this.state.timeRemaining / 60)
    this.updateExam(exam, false, timeRemaining)
    clearInterval(this.timerID);

  }
  updateExam(exam, finished, timeRemaining){
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
        data = {...data, status: 'Retake', percentagePerLearningStrand: percentagePerLearningStrand, timeRemaining: timeRemaining,}
      }else{
        //completed
        data = {...data, status: 'Completed',  percentagePerLearningStrand: percentagePerLearningStrand, timeRemaining: timeRemaining,}

      }


    }else{
      data = {
        exam: newExam,
        timeRemaining: timeRemaining, 
        status: 'Pending' 
      }
    }

    this.setState({
            exam: checkedExam,
            lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
            lengthOfAnsweredQuestion: checkedExam.length,
            percentagePerLearningStrand: percentagePerLearningStrand,
            takingExam: false,
            questionAnswered: true,
            checking: true,
          })

    apiRequest('put', `/generated-exam/update/${this.props.location.state.id}`, data, this.props.token)
      .then((res)=>{ 
       if(finished){
          this.setState({
            exam: checkedExam,
            lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
            lengthOfAnsweredQuestion: checkedExam.length,
            percentagePerLearningStrand: percentagePerLearningStrand,
            takingExam: false,
            questionAnswered: (this.props.hadPreTest ? true : false),
            checking: (this.props.hadPreTest ? true : false),
            hadPreTest: (this.props.hadPreTest ? false : true),

          })

           if(!this.props.hadPreTest){
              
              let userData = {
                user: this.props.user,
                token: this.props.token,
                isLoggedIn: true,
                role: this.props.role,
                hadPreTest: true,
                level: this.props.level
              }
              this.props.actions.logIn(userData)
              this.props.history.push({
                pathname: '/pre-test-result',
                state: { 
                exam: checkedExam,
                lengthOfCorrectAnswer: lengthOfCorrectAnswer.length,
                percentagePerLearningStrand: percentagePerLearningStrand,
                examType: this.state.examType,
                timeRemaining: timeRemaining
                }
              })
              
            }


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
            timeRemaining: (result.timeRemaining ? parseInt(result.timeRemaining) * 60 : '' )
          })
          this.timerID = setInterval(
            () => this.timer(),
            1000
          );
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
    
    if(this.props.location.state){
      this.fetchExamType()
      this.fetchLearningStrand()
    }else{
      this.props.history.push('/')
    }
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
                        <div className='subtitle-montserrat'>Inihahanda ang iyong exam.</div>
                        <div className='context-montserrat'>Maaring mag-antay muna ng konting minuto.</div>
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
                          <div className='subtitle-montserrat'>Itinigil muna ang iyong Exam</div>
                          <div className='context-montserrat'>Maari mong balikan ang exam na ito kahit kailan.</div>
                          <Link to={(this.props.hadPreTest ? '/learner/dashboard' : '/learner-start/dashboard')}>
                            <div className='button primary'>Dashboard</div>
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
                          {this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds}
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

                  {this.state.hadPreTest ? 
                    <div className='question-card-loader'>
                      <div className='question-loader-container'>
                        <span>
                          <i className='la la-spinner'></i>
                        </span>
                        <div className='subtitle-montserrat'>Please Wait.</div>
                      </div>
                    </div>

                  : null}

                  {this.state.checking ?
                    <div>
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
                          {this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds}
                        </div>
                        <Link to={this.props.hadPreTest ? '/learner/dashboard' : '/learner-start/dashboard'}>
                          <div className='action'>
                              <i className='la la-home' />
                              Return to Dashboard
                          </div>
                        </Link>
                      </div>
                      </div>
                    : null }

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
    user: state.user,
    hadPreTest: state.hadPreTest,
    level: state.level
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions:{
       logIn: bindActionCreators(logInUser, dispatch)
    }
  }
}

const ListLevel = connect(mapStateToProps, mapDispatchToProps)(Layout)
export default ListLevel  