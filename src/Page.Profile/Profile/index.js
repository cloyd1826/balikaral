import React, {Component} from 'react'

import { Link, withRouter } from 'react-router-dom'

import Grid from '../../_component/Grid'
import ImageLoader from '../../_component/ImageLoader'

import apiRequest from '../../_axios'

import { logInUser } from '../../_redux/actions/user'

import { connect } from 'react-redux'


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

        civilStatus: '',
        birthday: '',

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
      
        lastGradeLevelCompleted: '',
        reasonDropOut: '',
        attendedAlsLessonBefore: '',
        completedProgram: '',
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
    if(this.props.location.state){
      let user = this.props.user
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
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
          console.log(result)
          let userData = {
            user: {
              id: result.data ? result.data._id ? result.data._id : '' : '',
              email: result.data.local ? result.data.local.email ? result.data.local.email : '' : '',
              firstName: result.data.personalInformation ? result.data.personalInformation.firstName ? result.data.personalInformation.firstName : '' : '' ,
              middleName: result.data.personalInformation ? result.data.personalInformation.middleName ? result.data.personalInformation.middleName : '' :'' ,
              lastName: result.data.personalInformation ? result.data.personalInformation.lastName ? result.data.personalInformation.lastName : '' :'' ,
              image: result.data.personalInformation ? result.data.personalInformation.image ? result.data.personalInformation.image : '' : '',
            },
            token: this.props.token,
            isLoggedIn: true,
            role: this.props.role,
            hadPreTest: this.props.hadPreTest,
            type: 'local'
          }
          this.props.actions.logIn(userData)

      })  
      .catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  putFile(){
    const url = `${config}/balikaral/user/update-profile-picture/${this.props.location.state.id}?userId=${this.props.user.id}`
    const formData = new FormData()
   
    formData.append('image', this.state.image)
    formData.append('lastName', this.state.lastName)
    formData.append('firstName', this.state.firstName)
    formData.append('middleName', this.state.middleName)
    formData.append('houseNoStreet', this.state.houseNoStreet)
    formData.append('barangay', this.state.barangay)
    formData.append('city', this.state.city)
    formData.append('province', this.state.province)
    formData.append('civilStatus', this.state.civilStatus)
    formData.append('birthday', this.state.birthday)

    formData.append('learningCenter', this.state.learningCenter)
    formData.append('gradeLevel', this.state.gradeLevel)
    formData.append('reasongForStopping', this.state.reasongForStopping)
    formData.append('lifeStatus', this.state.lifeStatus)
    formData.append('gender', this.state.gender)
    formData.append('about', this.state.about)

    formData.append('lastGradeLevelCompleted', this.state.lastGradeLevelCompleted)
    formData.append('reasonDropOut', this.state.reasonDropOut)
    formData.append('attendedAlsLessonBefore', this.state.attendedAlsLessonBefore)
    formData.append('completedProgram', this.state.completedProgram)

    formData.append('yearsInAls', this.state.yearsInAls)
    formData.append('registeredExaminee', this.state.registeredExaminee)
    formData.append('occupation', this.state.occupation)
    formData.append('letPasser', this.state.letPasser)
    formData.append('noOfYearsTeaching', this.state.noOfYearsTeaching)
    formData.append('noOfYearsAsAlsTeacher', this.state.noOfYearsAsAlsTeacher)
    formData.append('subjectExpertise', this.state.subjectExpertise)


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
            
            if(res.data){
                let result = res.data.data
                let local = result.local
                let google = result.google
                let facebook = result.facebook
                
                this.setState({
                  email: (result.local ? result.local.email ? result.local.email : '' : '') + (result.google ? result.google.email ? result.google.email : '' : '') + (result.facebook ? result.facebook.email ? result.facebook.email : '' : '')  ,
                  disabled: result.local ? result.local.disabled ? result.local.disabled : '' : '',

                  lastName: (result.personalInformation ? result.personalInformation.lastName ? result.personalInformation.lastName : '' : ''),
                  firstName: (result.personalInformation ? result.personalInformation.firstName ? result.personalInformation.firstName : '' : ''),
                  middleName: (result.personalInformation ? result.personalInformation.middleName ? result.personalInformation.middleName : '' : ''),

                  houseNoStreet: result.personalInformation ? result.personalInformation ? result.personalInformation.houseNoStreet ? result.personalInformation.houseNoStreet : '' : '' : '',
                  barangay: result.personalInformation ? result.personalInformation ? result.personalInformation.barangay ? result.personalInformation.barangay : '' : '' : '',
                  city: result.personalInformation ? result.personalInformation ? result.personalInformation.city ? result.personalInformation.city : '' : '' : '',
                  province: result.personalInformation ? result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '' : '', 
                  birthday: result.personalInformation ? result.personalInformation ?  result.personalInformation.birthday ?  result.personalInformation.birthday : '' : '' : '', 

                  civilStatus: result.personalInformation ? result.personalInformation ?  result.personalInformation.civilStatus ?  result.personalInformation.civilStatus : '' : '' : '', 

                  learningCenter: result.personalInformation ? result.personalInformation ?  result.personalInformation.learningCenter ?  result.personalInformation.learningCenter : '' : '' : '',
                  gradeLevel: result.personalInformation ? result.personalInformation ?  result.personalInformation.gradeLevel ?  result.personalInformation.gradeLevel : '' : '' : '',
                  reasongForStopping: result.personalInformation ? result.personalInformation ?  result.personalInformation.reasongForStopping ?  result.personalInformation.reasongForStopping : '' : '' : '',
                  lifeStatus: result.personalInformation ? result.personalInformation ?  result.personalInformation.lifeStatus ?  result.personalInformation.lifeStatus : '' : '' : '',
                  
                  gender: result.personalInformation ? result.personalInformation ?  result.personalInformation.gender ?  result.personalInformation.gender : '' : '' : '',

                  about: result.personalInformation ? result.personalInformation ?  result.personalInformation.about ?  result.personalInformation.about : '' : '' : '',

                  lastGradeLevelCompleted: result.personalInformation ?  result.personalInformation.lastGradeLevelCompleted ?  result.personalInformation.lastGradeLevelCompleted : '' : '',
                  reasonDropOut: result.personalInformation ?  result.personalInformation.reasonDropOut ?  result.personalInformation.reasonDropOut : '' : '',
                  attendedAlsLessonBefore: result.personalInformation ?  result.personalInformation.attendedAlsLessonBefore ?  result.personalInformation.attendedAlsLessonBefore : '' : '',
                  completedProgram: result.personalInformation ?  result.personalInformation.completedProgram ?  result.personalInformation.completedProgram : '' : '',


                  yearsInAls: result.personalInformation ?  result.personalInformation.yearsInAls ?  result.personalInformation.yearsInAls : '' : '',
                  registeredExaminee: result.personalInformation ?  result.personalInformation.registeredExaminee ?  result.personalInformation.registeredExaminee : '' : '',
                  occupation: result.personalInformation ?  result.personalInformation.occupation ?  result.personalInformation.occupation : '' : '',
                  letPasser: result.personalInformation ?  result.personalInformation.letPasser ?  result.personalInformation.letPasser : '' : '',
                  noOfYearsTeaching: result.personalInformation ?  result.personalInformation.noOfYearsTeaching ?  result.personalInformation.noOfYearsTeaching : '' : '',
                  noOfYearsAsAlsTeacher: result.personalInformation ?  result.personalInformation.noOfYearsAsAlsTeacher ?  result.personalInformation.noOfYearsAsAlsTeacher : '' : '',
                  subjectExpertise: result.personalInformation ?  result.personalInformation.subjectExpertise ?  result.personalInformation.subjectExpertise : '' : '',

                  userType:  (result.local ? result.local.userType ? result.local.userType : '' : '') + (result.google ? result.google.userType ? result.google.userType : '' : '') + (result.facebook ? result.facebook.userType ? result.facebook.userType : '' : ''),
                  imagePreview: (this.props.type === 'local' ? (result.personalInformation ? result.personalInformation ? result.personalInformation.image ? result.personalInformation.image : '' : '' : '') : (result.google ? result.google.image ? result.google.image : '' : '') + (result.facebook ? result.facebook.image ? result.facebook.image : '' : '' ))
                })
              
                
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }

 
  render() {
    console.log(this.state.imagePreview)
    return (
        <div className='element-container user-profile-container'>
            <div className='user-image'>
              <Form onSubmit={this.handleSubmit}>
                  {this.props.type === 'local' ? 
                  <ImageLoader className='hero-image' image={this.state.imagePreview} type='user'>
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
                  </ImageLoader>
                  : null}
                  {this.props.type === 'facebook' || this.props.type === 'google' ? 
                    <div className='hero-image'
                      style={{backgroundImage: 'url(' + this.state.imagePreview + ')'}}
                    ></div>

                  : null}
              
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
    role: state.role,
    hadPreTest: state.hadPreTest,
    type: state.type
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