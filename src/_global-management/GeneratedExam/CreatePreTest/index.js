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
      examToGenerate: [],
     

      message: '',
      type: '',
      active: false,

      generating: false,
      checking: true,

      hasPending: false,
      isAvailable: false,
      hasPassed: false,
      idOfPendingExam: '',
      notEnoughQuestion: false,
      noPreTestAvailable: false,

      preTest: {},
    }
    this.formMessage = this.formMessage.bind(this)

    this.generateExam = this.generateExam.bind(this)
    this.postExam = this.postExam.bind(this)

    this.checkStatus = this.checkStatus.bind(this)

    this.toggleModal = this.toggleModal.bind(this)

    this.fetchRandomPreTest = this.fetchRandomPreTest.bind(this)

    this.addToExam = this.addToExam.bind(this)
  }
  toggleModal(){
    this.setState({
      hasPassed: (this.state.hasPassed ? false : true)
    })
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  fetchRandomPreTest(){
    this.setState({
      generating: true,
      isAvailable: false
    })
    apiRequest('get', `/exam-management/fetch-random-pre-test?level=${this.props.level}`, false, this.props.token)
      .then((res)=>{
        if(res.status === 'No pre test available for your level'){
          this.setState({
            generating: false,
            notEnoughQuestion: false,
            noPreTestAvailable: true,
          })
        }else{
          this.setState({
            examType: res.data.preTest
          })

          this.generateExam(res.data.preTest)
        }
      })
      .catch((err)=>{

      })
  }
  addToExam(learningStrand, total, post, count){
    if(learningStrand){
       apiRequest('get', `/exam-management/generate-exam?level=${this.props.level}&learningStrand=${learningStrand}&total=${total}`, false, this.props.token)
      .then((res)=>{
        let examToGenerate = this.state.examToGenerate
       
        res.data.exam.map((attr)=>{
          examToGenerate = [...examToGenerate, { question: attr._id, answer: ''}]
        })
        this.setState({
          examToGenerate: examToGenerate,
        })
        if(post && parseInt(examToGenerate.length) === parseInt(count)){
          this.postExam(examToGenerate, this.state.examType)
        }
        if(post && parseInt(examToGenerate.length) !== parseInt(count)){
          this.generateExam(this.state.preTest)
          this.setState({
            easy: [],
            average: [],
            difficult: [],
            isAvailable: true,
            generating: false,
            preTest: {}
          })
        }
      })
      .catch((err)=>{

      })
    }
   
  }
  generateExam(data){
    let learningStrandQuestion = data.learningStrandQuestions
    let count = 0
    learningStrandQuestion.map((attr)=>{
      console.log(attr)
      count = count + parseInt(attr.total) 
    })
    learningStrandQuestion.map((attr, index)=>{
      if(index === learningStrandQuestion.length - 1){
        this.addToExam(attr.learningStrand, attr.total, true, count)
      }else{
        this.addToExam(attr.learningStrand, attr.total, false, count)
      }
    })
  }

  postExam(exam, type){
    let data = {
      examType: type._id,
      exam: exam,
      examiner: this.props.user.id,
      type: 'Pre Test',
      status: 'Pending',
      timeRemaining: type.totalHours,
      dateStarted: Date.now(),
      level: this.props.level
    }
    console.log('d', data)
    apiRequest('post', `/generated-exam?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        
          this.props.history.push({
            pathname: '/learner-start/pre-test/take',
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
                    <div className='title'>Pre Test</div>
                    
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  
                   
                  
                  {this.state.generating ?
                  
                      <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-spinner'></i>
                          </span>
                          <div className='subtitle-montserrat'>Ginagawa pa ang Pre-Test.</div>
                          <div className='context-montserrat'>Maaring mag-antay muna ng konting minuto.</div>
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
                                    pathname: '/learner-start/pre-test/take', 
                                    state: { id: this.state.idOfPendingExam } 
                                  }}>
                            <div className='button primary'>Ipagpatuloy ang iyong Exam.</div>
                          </Link>
                        </div>
                      </div>

                  : null }

                  {this.state.notEnoughQuestion ? 
                    <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-frown-o'></i>
                          </span>
                          <div className='subtitle-montserrat'>Pasensya Kaibigan</div>
                          <div className='context-montserrat'>Kulang ang number ng question para sa exam na ito na nakasave sa database.</div>
                            <Link to='/learner-start/dashboard'>
                              <div className='button primary'>Ok</div>
                            </Link>
                        </div>
                      </div>

                  : null }

                  {this.state.noPreTestAvailable ? 
                    <div className='exam-type-loader'>
                        <div>
                          <span>
                            <i className='la la-frown-o'></i>
                          </span>
                          <div className='subtitle-montserrat'>Pasensya Kaibigan</div>
                          <div className='context-montserrat'>Walang Pre Test na available sa iyong level</div>
                            <Link to='/learner-start/dashboard'>
                              <div className='button primary'>Ok</div>
                            </Link>
                        </div>
                      </div>

                  : null }

                  

                  {this.state.isAvailable ? 
                   <div className='exam-type-loader'>
                      <div>
                        <span>
                          <i className='la la-file-text-o'></i>
                        </span>
                        <div className='subtitle-montserrat'>Kumuha ng Pre-Test</div>
                        <div className='context-montserrat'>
                          Isang beses ka lang pwede kumuha ng Pre-Test. <br /> 
                          Alam kong matapang ka at hindi umuurong sa laban ng buhay. <br/>
                          Dugong Pinoy ka eh! <br/>
                          Kaya i-click mo na ang button sa baba. GO!
                        </div>
                       
                          <div className='button primary' onClick={this.fetchRandomPreTest}>Simulan ang Pre-Test</div>
                       
                      </div>
                    </div>

                  : null}

                </div>
              </Grid.Cell>
              
            </Grid.X>
          </Grid>

          {this.state.hasPassed ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleModal}></span>
                <div className='delete-title text-center'>Naipasa mo na ang exam na ito kaibigan.</div>
                <div className='context-montserrat text-center'>Maari mo ng piliin ang ibang exam</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.toggleModal}>Ok</button>
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