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
      idOfPendingExam: '',
      notEnoughQuestion: false,
    }
    this.formMessage = this.formMessage.bind(this)

    this.generateExam = this.generateExam.bind(this)
    this.postExam = this.postExam.bind(this)

    this.checkStatus = this.checkStatus.bind(this)

    this.toggleModal = this.toggleModal.bind(this)
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
  generateExam(){
    this.setState({
      generating: true
    })
    
    apiRequest('get', `/exam-management/pre-test`, false, this.props.token)
      .then((res)=>{
     
        if(res.data){
          let result = res.data
          
          if(result.status === 'Not Enough Number of Question'){
            this.setState({
              generating: false,
              notEnoughQuestion: true,
            })

          }else{
            let examList = []
            let easyExam = []
            let averageExam = []
            let difficultExam = []

            result.easy.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              easyExam = [...easyExam, data]
            })
            result.average.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              averageExam = [...averageExam, data]
            })
            result.difficult.map((attr)=>{
              let data = {
                answer: '',
                question: ''
              }
              data = {...data, question: attr._id}
              difficultExam = [...difficultExam, data]

            })

            examList = [...examList, ...easyExam, ...averageExam, ...difficultExam ]
          
            this.postExam(examList, result.examType)
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

  postExam(exam, type){
    let data = {
      examType: type._id,
      exam: exam,
      examiner: this.props.user.id,
      type: 'Pre Test',
      status: 'Pending',
      timeRemaining: type.totalHours,
      dateStarted: Date.now()
    }
    apiRequest('post', `/generated-exam`, data, this.props.token)
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
                       
                          <div className='button primary' onClick={this.generateExam}>Simulan ang Pre-Test</div>
                       
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
    user: state.user
  }
}
const AvailableExam = connect(mapStateToProps)(Layout)
export default AvailableExam