import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'


import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
     
      discussion: {},

      commentList: [],
      comment: '',

      message: '',
      type: '',
      active: false,
      buttonDisabled: false
      
    }
   
    this.formMessage = this.formMessage.bind(this)
    this.fetchDiscussion = this.fetchDiscussion.bind(this)

    this.fetchComment = this.fetchComment.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleChange = this.handleChange.bind(this)
  }
  
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  fetchDiscussion(){
    apiRequest('get', `/forum/${this.props.location.state.discussionId}`, false, this.props.token)
      .then((res)=>{
        console.log('dis',res.data.data)
        if(res.data){
          this.setState({
            discussion: res.data.data
          })  
        }
        this.fetchComment()
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  fetchComment(){
    apiRequest('get', `/comment/forum/${this.props.location.state.discussionId}`, false, this.props.token)
      .then((res)=>{
        console.log('dis',res.data.data)
        if(res.data){
          this.setState({
            commentList: res.data.data
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    this.fetchDiscussion()
  }
  handleChange(e){
   let name = e.target.name
   let value = e.target.value
   this.setState({
    [name]:value
   })
  }
 handleSubmit(e){
  e.preventDefault()
  let data = {
    forum: this.props.location.state.discussionId,
    user: this.props.user.id,
    dateComment: new Date().toISOString(),
    comment: this.state.comment
  }
  apiRequest('post', '/comment', data, this.props.token)
    .then((res)=>{
        this.fetchComment()
    })  
    .catch((err)=>{

    })
  }
  
  render() { 
    let discussion = this.state.discussion
    let commentList = this.state.commentList
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>

                <div className='discussion-container'>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                  <div className='discussion-title'>
                    {discussion.title ? discussion.title : ''}  
                    <div className='date-created'>{new Date(discussion.datePosted).toLocaleDateString()}</div>
                  </div>
                  <div className='discussion-user'>
                    {
                      discussion.createdBy ? discussion.createdBy.personalInformation ? 
                      (discussion.createdBy.personalInformation.firstName ? discussion.createdBy.personalInformation.firstName : '') 
                      + ' ' + 
                      (discussion.createdBy.personalInformation.middleName ? discussion.createdBy.personalInformation.middleName.substring(0,1) : '')
                      + ' ' + 
                      (discussion.createdBy.personalInformation.lastName ? discussion.createdBy.personalInformation.lastName : '')
                      : '' : ''
                    }
                  </div>
                  <div className='discussion-content'>
                     {
                        discussion.image && discussion.image != '' ?
                        <div className='discussion-image' style={{backgroundImage: `url(${config}/` + discussion.image + ')'}}></div>
                      : null }  
                     
                      <div className='discussion-description'>{discussion.description}</div>
                  </div>
               
                </div>
              </Grid.Cell>


              <Grid.Cell large={12} medium={12} small={12}>
                
                <div className='comment-container'>
                <div className='title-text-container'>
                  <div className='title'>Comment</div>
                </div>
                   <Form 
                    onSubmit={this.handleSubmit}
                    size='small'
                    >
                    <Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <Textarea
                          label='Add Comment'
                          rows={5}
                          name='comment'
                          placeholder='Add Comment'
                          value={this.state.comment}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                        <button type='submit' className='secondary button small'>Add New Comment</button>
                      </Grid.Cell>
                    </Grid.X>
                  </Form>
                </div>
              </Grid.Cell>

              <Grid.Cell large={12} medium={12} small={12}>

                <div className='comment-list'>
                <div className='title-text-container'>
                  <div className='title'>Comment List</div>
                </div>
                  {commentList.map((attr,index)=>{
                    return (
                      <div key={index} className='comment-info-container'>
                        <div className='comment-info'>
                          
                              {
                                attr.user ? attr.user.personalInformation ? 
                                (attr.user.personalInformation.firstName ? attr.user.personalInformation.firstName : '') 
                                + ' ' + 
                                (attr.user.personalInformation.middleName ? attr.user.personalInformation.middleName.substring(0,1) : '')
                                + ' ' + 
                                (attr.user.personalInformation.lastName ? attr.user.personalInformation.lastName : '')
                                : '' : ''
                              }
                            <div className='date-comment'>{new Date(attr.dateComment).toLocaleDateString()}</div>

                        </div>
                        <div className='comment-description'>
                          {attr.comment}
                        </div>
                      </div>
                    )
                  })
                  
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
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel