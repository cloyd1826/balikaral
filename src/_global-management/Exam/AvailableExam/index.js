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
    }
    this.fetchExamType = this.fetchExamType.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.generateExam = this.generateExam.bind(this)
    this.postExam = this.postExam.bind(this)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  fetchExamType(){
    apiRequest('get', `/exam-type-management/all`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            examType: res.data.data
          })  
        }
      })
      .catch((err)=>{
        console.log(err)
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }

  generateExam(id, learningStrand){
    this.setState({
      generating: true
    })
    apiRequest('get', `/exam-management/random?examId=${id}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          let result = res.data
          console.log(res.data)
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
            
          this.postExam(examList, learningStrand, id)
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
        this.setState({
          generateExam: false
        })
      })
  }

  postExam(exam, learningStrand, id){

    let data = {
      learningStrand: '',
      examType: id,
      learningStrand: learningStrand,
      exam: exam,
      examiner: this.props.user.id,
      status: 'Pending',
      dateStarted: Date.now()
    }

    apiRequest('post', `/generated-exam`, data, this.props.token)
      .then((res)=>{
          console.log(res)
          this.props.history.push({
            pathname: '/learner/exam/take',
            state: { id: res.data.data._id }
          })
      })
      .catch((err)=>{
        console.log(err)
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
                    <div className='title'>Available Exam</div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  
                   {!this.state.generating ?
                    <Grid.X className='exam-type-container'>
                      {this.state.examType.map((attr, index)=> {
                        return (
                          <Grid.Cell key={index} className='exam-type' large={4} medium={6} small={12}>
                            <div className='container'>
                              <div className='subtitle-montserrat'>{(attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : '') + ' - ' + attr.examType}</div>
                              <div className='context-montserrat'>{attr.examDescription}</div>
                              <div className='line-border'></div>
                              <div className='exam-details'><span>Easy: </span> {attr.difficulty ? attr.difficulty.easy ? attr.difficulty.easy : '' : '' } </div>
                              <div className='exam-details'><span>Medium: </span> {attr.difficulty ? attr.difficulty.medium ? attr.difficulty.medium : '' : '' } </div>
                              <div className='exam-details'><span>Hard: </span> {attr.difficulty ? attr.difficulty.hard ? attr.difficulty.hard : '' : '' } </div>
                              <div className='exam-details'><span>Total No of Questions: </span> {attr.examTotal ? attr.examTotal : '' } </div>
                              <div className='exam-details'><span>Passing Rate: </span> {attr.passingRate ? attr.passingRate : '' } </div>
                              <div className='exam-details'><span>Exam Time: </span> {attr.totalHours ? attr.totalHours : '' } </div>
                              <div className='exam-button'>
                                
                                  <button 
                                    type='button' 
                                    className='button primary small' 
                                    onClick={(e)=> {this.generateExam(attr._id, attr.learningStrand._id)}}
                                    >TAKE EXAM
                                  </button>
   

                              </div>
                            </div>
                          </Grid.Cell>
                          )
                      })}
                    </Grid.X>
                  :
                      <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-spinner'></i>
                          </span>
                          <div className='subtitle-montserrat'>Generating Exam</div>
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
const AvailableExam = connect(mapStateToProps)(Layout)
export default AvailableExam