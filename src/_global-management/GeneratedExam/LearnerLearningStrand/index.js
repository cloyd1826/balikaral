import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import Pagination from '../../../_component/Pagination'


import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      learningStrand: [],
      level: [],

      message: '',
      type: '',
      active: false,

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,
    }
    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)
    this.formMessage = this.formMessage.bind(this)
    this.changePage = this.changePage.bind(this)

  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    this.fetchLearningStrand(page)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchLearningStrand(){
    apiRequest('get', `/learning-strand/fetchAllWithoutPagination?level=${this.props.level}`, false, this.props.token)
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
    const renderLevelName = (levelId) => {
      let level = this.state.level
      let index = level.map((attr)=>{
        return attr._id
      }).indexOf(levelId)
      return level[index].name
    }
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
                  <Grid.X>
                    {this.state.learningStrand.map((attr, index)=>{
                      return(
                        <Grid.Cell key={index} large={3} medium={6} small={12}>
                          <div className='learning-strand-container'>
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
                          </div>
                        </Grid.Cell>
                      )
                    })}    
                  </Grid.X>
              {/*    <div className='table-pagination'>
                      <Pagination
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          nextPage={this.state.nextPage}
                          pageCount={this.state.pageCount}
                          perPage={this.state.perPage}
                          previousPage={this.state.previousPage}
                          totalCount={this.state.totalCount}

                      />
                  </div>*/}

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
    level: state.level
  }
}
const LearnerLearningStrand = connect(mapStateToProps)(Layout)
export default LearnerLearningStrand