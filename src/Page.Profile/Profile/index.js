import React, {Component} from 'react'

import { Link, withRouter } from 'react-router-dom'

import Grid from '../../_component/Grid'

import apiRequest from '../../_axios'

import { logInUser } from '../../_redux/actions/user'

import { connect } from 'react-redux'

import ProfileImage from '../../_images/vol2.jpeg'


import Form from '../../_component/Form/Form'
import FormMessage from '../../_component/Form/FormMessage'
import Button from '../../_component/Form/Button'

import axios, { put } from 'axios'

import config from '../../_config'

import { bindActionCreators } from 'redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        middleName: '',

        houseNoStreet: '',
        barangay: '',
        city: '',
        province: '',
        zipcode:  '',
        userType:  '',
     
        message: '',
        type: '', 
        active: false,
        buttonDisabled: false,

        image: '',
        imagePreview: '',
      
    }

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.putFile = this.putFile.bind(this)

    this.clearData = this.clearData.bind(this)
  }
  clearData(){
    this.setState({
      image: ''
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
    let user = this.props.user
    this.fetchSingle()
  }


  handleFileChange(e){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      image: files[0],
    })
  }
   handleSubmit(e){
    e.preventDefault()
    this.formMessage('Saving Image', 'loading', true, true)
    this.putFile()
      .then((res)=>{
          this.clearData()
          this.fetchSingle()
          this.formMessage('Image has been updated', 'success', true, false)

          let result = res.data
          let userData = {
            user: {
              id: result.data ? result.data._id ? result.data._id : '' : '',
              email: result.data.local ? result.data.local.email ? result.data.local.email : '' : '',
              firstName: result.data.personalInformation ? result.data.personalInformation.firstName ? result.data.personalInformation.firstName : '' : '' ,
              middleName: result.data.personalInformation ? result.data.personalInformation.middleName ? result.data.personalInformation.middleName : '' :'' ,
              lastName: result.data.personalInformation ? result.data.personalInformation.lastName ? result.data.personalInformation.lastName : '' :'' ,
              image: result.data.personalInformation ? result.data.personalInformation.image ? result.data.personalInformation.image : '' : ''
            },
            token: this.props.token,
            isLoggedIn: true,
            role: result.data.local ? result.data.local.userType ? result.data.local.userType : '' : ''
          }
          this.props.actions.logIn(userData)

      })  
      .catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  putFile(){
    const url = `${config}/balikaral/user/update-profile-picture/${this.props.location.state.id}`
    const formData = new FormData()
   
    formData.append('image', this.state.image)
    formData.append('lastName', this.state.lastName)
    formData.append('firstName', this.state.firstName)
    formData.append('middleName', this.state.middleName)
    formData.append('houseNoStreet', this.state.houseNoStreet)
    formData.append('barangay', this.state.barangay)
    formData.append('city', this.state.city)
    formData.append('province', this.state.province)

    const configPost = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return put(url, formData, configPost)
  } 
  fetchSingle(){
    apiRequest('get', `/user/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                let result = res.data.data
                this.setState({
                    email: result.local ? result.local.email ? result.local.email : '' : '' ,
                    disabled: result.local ? result.local.disabled ? result.local.disabled : '' : '',

                    lastName: (result.personalInformation.lastName ? result.personalInformation.lastName : ''),
                    firstName: (result.personalInformation.firstName ? result.personalInformation.firstName : ''),
                    middleName: (result.personalInformation.middleName ? result.personalInformation.middleName : ''),

                    houseNoStreet: result.personalInformation ? result.personalInformation.houseNoStreet ? result.personalInformation.houseNoStreet : '' : '' ,
                    barangay: result.personalInformation ? result.personalInformation.barangay ? result.personalInformation.barangay : '' : '',
                    city: result.personalInformation ? result.personalInformation.city ? result.personalInformation.city : '' : '',
                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 
                    userType:  result.local ? result.local.userType ? result.local.userType : '' : '',
                    imagePreview: (result.personalInformation ? result.personalInformation.image ? result.personalInformation.image : '' : '')
                })
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }

 
  render() {
  console.log(this.state.image) 
    return (
        <div className='element-container user-profile-container'>
            <div className='user-image'>
              <Form onSubmit={this.handleSubmit}>
                <div className='hero-image' 

                  style={{backgroundImage: 'url(' + (this.state.imagePreview != '' ? `${config}/${this.state.imagePreview}` : ProfileImage ) + ')'}}

                  >
                  <div className='user-image-input'>
                      <div className='icon-camera'>
                        <div>
                          <i className='la la-camera'></i>
                          <div className='change-image'>Change Image</div>
                        </div>
                      </div>
                      <input 
                        required
                        type='file'
                        accept='image/*'
                        onChange={this.handleFileChange}
                        name='image'
                        ref = { ref => this.fileInput = ref }
                        />
                  </div>
                </div>
                {this.state.image != '' ? 
                  <button className='button small' type='submit'>Update Image</button>
                : null}
                
              </Form>
            </div>
            <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>

            <div className='user-information'>
              <div className='info-box'>
                <div className='info-title'>User Information</div>
                <div className='info'><span>Email:</span>{this.state.email} </div> 
                <div className='info'><span>Role:</span>{this.state.userType} </div> 
              </div>
              <div className='info-box'>
                <div className='info-title'>Personal Information</div>
                <div className='info'><span>Name:</span>{this.state.firstName + ' ' + this.state.middleName.substring(0,1) + '. ' + this.state.lastName } </div> 
                <div className='info'><span>Address:</span>
                  {
                    this.state.houseNoStreet + ' ' +
                    this.state.barangay + ' ' +
                    this.state.city + ' ' +
                    this.state.province                
                  }
                </div> 
              </div>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    role: state.role
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions:{
       logIn: bindActionCreators(logInUser, dispatch)
    }
  }
}
const Profile = connect(mapStateToProps, mapDispatchToProps)(Layout)
export default withRouter(Profile)