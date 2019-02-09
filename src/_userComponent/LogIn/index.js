import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser } from '../../_redux/actions/user'

import Grid from '../../_component/Grid/' 
import Form from '../../_component/Form/Form' 
import Input from '../../_component/Form/Input'
import Button from '../../_component/Form/Button'
import FormMessage from '../../_component/Form/FormMessage'

import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiRequest from '../../_axios'
import { appId, clientId } from '../../_config'


import FacebookLogo from '../../_images/facebook-logo.png'
import GoogleLogo from '../../_images/google-logo.png'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',

      message: '',
      type: '',
      active: false,
      buttonDisabled: false,

      disabled: false,
      unauthorized: false,
      isLogIn: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.componentClicked = this.componentClicked.bind(this)
  }
  componentClicked(){

  }
  responseFacebook(fbRes){
    apiRequest('post', '/oauth/facebook', { access_token: fbRes.accessToken }, false)
      .then((res)=>{
        let result = res.data
       if(result.disabled){
          this.setState({
            disabled: true,
            isLogIn: false,
          })
        }else if(result.account === 'No Account Match'){
          this.setState({
            unauthorized: true,
            isLogIn: false
          })
        }else if(result.data){ 
          
          let userData = {
          user: { 
            id: result.data ? result.data._id ? result.data._id : '' : '',
            email: result.data.facebook ? result.data.facebook.email ? result.data.facebook.email : '' : '',
            firstName: fbRes.name,
            image: fbRes.picture.data.url
          },
          token: result.token,
          isLoggedIn: true,
          role: result.data.facebook ? result.data.facebook.userType ? result.data.facebook.userType : '' : '',
          type: 'facebook'
          }
          if(userData.role === 'Learner'){
            let level = result.data.userSettings ? result.data.userSettings.level ? result.data.userSettings.level : '' : ''
            apiRequest('get', `/generated-exam/learner-pre-test?level=${level}&examiner=${userData.user.id}`, false, userData.token)
              .then((res)=>{
                
                if(res.data){
                  userData = {...userData, level: level, hadPreTest: res.data.pretest }
                  
                  this.props.actions.logIn(userData)
                  if(res.data.pretest){
                    this.props.history.push('/learner/dashboard')
                  }else{
                    this.props.history.push('/learner-start/dashboard')
                  }
                }
              })
              .catch((err)=>{
                this.formMessage('Error: ' + err.message, 'error', true, false)
              })
          }else if(userData.role === 'Administrator'){
            this.props.actions.logIn(userData)
            this.props.history.push('/admin/dashboard')
          }else if(userData.role === 'Teacher'){
            this.props.actions.logIn(userData)
            this.props.history.push('/teacher/dashboard')
          }
        }
        
      })
      .catch((err)=>{
        
      })
  }
  responseGoogle(googleRes){
    console.log(googleRes)
    apiRequest('post', '/oauth/google', { access_token: googleRes.accessToken }, false)
      .then((res)=>{
        console.log(res)
        let result = res.data
        if(result.disabled){
          this.setState({
            disabled: true,
            isLogIn: false,
          })
        }else if(result.account === 'No Account Match'){
          this.setState({
            unauthorized: true,
            isLogIn: false
          })
        }else if(result.data){
          let userData = {
            user: { 
              id: result.data ? result.data._id ? result.data._id : '' : '',
              email: result.data.google ? result.data.google.email ? result.data.google.email : '' : '',
              firstName: googleRes.profileObj.name,
              image: googleRes.profileObj.imageUrl,
            },
            token: result.token,
            isLoggedIn: true,
            role: result.data.google ? result.data.google.userType ? result.data.google.userType : '' : '',
            type: 'google'
          }
          if(userData.role === 'Learner'){
            let level = result.data.userSettings ? result.data.userSettings.level ? result.data.userSettings.level : '' : ''
            apiRequest('get', `/generated-exam/learner-pre-test?level=${level}&examiner=${userData.user.id}`, false, userData.token)
              .then((res)=>{
                console.log(res)
                if(res.data){
                  userData = {...userData, level: level, hadPreTest: res.data.pretest }
                  
                  this.props.actions.logIn(userData)
                  if(res.data.pretest){
                    this.props.history.push('/learner/dashboard')
                  }else{
                    this.props.history.push('/learner-start/dashboard')
                  }
                }
              })
              .catch((err)=>{
                this.formMessage('Error: ' + err.message, 'error', true, false)
              })
          }else if(userData.role === 'Administrator'){
            this.props.actions.logIn(userData)
            this.props.history.push('/admin/dashboard')
          }else if(userData.role === 'Teacher'){
            this.props.actions.logIn(userData)
            this.props.history.push('/teacher/dashboard')
          }
        }
        
      })
      .catch((err)=>{
          console.log(err)
          this.formMessage('Error: ' + err.message, 'error', true, false)
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
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Logging in', 'loading', true, false)
    apiRequest('post', '/signin', {email: this.state.email, password: this.state.password})
      .then((res)=>{
         
          if(res.data) {
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
                token: result.token,
                isLoggedIn: true,
                role: result.data.local ? result.data.local.userType ? result.data.local.userType : '' : '',
                type: 'local'
              }
              if(userData.role === 'Learner'){
                let level = result.data.userSettings ? result.data.userSettings.level ? result.data.userSettings.level : '' : ''
                apiRequest('get', `/generated-exam/learner-pre-test?level=${level}&examiner=${userData.user.id}`, false, userData.token)
                  .then((res)=>{
                    if(res.data){
                      userData = {...userData, level: level, hadPreTest: res.data.pretest }
                      this.props.actions.logIn(userData)
                      if(res.data.pretest){
                        this.props.history.push('/learner/dashboard')
                      }else{
                        this.props.history.push('/learner-start/dashboard')
                      }
                    }
                  })
                  .catch((err)=>{
                    this.formMessage('Error: ' + err.message, 'error', true, false)
                  })
              }else if(userData.role === 'Administrator'){
                this.props.actions.logIn(userData)
                this.props.history.push('/admin/dashboard')
              }else if(userData.role === 'Teacher'){
                this.props.actions.logIn(userData)
                this.props.history.push('/teacher/dashboard')
              }



          }else if(res.disabled){
            this.setState({
              disabled: true,
              isLogIn: false,
            })
          }
         
      })
      .catch((err)=>{
       
          if(err.response.status){
            this.setState({
              unauthorized: true,
              isLogIn: false,
            })
          }
          this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  componentWillReceiveProps(nextProps){
    
  }
  render() {
    console.log()
    return (
      <div className='modal'>
        <div className='modal-container'>


          <div className='sign-in-container'>

          <div className='sign-in-form'>
              

              {this.state.isLogIn ? 
              <Grid>
               <Form onSubmit={this.handleSubmit}>
                <Grid.X>
                  <Grid.Cell large={12} medium={12} small={12} className='log-in-header'>
                    <div className='subtitle-montserrat'>Log in</div>
                   
                    <div className='close-button la la-close '  onClick={this.props.close}></div>

                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12}>
                     <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                  </Grid.Cell>
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

                 
                  
                  <Grid.Cell large={12} medium={12} small={12} className='sign-up-button'>
                    <button type='submit' disabled={this.state.buttonDisabled} className='button sign-up'>Log In</button>
                  </Grid.Cell>
                </Grid.X>
                </Form>
                <Grid.X>
                  <Grid.Cell large={12} medium={12} small={12}>
                    <div className='log-in-border'>
                      <div className='context-montserrat'>OR</div>
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={12} small={12}>
                    <span className='facebook-button-container'>
                      <div className='fb-logo' style={{backgroundImage: 'url(' + FacebookLogo + ')'}} />
                      <FacebookLogin
                        appId={appId}
                        autoLoad={false}                    
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass='facebook-button'
                        textButton='Log in with Facebook'
                        icon='element'
                        />
                      </span>
                      
                     
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={12} small={12}>
                     <span className='google-button-container'>
                        <div className='google-logo' style={{backgroundImage: 'url(' + GoogleLogo + ')'}} />
                        <GoogleLogin
                          clientId={clientId}
                          render={renderProps => (
                            <button className='google-button' onClick={renderProps.onClick}>Log in with Google</button>
                          )}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </span>
                  </Grid.Cell>
                  
                </Grid.X>
              </Grid>
             : null}
              {this.state.disabled ? 
              <Grid>
                <Grid.X className='confirm-message'>
                  <Grid.Cell large={12} medium={12} small={12}>
                    <div className='subtitle-montserrat text-center'>Access Denied!</div>
                    <div className='context-montserrat text-center'>
                      Your account is still undergoing validation from our administrators before you can use our service.
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12} className='sign-up-button'>
                    <button type='submit' className='button primary' onClick={this.props.close}>Confirm</button>
                  </Grid.Cell>
                </Grid.X>
              </Grid>
              : null}
              {this.state.unauthorized ? 
              <Grid>
                <Grid.X className='confirm-message'>
                  <Grid.Cell large={12} medium={12} small={12}>
                    <div className='subtitle-montserrat text-center'>Access Denied!</div>
                    <div className='context-montserrat text-center'>
                     Please check if the provided credentials is correct.
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={12} medium={12} small={12} className='sign-up-button'>
                    <button type='submit' className='button primary' onClick={this.props.close}>Confirm</button>
                  </Grid.Cell>
                </Grid.X>
              </Grid>
              : null}

          </div>
        </div>










            

        </div>
      </div>

    )
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

const LogInLayout = connect(mapStateToProps, mapDispatchToProps)(Layout)
const LogIn = withRouter(LogInLayout)
export default LogIn
