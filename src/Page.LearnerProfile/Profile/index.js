import React, {Component} from 'react'

import { Link, withRouter } from 'react-router-dom'

import Grid from '../../_component/Grid'

import apiRequest from '../../_axios'

import { logInUser } from '../../_redux/actions/user'

import { connect } from 'react-redux'

import ProfileImage from '../../_images/vol2.jpeg'

import FormMessage from '../../_component/Form/FormMessage'

import config from '../../_config'

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
  fetchSingle(){
    apiRequest('get', `/user/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
         
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

                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 

                    learningCenter: result.personalInformation ?  result.personalInformation.learningCenter ?  result.personalInformation.learningCenter : '' : '',
                    gradeLevel: result.personalInformation ?  result.personalInformation.gradeLevel ?  result.personalInformation.gradeLevel : '' : '',
                    reasongForStopping: result.personalInformation ?  result.personalInformation.reasongForStopping ?  result.personalInformation.reasongForStopping : '' : '',
                    lifeStatus: result.personalInformation ?  result.personalInformation.lifeStatus ?  result.personalInformation.lifeStatus : '' : '',
                    
                    gender: result.personalInformation ?  result.personalInformation.gender ?  result.personalInformation.gender : '' : '',

                    about: result.personalInformation ?  result.personalInformation.about ?  result.personalInformation.about : '' : '',


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
    return (
        <div className='element-container user-profile-container'>
            <div className='user-image'>
                <div className='hero-image'
                  style={{backgroundImage: 'url(' + (this.state.imagePreview != '' ? `${config}/${this.state.imagePreview}` : ProfileImage ) + ')'}}>
                </div>
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
                <div className='info'><span>Gender:</span>{this.state.gender } </div> 
                <div className='info'><span>Address:</span>
                  {
                    this.state.houseNoStreet + ' ' +
                    this.state.barangay + ' ' +
                    this.state.city + ' ' +
                    this.state.province                
                  }
                </div> 
              </div>
              <div className='info-box'>
                <div className='info-title'>Learner Information</div>
                <div className='info'><span>Learning Center:</span>{this.state.learningCenter} </div> 
                <div className='info'><span>Grade/Level:</span>{this.state.gradeLevel} </div> 
                <div className='info'><span>Reason for Stopping:</span>{this.state.reasongForStopping} </div>
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
const Profile = connect(mapStateToProps)(Layout)
export default withRouter(Profile)