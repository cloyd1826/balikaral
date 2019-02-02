import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ImageLoader from '../../../_component/ImageLoader'
import FormMessage from '../../../_component/Form/FormMessage'
import Pagination from '../../../_component/Pagination'



import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import moment from 'moment'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      forum: [],

      message: '',
      type: '',
      active: false,

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,

      deleteActive: false,
      link: ''
    }
    this.fetchSubject = this.fetchSubject.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)

  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    this.fetchSubject(page)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      let page = this.state.currentPage
   
      this.fetchSubject(page)
    }else{
      this.setState({
        deleteActive: true,
        link: link
      })
    }
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchSubject(page){
    apiRequest('get', `/forum/discussions/${this.props.location.state.id}?page=${page}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            forum: res.data.data,
            currentPage: res.data.currentPage,
            nextPage: res.data.nextPage,
            pageCount: res.data.pageCount,
            perPage: res.data.perPage,
            previousPage: res.data.previousPage,
            totalCount: res.data.totalCount,
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    if(this.props.location.state){
      this.fetchSubject(1)
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
                <div className='forum-dashboard element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Discussions</div>
                    <div className='title-action'>
                      <Link to={{ 
                              pathname: (
                                (this.props.role === 'Administrator' ? '/admin' : '') + 
                                (this.props.role === 'Teacher' ? '/teacher' : '') +
                                (this.props.role === 'Learner' ? '/learner' : '') +
                                 '/forum/discussions/add'), 
                              state: { id: this.props.location.state.id } 
                                }}>
                        <div className='button small primary' >Add Discussion</div>
                      </Link>
                    </div>
                  </div>
                  { this.state.forum.map((attr, index)=>{
                    return (
                      <div key={index}>
                        <Link to={{ 
                              pathname:  
                                (
                                (this.props.role === 'Administrator' ? '/admin' : '') + 
                                (this.props.role === 'Teacher' ? '/teacher' : '') +
                                (this.props.role === 'Learner' ? '/learner' : '') + 
                                '/forum/discussions/view'), 
                              state: { id: this.props.location.state.id, discussionId: attr._id } 
                                }}>
                          <div className='forum-dashboard-container-discussion'>
                            <div className='forum-name'>{attr.title} 
                              <div className='forum-user'>
                                <ImageLoader className='image' image={attr.createdBy ? attr.createdBy.personalInformation ? attr.createdBy.personalInformation.image ? attr.createdBy.personalInformation.image : '' : '' : '' }/>
                                <div className='name'>
                                  {attr.createdBy ? attr.createdBy.personalInformation ? 
                                  (attr.createdBy.personalInformation.firstName ? attr.createdBy.personalInformation.firstName : '') 
                                  + ' ' + 
                                  (attr.createdBy.personalInformation.middleName ? attr.createdBy.personalInformation.middleName.substring(0,1) : '')
                                  + ' ' + 
                                  (attr.createdBy.personalInformation.lastName ? attr.createdBy.personalInformation.lastName : '')
                                  : '' : ''}
                                 
                                </div>
                                <div className='role'>
                                  {attr.createdBy ? attr.createdBy.google ? attr.createdBy.google.userType ? attr.createdBy.google.userType : '' : '' : '' }
                                  {attr.createdBy ? attr.createdBy.facebook ? attr.createdBy.facebook.userType ? attr.createdBy.facebook.userType : '' : '' : '' }
                                  {attr.createdBy ? attr.createdBy.local ? attr.createdBy.local.userType ? attr.createdBy.local.userType : '' : '' : '' }
                                </div>
                              </div>

                              <div className='date-created'>{moment(attr.datePosted).format('MMMM DD, YYYY')}</div>
                            </div>
                            
                            <div className='forum-content'>
                               {
                                  attr.image && attr.image !== '' ?
                                  <ImageLoader className='forum-image' image={attr.image} />
                                : null }  
                               
                                <div className='forum-description'>{attr.description}</div>
                            </div>

                           


                          </div>
                        </Link>
                      </div>
                      )
                  })}
                    <div className='forum-pagination'>
                      <Pagination
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          nextPage={this.state.nextPage}
                          pageCount={this.state.pageCount}
                          perPage={this.state.perPage}
                          previousPage={this.state.previousPage}
                          totalCount={this.state.totalCount}

                      />
                  </div>
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
    role: state.role
  }
}
const ListLearningStrand = connect(mapStateToProps)(Layout)
export default ListLearningStrand