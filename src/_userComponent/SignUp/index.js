import React, { Component } from 'react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'
import ImageLoader from '../../_component/ImageLoader'
import Form from '../../_component/Form/Form'
import Input from '../../_component/Form/Input'
import Select from '../../_component/Form/Select'
import Button from '../../_component/Form/Button'
import FormMessage from '../../_component/Form/FormMessage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser } from '../../_redux/actions/user'

import axios from 'axios'
import apiRequest from '../../_axios'

import FacebookLogo from '../../_images/facebook-logo.png'
import GoogleLogo from '../../_images/google-logo.png'

import SelectLevel from '../../_special-form/SelectLevel'

class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      middleName: '',
      userType: '',

      gender: '',
      birthday: '',
    

      level: '',
 
      message: '',
      type: '',
      active: false,
      buttonDisabled: false,
      
      checked: false,
      isCreating: true,

      isFacebookConfirm: false,

      signIn: false
    }
    this.componentClicked = this.componentClicked.bind(this)

    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)


    this.formMessage = this.formMessage.bind(this)

    this.createNewAccount = this.createNewAccount.bind(this)

  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleCheckbox(e){
    let name = e.target.name
    let cbecked = e.target.cbecked
    this.setState({
      [name]: cbecked
    })
  }

  handleCheck(e){
    let checked = this.state.checked

    this.setState({
      checked: !checked
    })
  }

  createNewAccount(){
    this.setState({
      isCreating: true,
      email: '',
      password: '',
      lastName: '',
      firstName: '',
      middleName: '',

      
      userType:  '',
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Saving Data', 'loading', true, true)

    if(this.state.isFacebookConfirm){
      let data = {
        email: this.state.email,
        id: this.state.id,
        userType: this.state.userType,
      }
      apiRequest('post', '/signup-facebook', data, false)
        .then((res)=>{
            this.setState({
              isCreating: false,
              active: false,
              buttonDisabled: false
            })
        })
        .catch((err)=>{
           this.formMessage('Error: ' + err.message, 'error', true, false)
        })
    }else{
      let data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middleName: this.state.middleName,
        userType: this.state.userType,
        gender: this.state.gender,
        birthday: this.state.birthday
      }
      if(this.state.userType === 'Learner'){
        data = {...data, level: this.state.level}
      }


      apiRequest('post', '/signup', data,)
        .then((res)=>{
            this.setState({
              isCreating: false,
              active: false,
              buttonDisabled: false
            })
        })
        .catch((err)=>{
           this.formMessage('Error: ' + err.message, 'error', true, false)
        })
    }
  }
  componentClicked(){

  }
  responseFacebook(res){
    // console.log(fbRes) 
    // apiRequest('post', `/oauth/facebook`, {access_token: fbRes.accessToken}, false)
    //   .then((res)=>{
    //     console.log(res)
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    console.log(res)

    this.setState({
      isFacebookConfirm: true,
      email: res.email,
      name: res.name,
      image: res.picture.data.url,
      id: res.id
    })
  }
  responseGoogle(res){
    console.log(res)
  }
  render() {
    return (
      <div className='modal'>
        <div className='modal-container'>
        <div className='sign-in-container'>

          <div className='sign-in-form'>
              
              {this.state.isCreating ? 
              <Grid>
                <Grid.X>
                  <Grid.Cell large={12} medium={12} small={12} className='log-in-header'>
                    <div className='subtitle-montserrat'>Sign in</div>
                    
                    <div className='close-button la la-close '  onClick={this.props.close}></div>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12} >
                    <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                  </Grid.Cell>
                </Grid.X>
                <Grid.X>
                  <Grid.Cell large={6} medium={12} small={12}>
                    <span className='facebook-button-container'>
                      <div className='fb-logo' style={{backgroundImage: 'url(' + FacebookLogo + ')'}} />
                      <FacebookLogin
                        appId="344679316117018"
                        autoLoad={false}                    
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass='facebook-button'
                        textButton='Sign up with Facebook'
                        icon='element'

                        />
                      </span>
                      
                     
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={12} small={12}>
                     <span className='google-button-container'>
                        <div className='google-logo' style={{backgroundImage: 'url(' + GoogleLogo + ')'}} />
                        <GoogleLogin
                          clientId="293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com"
                          render={renderProps => (
                            <button className='google-button' onClick={renderProps.onClick}>Sign up with Google</button>
                          )}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </span>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12}>
                    <div className='log-in-border'>
                      <div className='context-montserrat'>OR EMAIL</div>
                    </div>
                  </Grid.Cell>
                </Grid.X>
               <Form onSubmit={this.handleSubmit}>

               {!this.state.isFacebookConfirm ? 
                  <Grid.X>
                    <Grid.Cell large={12} medium={12} small={12}>
                      <Input 
                        label='Email' 
                        type='email' 
                        placeholder='email@mail.com'
                        required
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                    </Grid.Cell>
                    <Grid.Cell large={12} medium={12} small={12}>
                      <Input 
                        label='Password' 
                        type='password' 
                        required 
                        placeholder='●●●●●●●●'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                    </Grid.Cell>
                  </Grid.X>
                : null}


                {this.state.isFacebookConfirm ? 
                  <Grid.X>
                    <Grid.Cell  large={12} medium={12} small={12}>
                      <div className='facebook-account'>
                        <div className='facebook-image' style={{backgroundImage: 'url(' + this.state.image + ')'}} />
                        <div className='facebook-name'>{this.state.name}</div>
                        <div className='facebook-email'>{this.state.email}</div>
                        <div className='context-montserrat text-center'>
                          Your account will be saved in Balikaral.
                        </div>
                      </div>
                    </Grid.Cell>
                  </Grid.X>
                : null}

                <Grid.X>
                  <Grid.Cell large={(this.state.userType === 'Learner' ? 6 : 12)} medium={12} small={12}>
                    <Select
                      label='User Type'
                      required
                      name='userType'
                      value={this.state.userType}
                      onChange={this.handleChange}
                      >
                      <option value='' disabled></option>
                      <option value='Learner'>Learner</option>
                      <option value='Teacher'>Teacher</option>
                    </Select>
                  </Grid.Cell>
                  {this.state.userType === 'Learner' ? 
                    <Grid.Cell large={6} medium={12} small={12}>
                      <SelectLevel
                        label='Level'
                        required
                        name='level'
                        value={this.state.level}
                        onChange={this.handleChange}
                        />
                    </Grid.Cell>
                  : null}

                  

                </Grid.X>

               {!this.state.isFacebookConfirm ?
                  <Grid.X>
                    <Grid.Cell large={4} medium={12}  small={12}>
                      <Input 
                        label='First Name'
                        required
                        placeholder='Juan'
                        name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        />
                    </Grid.Cell>
                    <Grid.Cell large={4} medium={12} small={12}>
                      <Input 
                        label='Middle Name' 
                        placeholder='Dela'
                        name='middleName'
                        value={this.state.middleName}
                        onChange={this.handleChange}
                        />
                    </Grid.Cell>
                     <Grid.Cell large={4} medium={12} small={12}>
                      <Input 
                        label='Last Name'
                        placeholder='Cruz'
                        required
                        name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleChange}
                         />
                    </Grid.Cell>
                     <Grid.Cell large={4} medium={12} small={12}>
                      <Select
                        label='Gender'
                        required
                        name='gender'
                        value={this.state.gender}
                        onChange={this.handleChange}
                        >
                        <option value=''></option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </Select>
                    </Grid.Cell>
                     <Grid.Cell large={4} medium={12} small={12}>
                      <Input 
                        type='date'
                        label='Birthday'
                        required
                        name='birthday'
                        value={this.state.birthday}
                        onChange={this.handleChange}
                         />
                    </Grid.Cell>
                  </Grid.X>
                : null }


                <Grid.X>
                  <Grid.Cell large={12} medium={12} small={12} className='tos'>
                     <div className='context-montserrat text-center terms-container'>
                        <span className={this.state.checked ? 'signup-checkmark checked' : 'signup-checkmark'} onClick={this.handleCheck}><i className="la la-check"></i></span>I have had read the <strong><Link to='/terms-of-service' target="_blank">Terms of Service</Link></strong> and <strong><Link to='/privacy-policy' target="_blank">Privacy Policy</Link></strong> of Balikaral
                      </div>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12} className='sign-up-button'>
                    <button type='submit' disabled={!this.state.checked} className='button sign-up'>Sign up</button>
                  </Grid.Cell>
                </Grid.X>
                </Form>
              </Grid>
              :
              <Grid>
                <Grid.X className='confirm-message'>
                  <Grid.Cell large={12} medium={12} small={12}>
                    <div className='subtitle-montserrat text-center'>Congratulations!</div>
                    <div className='context-montserrat text-center'>
                      Your account has been created and will undergo validation from our administrators before you can use our service.
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12} className='sign-up-button'>
                    <button type='submit' className='button primary' onClick={this.props.close}>Confirm</button>
                  </Grid.Cell>
                </Grid.X>
              </Grid>
            }
             
          </div>
        </div>








            
        </div>
      </div>

    );
  }
}


const mapStateToProps = state => {
  return {
    login: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions:{
       logIn: bindActionCreators(logInUser, dispatch)
    }
  }
}

const SignUp = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default SignUp

