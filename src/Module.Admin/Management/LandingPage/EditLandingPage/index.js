import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import FileInput from '../../../../_component/Form/FileInput'
import Select from '../../../../_component/Form/Select'
import Textarea from '../../../../_component/Form/Textarea'
import Button from '../../../../_component/Form/Button'

import apiRequest from '../../../../_axios'

import config from '../../../../_config'

import { connect } from 'react-redux'

import axios, { put } from 'axios'

import SelectLevel from '../../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../../_special-form/SelectLearningStrand'
import SelectSubject from '../../../../_special-form/SelectSubject'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        siteLogo: '',
        pageLogo: '',
        tungkolSaProgramaLogo: '',
        siteLogoName: '',
        pageLogoName: '',
        tungkolSaProgramaLogoName: '',
        pageDescription: '',
        tungkolSaProgramaDescription: '',
        email: '',
        contactNumber: '',
        facebook: '',
        twitter: '',
        instagram: '',
        medium: '',
        google: '',
        activeLandingPage: '',
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.previewExam = this.previewExam.bind(this)

    this.putFile = this.putFile.bind(this)


  this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleLearningStrandChange = this.handleLearningStrandChange.bind(this)
  }
  handleLevelChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrand: '',
      learningStrandSub: '',
    })
  }
  handleLearningStrandChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrandSub: '',
    })
  }
  previewExam(){
    if(this.state.preview){
      this.setState({
        preview: false
      })
    }else{
      this.setState({
        preview: true
      })
    }
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
    apiRequest('get', `/landing-page/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
               
                this.setState({
                    siteLogoName: result.logo,
                    pageLogoName: result.pageLogo,
                    tungkolSaProgramaLogoName: result.tungkolSaProgramaLogo,
                    pageDescription: result.pageDescription,
                    tungkolSaProgramaDescription: result.tungkolSaProgramaDescription,
                    email: result.email,
                    contactNumber: result.contact,
                    facebook: result.facebook,
                    twitter: result.twitter,
                    instagram: result.instagram,
                    medium: result.medium,
                    google: result.google,
                    active: result.active
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
  handleFileChange(e, imageName){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      [name]: files[0],
      [imageName]: e.target.value.replace('C:\\fakepath\\', '')
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Updating Data...', 'loading', true, true)
    this.putFile()
        .then((res)=>{
          this.formMessage('Data has been updated', 'success', true, false)
          this.fetchSingle()
      })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  putFile(){
    const url = `${config}/balikaral/landing-page/update/${this.props.location.state.id}`
    const formData = new FormData()

    formData.append('pageDescription', this.state.pageDescription)
    formData.append('tungkolSaProgramaDescription', this.state.tungkolSaProgramaDescription)
    formData.append('email', this.state.email)
    formData.append('contact', this.state.contactNumber)
    formData.append('facebook', this.state.facebook)
    formData.append('twitter', this.state.twitter)
    formData.append('instagram', this.state.instagram)
    formData.append('medium', this.state.medium)
    formData.append('google', this.state.google)
    formData.append('active', this.state.activeLandingPage)


    if(this.state.siteLogo !== ''){
      formData.append('logo', this.state.siteLogo )
    }
    if(this.state.pageLogo !== ''){
      formData.append('pageLogo', this.state.pageLogo )
    }
    if(this.state.tungkolSaProgramaLogo !== ''){
      formData.append('tungkolSaProgramaLogo', this.state.tungkolSaProgramaLogo )
    }

    const configPut = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return put(url, formData, configPut)
  }
  render() { 
    return (
        <div>
            <Grid fluid>
                <Grid.X>
                    <Grid.Cell large={12}  medium={12} small={12}>
                        <div className='element-container'>
                            <div className='title-text-container'>
                                <div className='title'>Landing Page > Edit</div>
                                <div className='title-action'>
                                    
                                    <Link to='/admin/management/landing-page/list/'>
                                        <div className='button primary small'>List of Landing Page</div>
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

                                  <Grid.Cell large={4} medium={12} small={12}>
                                    <Select
                                      name='activeLandingPage'
                                      label='Active'
                                      value={this.state.activeLandingPage}
                                      onChange={this.handleChange}
                                      required
                                    >
                                      <option value=''></option>
                                      <option value={true}>Active</option>
                                      <option value={false}>Inactive</option>
                                    </Select>
                                  </Grid.Cell>
                                  <Grid.Cell large={8} medium={12} small={12}></Grid.Cell>

                                <Grid.Cell large={4} medium={12} small={12}>
                                  <FileInput 
                                      type='file'
                                      label='Site Logo'
                                      name='siteLogo'
                                      fileName={this.state.siteLogoName}
                                      accept="image/*"
                                      refProps={ref => this.fileInput = ref}
                                      onChange={(e)=> this.handleFileChange(e, 'siteLogoName' )}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <FileInput 
                                      type='file'
                                      label='Page Logo'
                                      name='pageLogo'
                                      fileName={this.state.pageLogoName}
                                      accept="image/*"
                                      refProps={ref => this.fileInput = ref}
                                      onChange={(e)=> this.handleFileChange(e, 'pageLogoName' )}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <FileInput 
                                      type='file'
                                      label='Tungkol sa Programa Logo'
                                      name='tungkolSaProgramaLogo'
                                      fileName={this.state.tungkolSaProgramaLogoName}
                                      accept="image/*"
                                      refProps={ref => this.fileInput = ref}
                                      onChange={(e)=> this.handleFileChange(e, 'tungkolSaProgramaLogoName' )}/>
                                </Grid.Cell>


                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Textarea 
                                    required 
                                    type='text' 
                                    label='Page Description' 
                                    placeholder='Page Description' 
                                    name='pageDescription' 
                                    value={this.state.pageDescription} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Textarea 
                                    required 
                                    type='text' 
                                    label='Tungkol sa Programa Description' 
                                    placeholder='Tungkol sa Programa Description' 
                                    name='tungkolSaProgramaDescription' 
                                    value={this.state.tungkolSaProgramaDescription} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>

                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='email' 
                                    label='Email Address' 
                                    placeholder='Email Address' 
                                    name='email' 
                                    value={this.state.email} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Contact Number' 
                                    placeholder='Contact Number' 
                                    name='contactNumber' 
                                    value={this.state.contactNumber} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>


                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Facebook' 
                                    placeholder='Facebook' 
                                    name='facebook' 
                                    value={this.state.facebook} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Twitter' 
                                    placeholder='Twitter' 
                                    name='twitter' 
                                    value={this.state.twitter} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Instagram' 
                                    placeholder='Instagram' 
                                    name='instagram' 
                                    value={this.state.instagram} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Medium' 
                                    placeholder='Medium' 
                                    name='medium' 
                                    value={this.state.medium} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Input
                                    type='text' 
                                    label='Google' 
                                    placeholder='Google' 
                                    name='google' 
                                    value={this.state.google} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>  

                               

                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/management/landing-page/list/'>
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