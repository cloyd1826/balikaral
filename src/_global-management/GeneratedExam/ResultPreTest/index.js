import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'


import QuestionAnswered from '../View.QuestionAnswered'

import { withRouter } from 'react-router-dom'

 
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

      learningStrand: [],

      percentagePerLearningStrand: [],

      totalHours: 0
    }
  }
  componentDidMount(){
    
     this.setState({
      generating: false,
      checkingExam: true,
      exam: this.props.location.state.exam,
      lengthOfCorrectAnswer: this.props.location.state.lengthOfCorrectAnswer,
      percentagePerLearningStrand: this.props.location.state.percentagePerLearningStrand,
      examType: this.props.location.state.examType
    })
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
                          <Grid.Cell large={12} medium={12} small={12}>
                            <div className='question-card-loader'>
                              <div className='question-loader-container'>
                                <span>
                                  <i className='la la-commenting'></i>
                                </span>
                                <div className='subtitle-montserrat'>Binabati kita.</div>
                                <div className='context-montserrat'>Naitapos mo ang iyong Pre-Test. Maari mo ng gamiting ang lahat ng prebilehiyo ng isang Learner</div>
                                <Link to='/learner/dashboard'>
                                  <div className='button primary'>Dashboard</div>
                                </Link>
                              </div>
                            </div>
                          </Grid.Cell>
                          <Grid.Cell large={12} medium={12} small={12}>
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
                            </div>
                          
                          </Grid.Cell>
                          <Grid.Cell large={12} medium={12} small={12}>
                            <QuestionAnswered 
                              exam={this.state.exam}
                              checking={true}
                              percentagePerLearningStrand={this.state.percentagePerLearningStrand}
                            />
                            
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
const LayoutWithRouter = connect(mapStateToProps)(Layout)
const ResultPreTest = withRouter(LayoutWithRouter)
export default ResultPreTest