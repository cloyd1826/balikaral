import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser } from '../../_redux/actions/user'

import Grid from '../../_component/Grid/' 
import Form from '../../_component/Form/Form' 
import Input from '../../_component/Form/Input'
import Button from '../../_component/Form/Button'
import FormMessage from '../../_component/Form/FormMessage'

import { Link } from 'react-router-dom'


import axios from 'axios'
import apiRequest from '../../_axios'


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
      buttonDisabled: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.responseFacebook = this.responseFacebook.bind(this)
    this.componentClicked = this.componentClicked.bind(this)
  }
  componentClicked(){

  }
  responseFacebook(fbRes){
    console.log(fbRes)
    apiRequest('post', '/oauth/facebook', { access_token: fbRes.accessToken }, false)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
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
          let result = res.data
          console.log(result)
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
          }
          if(userData.role === 'Learner'){
            let level = result.data.userSettings ? result.data.userSettings.level ? result.data.userSettings.level : '' : ''
            apiRequest('get', `/generated-exam/learner-pre-test?level=${level}&examiner=${userData.user.id}`, false, userData.token)
              .then((res)=>{
                console.log(res)
                if(res.data){
                  userData = {...userData, level: level, hadPreTest: res.data.pretest }
                  console.log(userData)
                  this.props.actions.logIn(userData)
                  this.props.close()
                }
              })
              .catch((err)=>{
                this.formMessage('Error: ' + err.message, 'error', true, false)
              })
          }else{
            this.props.actions.logIn(userData)
            this.props.close()
          }
      })
      .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
 
  componentWillReceiveProps(nextProps){
    
  }
  render() {
    return (
      <div className='modal'>
        <div className='modal-container'>


          <div className='sign-in-container'>

          <div className='sign-in-form'>
              
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
                    <button type='submit' disabled={this.state.buttonDisabled} className='button primary'>Log In</button>
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
                        appId="344679316117018"
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
                          clientId="293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com"
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

const LogIn = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default LogIn
