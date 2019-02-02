import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import Select from '../../../../_component/Form/Select'
import FileInput from '../../../../_component/Form/FileInput'
import Textarea from '../../../../_component/Form/Textarea'
import Button from '../../../../_component/Form/Button'

import config from '../../../../_config'
import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import {put} from 'axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        title: '',
        instructionFor: '',
        image: '',
        imageText: '',
        description: '',

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)
    this.putFile = this.putFile.bind(this)

    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleFileChange(e){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      [name]: files[0],
      instructionImage: e.target.value.replace('C:\\fakepath\\', '')
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

  componentDidMount(){
    
    if(this.props.location.state){
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
  }
  fetchSingle(){
    apiRequest('get', `/site-instruction/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                this.setState({
                    title: res.data.data.title,
                    description: res.data.data.description,
                    instructionFor: res.data.data.instructionFor,
                    instructionImage: res.data.data.image,
                })
            }
            
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
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
    this.formMessage('Updating Data...', 'loading', true, true)
    
    this.putFile()
        .then((res)=>{
          
          this.formMessage('Data has been updated', 'success', true, false)
      })    
        .catch((err)=>{
          
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  putFile(){
    const url = `${config}/balikaral/site-instruction/update/${this.props.location.state.id}?userId=${this.props.user.id}`
    const formData = new FormData()
   
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('instructionFor', this.state.instructionFor)

    if(this.state.image !== ''){
      formData.append('image', this.state.image )
    }else{
      formData.append('imageText', this.state.instructionImage )
    }

    const configPost = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return put(url, formData, configPost)
  } 
  render() { 
    return (
        <div>
            <Grid fluid>
                <Grid.X>
                    <Grid.Cell large={12}  medium={12} small={12}>
                        <div className='element-container '>
                            <div className='title-text-container  hide-on-large-x'>
                                <div className='title'>Level Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/level/list'>
                                        <div className='button primary small'>List of Levels</div>
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
                                    required 
                                    type='text' 
                                    label='Title' 
                                    placeholder='Title' 
                                    name='title' 
                                    value={this.state.title} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={6} medium={12} small={12}>
                                  <Select 
                                    required 
                                    type='text' 
                                    label='Instruction For:' 
                                    placeholder='Instruction For:' 
                                    name='instructionFor' 
                                    value={this.state.instructionFor} 
                                    onChange={this.handleChange}>
                                    <option value=''></option>
                                    <option value='Student'>Student</option>
                                    <option value='Teacher'>Teacher</option>
                                  </Select>
                                </Grid.Cell>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Textarea
                                    label='Description' 
                                    placeholder='Description' 
                                    name='description' 
                                    value={this.state.description} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                 <Grid.Cell large={6} medium={12} small={12}>
                                  <FileInput 
                                    type='file'
                                    label='Image'
                                    name='image'
                                    fileName={this.state.instructionImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'instructionImage' )}/>
                                </Grid.Cell>
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/management/level/list'>
                                        <Button type='button' text='Return' className='cancel small'/>
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
    user: state.user
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel