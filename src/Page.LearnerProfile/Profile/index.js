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
    this.fetchSingle()
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
  console.log(this.state.image) 
    return (
        <div className='element-container learner-profile'>
            <div className='user-image-learner'>
              <div className='hero-image' 
                  style={{backgroundImage: 'url(' + (this.state.imagePreview != '' ? `${config}/${this.state.imagePreview}` : ProfileImage ) + ')'}}>
              </div>
            </div>
            <div className='user-description-learner'>
              <div className='user-name'>{this.state.firstName + ' ' + this.state.middleName.substring(0,1) + ' ' + this.state.lastName}</div>
              <div className='user-description'>{this.state.about}</div>
              <div className='other-info'>
                <div className='info'><span>Learning Center: </span> {this.state.learningCenter}</div> 
                <div className='info'><span>Grade/Level: </span> {this.state.gradeLevel}</div> 
                <div className='info'><span>Pinagkaka abalahan sa buhay: </span> {this.state.lifeStatus}</div>
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