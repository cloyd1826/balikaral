import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import FileInput from '../../../_component/Form/FileInput'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import Table from '../../../_component/Table'


import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'


import axios, { post } from 'axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
     
      title: '',
      description: '',


      message: '',
      type: '',
      active: false,
      buttonDisabled: false,

      discussionImage: '',
      image: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)

 
    this.clearData = this.clearData.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.postFile = this.postFile.bind(this)
  }
  handleFileChange(e){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      [name]: files[0],
      discussionImage: e.target.value.replace('C:\\fakepath\\', '')
    })
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  clearData(){
    this.setState({
        title: '',
      	description: '',
    })
  }


  handleChange(e){
    let name = e.target.name
    let value = e.target.value

    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Saving Data', 'loading', true, true)
 
    this.postFile()
      .then((res)=>{
          this.clearData()
          this.formMessage('Data has been saved', 'success', true, false)
      })  
      .catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  postFile(){
    const url = `${config}/balikaral/forum/`
    const formData = new FormData()
   
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('datePosted', new Date().toISOString())
    formData.append('createdBy', this.props.user.id)
    formData.append('forum', this.props.location.state.id)

    if(this.state.image != ''){
      formData.append('image', this.state.image )
    }

    const configPost = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, configPost)
  } 
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Add New Discussion</div>
                    <div className='title-action'>
                      <Link to={{ 
                              pathname: (
                                (this.props.role === 'Administrator' ? '/admin' : '') + 
                                (this.props.role === 'Teacher' ? '/teacher' : '') +
                                (this.props.role === 'Learner' ? '/learner' : '') +
                                 '/forum/discussions/list'), 
                              state: { id: this.props.location.state.id } 
                                }}>
                        <div className='button primary small'>List of Forum</div>
                      </Link>
                    </div>
                  </div>
                  <Form 
                    onSubmit={this.handleSubmit}
                    >
                    <Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                      </Grid.Cell>

                      
                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input
                          label='Title'
                          name='title'
                          required
                          placeholder='Title'
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                       <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Discussion'
                          name='image'
                          fileName={this.state.discussionImage}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'discussionImage' )}/>
                      </Grid.Cell>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <Textarea
                          label='Description'
                          name='description'
                          placeholder='Description'
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                        <Button type='submit' disabled={this.state.buttonDisabled} text='Save' className='secondary small' />
                        <Link to={{ 
                              pathname: (
                                (this.props.role === 'Administrator' ? '/admin' : '') + 
                                (this.props.role === 'Teacher' ? '/teacher' : '') +
                                (this.props.role === 'Learner' ? '/learner' : '') +
                                 '/forum/discussions/list'), 
                              state: { id: this.props.location.state.id } 
                                }}>
                         <Button disabled={this.state.buttonDisabled} type='button' text='Return' className='cancel small'/>
                        </Link>
                      </Grid.Cell>
                    </Grid.X>
                  </Form>
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