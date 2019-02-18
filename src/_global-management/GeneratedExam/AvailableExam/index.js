import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import talino from '../../../IconImages/tapang-blur.png'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      examType: [],
      examToGenerate: [],
      
      message: '',
      type: '',
      active: false,

      generating: false,
      checking: true,

      hasPending: false,
      isAvailable: false,
      hasPassed: false,
      notEnoughQuestion: false,

      exam: {},
      examLearningStrand: [],
    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.generateExam = this.generateExam.bind(this)
    this.postExam = this.postExam.bind(this)

    this.checkStatus = this.checkStatus.bind(this)

    this.toggleHasPassed = this.toggleHasPassed.bind(this)
    this.toggleTakeAdaptiveTest = this.toggleTakeAdaptiveTest.bind(this)
    this.toggleNotEnoughQuestion = this.toggleNotEnoughQuestion.bind(this)

    this.addToExam = this.addToExam.bind(this)

    this.checkIfPassed = this.checkIfPassed.bind(this)
  }
  toggleHasPassed(){
    this.setState({
      hasPassed: (this.state.hasPassed ? false : true),
    })
  }
  toggleNotEnoughQuestion(){
    this.setState({
      notEnoughQuestion: (this.state.notEnoughQuestion ? false : true),
    })
  }

  toggleTakeAdaptiveTest(){
    this.setState({
      takeAdaptiveTest: (this.state.takeAdaptiveTest ? false : true),
    })
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  fetchExamType(){
    let hasPassedAdaptiveTest = false
    apiRequest('get', `/generated-exam/learner-adaptive-test?level=${this.props.level}&examiner=${this.props.user.id}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          hasPassedAdaptiveTest = res.data.adaptivetest
          let requestTest = ''
          if(hasPassedAdaptiveTest){ //passed the adaptive test, show post test too.
            requestTest = 'hidePreTest=true'
          }else{//failed or no adaptive test, show adaptive test only
            requestTest = 'hidePostTest=true'
          }
          apiRequest('get', `/exam-type-management/all?level=${this.props.level}&${requestTest}`, false, this.props.token)
            .then((res)=>{
              console.log(res)
              if(res.data){
                this.setState({
                  examType: res.data.data
                })  
              }
            })
            .catch((err)=>{
            
              this.formMessage('Error: ' + err.message, 'error', true, false)
            })

        }
      })
      .catch((err)=>{
      
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  checkIfPassed(data){
    apiRequest('get', `/exam-management/exam-status?examinerId=${this.props.user.id}&type=${data.examType}`, false, this.props.token)
      .then((res)=>{
        console.log(res)
        if(res.data.status === 'Exam Available'){
          this.generateExam(data.learningStrandQuestions)
        }else if(res.data.failedLearningStrand){
          let ls = []
          let fls = res.data.failedLearningStrand
          data.learningStrandQuestions.filter((attr)=>{
            if(fls.indexOf(attr.learningStrand._id) > -1){
              ls = [...ls, attr]
            }
          })
          this.setState({
            examLearningStrand: ls,
          })
          this.generateExam(ls)
          
        }else if(res.data.status==='Passed'){
          this.setState({
            generating: false,
            hasPassed: true
          })
        }
        this.setState({
          exam: data,
        })
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  generateExam(learningStrandQuestion){
    this.setState({
      examLearningStrand: learningStrandQuestion 
    })
    console.log(this.state.examLearningStrand)
    this.setState({
      generating: true,
    })
    let count = 0
    learningStrandQuestion.map((attr)=>{
      count = count + parseInt(attr.total) 
    })
    learningStrandQuestion.map((attr, index)=>{

      if(index === learningStrandQuestion.length - 1){
        this.addToExam(attr.learningStrand._id, attr.total, true, count)
      }else{
        this.addToExam(attr.learningStrand._id, attr.total, false, count)
      }
    })
  }
  addToExam(learningStrand, learningStrandTotal, post, count){
    
    if(learningStrand){
      apiRequest('get', `/exam-management/generate-exam?level=${this.props.level}&learningStrand=${learningStrand}&total=${learningStrandTotal}`, false, this.props.token)
        .then((res)=>{
          console.log('e',res)
          let examToGenerate = this.state.examToGenerate
          const examG = res.data.exam.map((attr)=>{
            examToGenerate = [...examToGenerate, { question: attr._id, answer: ''}]
          })
          if(examG){
            this.setState({
              examToGenerate: examToGenerate
            })
            console.log('eg',examToGenerate)
            if(post && parseInt(examToGenerate.length) === parseInt(count)){
              console.log("examToGenerate",examToGenerate)
              console.log("this.state.exam",this.state.exam)
              this.postExam(examToGenerate, this.state.exam)
            }
            if(post && parseInt(examToGenerate.length) !== parseInt(count)){
              console.log("this.state.examLearningStrand",this.state.examLearningStrand)
              this.setState({
                examToGenerate: [],
                isAvailable: true,
                generating: false,
                exam: {}
              })
              this.generateExam(this.state.examLearningStrand)
              
            }
          }
        })
        .catch((err)=>{

        })
    }
    
  }
  postExam(exam, type){
    console.log("type",type)  
    let data = {
      examType: type._id,
      exam: exam,
      examiner: this.props.user.id,
      type: type.examType,
      status: 'Pending',
      timeRemaining: type.totalHours,
      dateStarted: Date.now(),
      level: this.props.level
    }
    console.log(data.examType)
    if(data.examType == "undefined" || data.examType == null){
      this.props.history.push({
        pathname: '/learner/exam/available'
      })
    }
    else{
      apiRequest('post', `/generated-exam?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        
          this.props.history.push({
            pathname: '/learner/exam/take',
            state: { id: res.data.data._id }
          })
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
    }
  }

  checkStatus(){
    apiRequest('get', `/generated-exam/check-status/${this.props.user.id}`, false, this.props.token)
      .then((res)=>{
         
          let result = res.data.data
          if(result.length > 0){
            this.setState({
              checking: false,
              hasPending: true,
              isAvailable: false,
              idOfPendingExam: result[0]._id
            })
          }else{
              this.setState({
                checking: false,
                hasPending: false,
                isAvailable: true
              })
             this.fetchExamType()
          }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }






  componentDidMount(){
   
    this.checkStatus()
  }
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Available Exam</div>
                    <div className='title-action'>
                      <Link to='/learner/exam/list'>
                        <div className='button primary small'>List of Taken Exams</div>
                      </Link>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  
                   
                  
                  {this.state.generating ?
                  
                       <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-spinner'></i>
                          </span>
                          <div className='subtitle-montserrat'>Ginagawa pa ang iyong napiling exam.</div>
                          <div className='context-montserrat'>Maaring mag-antay muna ng ilang minuto.</div>
                        </div>
                      </div>
                    : null
                  }

                  {this.state.checking ? 

                      <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-spinner'></i>
                          </span>
                          <div className='subtitle-montserrat'>Tinitingnan ang status ng iyong Exam</div>
                          <div className='context-montserrat'>Maaring mag-antay muna ng konting minuto.</div>
                        </div>
                      </div>

                  : null}

                  {this.state.hasPending ? 
                    <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-pencil-square'></i>
                          </span>
                          <div className='subtitle-montserrat'>May Exam ka pa na hindi natatapos</div>
                          <div className='context-montserrat'>Pwede mong ipagpatuloy ang iyong exam na hindi pa natatapos. I-click mo lang ang button sa baba.</div>
                           <Link to={{ 
                                    pathname: '/learner/exam/take', 
                                    state: { id: this.state.idOfPendingExam } 
                                  }}>
                            <div className='button primary'>Ipagpatuloy ang iyong Exam.</div>
                          </Link>
                        </div>
                      </div>

                  : null }
                  {this.state.isAvailable && !this.state.generating ? 
                    <Grid.X className='exam-type-container'>
                      {this.state.examType.map((attr, index)=> {
                        return (
                          <Grid.Cell key={index} className='exam-type' large={3} medium={6} small={12}>
                            <div className='container'>
                              <img src={talino} className="exam-img-bg" />
                              <div className='subtitle-montserrat'>{(attr.level ? attr.level.name ? attr.level.name : '' : '') + ' - ' + attr.examType}</div>
                              <div className='context-montserrat'>{attr.examDescription}</div>
                              <div className='line-border'></div>
                              
                              <div className='exam-details'><span>Total No of Questions: </span> {attr.examTotal ? attr.examTotal : '' } </div>
                              <div className='exam-details'><span>Exam Time: </span> {attr.totalHours ? attr.totalHours : '' } </div>
                              <div className='exam-button'>
                                
                                  <button 
                                    type='button' 
                                    className='button secondary small' 
                                    onClick={(e)=> {this.checkIfPassed(attr)}}
                                    >TAKE EXAM
                                  </button>
   

                              </div>
                            </div>
                          </Grid.Cell>
                          )
                      })}
                    </Grid.X>

                  : null}

                </div>
              </Grid.Cell>
              
            </Grid.X>
          </Grid>

          {this.state.hasPassed ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleHasPassed}></span>
                <div className='delete-title text-center'>Naipasa mo na ang exam na ito kaibigan.</div>
                <div className='context-montserrat text-center'>Maari mo ng piliin ang ibang exam</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.toggleHasPassed}>Ok</button>
                </div>
              </div> 
            </div>
        : null}

        {this.state.notEnoughQuestion ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleNotEnoughQuestion}></span>
                <div className='delete-title text-center'>Pasensya kaibigan.</div>
                <div className='context-montserrat text-center'>Kulang ang number ng question para sa exam na ito na nakasave sa database. <br/> Maaring kumuha ka muna ng ibang exam.</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.toggleNotEnoughQuestion}>Ok</button>
                </div>
              </div> 
            </div>
        : null}


        

        {this.state.takeAdaptiveTest ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleTakeAdaptiveTest}></span>
                <div className='delete-title text-center'>Hindi ka pa pwede kaibigan sa Post Test na ito.</div>
                <div className='context-montserrat text-center'>Kailangan mo munang maipasa ang Adaptive Test sa parehong Level bago ka mag test nito</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.toggleTakeAdaptiveTest}>Ok</button>
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
    user: state.user,
    level: state.level
  }
}
const AvailableExam = connect(mapStateToProps)(Layout)
export default AvailableExam