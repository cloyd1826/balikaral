import React, {Component} from 'react'

import { Link, withRouter } from 'react-router-dom'

import Grid from '../../_component/Grid'

import FormMessage from '../../_component/Form/FormMessage'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

import ProfileImage from '../../_images/vol2.jpeg'

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
        buttonDisabled: false
      
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
    console.log(this.props)
    this.fetchSingle()
  }
  fetchSingle(){
    apiRequest('get', `/user/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                let result = res.data.data
                this.setState({
                    email: result.local.email,
                    disabled: result.local.disabled,

                    lastName: (result.personalInformation.lastName ? result.personalInformation.lastName : ''),
                    firstName: (result.personalInformation.firstName ? result.personalInformation.firstName : ''),
                    middleName: (result.personalInformation.middleName ? result.personalInformation.middleName : ''),

                    houseNoStreet: result.personalInformation.houseNoStreet,
                    barangay: result.personalInformation.barangay,
                    city: result.personalInformation.city,
                    province: result.personalInformation.province,
                    zipcode:  result.personalInformation.zipcode,
                    userType:  result.local.userType,
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
              <div className='hero-image' style={{backgroundImage: 'url(' + ProfileImage + ')'}}></div>
            </div>
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
    user: state.user
  }
}
const Profile = connect(mapStateToProps)(Layout)
export default withRouter(Profile)