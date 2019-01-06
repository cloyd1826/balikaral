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
      learningStrand: [],

      message: '',
      type: '',
      active: false,
    }
    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)
    this.formMessage = this.formMessage.bind(this)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchLearningStrand(){
    apiRequest('get', '/learning-strand/all', false, this.props.token)
      .then((res)=>{
      
        if(res.data){
          this.setState({
            learningStrand: res.data.data
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
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
                    <div className='title'>Exercise Exam</div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <Grid.X className='learning-strand-container'>
                    {this.state.learningStrand.map((attr, index)=>{
                      return(
                        <Grid.Cell key={index} large={3} medium={6} small={12}>
                         <Link to={{ 
                            pathname: '/learner/exam/exercise', 
                            state: { id: attr._id, learningStrand: attr.name } 
                          }}>
                            <div className='learning-strand'>
                              <i className='la la-file-text' />
                              {attr.name}
                              <div className='level'>{attr.level ? attr.level.name ? attr.level.name : '' : ''}</div>
                            </div>
                          </Link>
                        </Grid.Cell>
                      )
                    })}    
                  </Grid.X>


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
    token: state.token
  }
}
const LearnerLearningStrand = connect(mapStateToProps)(Layout)
export default LearnerLearningStrand