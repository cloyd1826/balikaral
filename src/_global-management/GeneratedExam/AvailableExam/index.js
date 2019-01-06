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
      examType: [],

      message: '',
      type: '',
      active: false,

      generating: false,
      checking: true,

      hasPending: false,
      isAvailable: false,
      hasPassed: false,
    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.generateExam = this.generateExam.bind(this)
    this.postExam = this.postExam.bind(this)

    this.checkStatus = this.checkStatus.bind(this)

    this.toggleHasPassed = this.toggleHasPassed.bind(this)
    this.toggleTakeAdaptiveTest = this.toggleTakeAdaptiveTest.bind(this)
  }
  toggleHasPassed(){
    this.setState({
      hasPassed: (this.state.hasPassed ? false : true),
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
    apiRequest('get', `/exam-type-management/all?hidePreTest=true`, false, this.props.token)
      .then((res)=>{
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

  generateExam(id, level, type){
    this.setState({
      generating: true
    })
    
    apiRequest('get', `/exam-management/random?examId=${id}&type=${type}&examinerId=${this.props.user.id}&level=${level}`, false, this.props.token)
      .then((res)=>{
        
        if(res.data){
          let result = res.data

          if(result.status === 'Passed'){
            this.setState({
              generating: false,
              hasPassed: true,
            })
          }else if(result.status === 'Take Adaptive Test'){
            this.setState({
              generating: false,
              takeAdaptiveTest: true,
            })
          }else if(result.status === 'Taking'){

            let examList = []
            let easyExam = []
            let mediumExam = []
            let hardExam = []

            result.easy.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              easyExam = [...easyExam, data]
            })
            result.medium.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              mediumExam = [...mediumExam, data]
            })
            result.hard.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              hardExam = [...hardExam, data]

            })

            examList = [...examList, ...easyExam, ...mediumExam, ...hardExam ]
              
            this.postExam(examList, id, type)
          }
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
        this.setState({
          generateExam: false,
        })
      })
  }

  postExam(exam, id, type){

    let data = {
      examType: id,
      exam: exam,
      examiner: this.props.user.id,
      type: type,
      status: 'Pending',
      dateStarted: Date.now()
    }

    apiRequest('post', `/generated-exam`, data, this.props.token)
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
                          <Grid.Cell key={index} className='exam-type' large={4} medium={6} small={12}>
                            <div className='container'>
                              <div className='subtitle-montserrat'>{(attr.level ? attr.level.name ? attr.level.name : '' : '') + ' - ' + attr.examType}</div>
                              <div className='context-montserrat'>{attr.examDescription}</div>
                              <div className='line-border'></div>
                              <div className='exam-details'><span>Easy: </span> {attr.easy ? attr.easy : '' } </div>
                              <div className='exam-details'><span>Medium: </span> {attr.medium ? attr.medium : '' } </div>
                              <div className='exam-details'><span>Hard: </span> { attr.hard ? attr.hard : '' } </div>
                              <div className='exam-details'><span>Total No of Questions: </span> {attr.examTotal ? attr.examTotal : '' } </div>
                              <div className='exam-details'><span>Exam Time: </span> {attr.totalHours ? attr.totalHours : '' } </div>
                              <div className='exam-button'>
                                
                                  <button 
                                    type='button' 
                                    className='button primary small' 
                                    onClick={(e)=> {this.generateExam(attr._id, attr.level._id, attr.examType)}}
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
                <span className='close-button la la-close' onClick={this.toggleHasPassed}></span>
                <div className='delete-title text-center'>Naipasa mo na ang exam na ito kaibigan.</div>
                <div className='context-montserrat text-center'>Maari mo ng piliin ang ibang exam</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.toggleHasPassed}>Ok</button>
                </div>
              </div> 
            </div>
        : null}
        {this.state.takeAdaptiveTest ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-close' onClick={this.toggleTakeAdaptiveTest}></span>
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
    user: state.user
  }
}
const AvailableExam = connect(mapStateToProps)(Layout)
export default AvailableExam