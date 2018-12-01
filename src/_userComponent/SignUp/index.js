import React, { Component } from 'react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Grid from '../../_component/Grid'
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

class Layout extends Component{
  constructor(props){
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

      isCreating: true
    }
    this.componentClicked = this.componentClicked.bind(this)

    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  createNewAccount(){
    this.setState({
      isCreating: true,
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
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Saving Data', 'loading', true, true)
    let data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      middleName: this.state.middleName,
      houseNoStreet: this.state.houseNoStreet,
      barangay: this.state.barangay,
      city: this.state.city,
      province: this.state.province,
      zipcode: this.state.zipcode ,
      userType: this.state.userType 
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
  componentClicked(){

  }
  responseFacebook(res){
    
  }
  responseGoogle(res){
    
  }
  render() {
    return (
      <div className='modal'>
        <div className='modal-container'>
            <div className='sign-in-container'>
              <div className='close-button fa fa-close'  onClick={this.props.close}></div>
              <div className='log-in-text'>
                <div className='subtitle-montserrat'>Become a Member</div>
                <div className='context-montserrat'>Lorem Ipsum Dolor Sit Amet Consectur Adepescin Elit.</div>
              </div>

              {this.state.isCreating ? 

                 <div className='log-in-form'>
                    <Form onSubmit={this.handleSubmit} size='small'>
                      <Grid>
                        <Grid.X>
                          <Grid.Cell large={12} medium={6} small={12}>
                            <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage>
                          </Grid.Cell>
                        </Grid.X>
                        <Grid.X>
                          <Grid.Cell large={6} medium={6} small={12}>
                            <Input 
                              label='Email' 
                              type='email' 
                              required
                              name='email'
                              value={this.state.email}
                              onChange={this.handleChange}

                              />
                          </Grid.Cell>
                          <Grid.Cell large={6} medium={6} small={12}>
                            <Input 
                              label='Password' 
                              type='password' 
                              required 
                              name='password'
                              value={this.state.password}
                              onChange={this.handleChange}
                              />
                          </Grid.Cell>
                         
                          <Grid.Cell large={4} medium={6}  small={12}>
                            <Input 
                              label='First Name'
                              required
                              name='firstName'
                              value={this.state.firstName}
                              onChange={this.handleChange}
                              />
                          </Grid.Cell>
                          <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='Middle Name' 
                              
                              name='middleName'
                              value={this.state.middleName}
                              onChange={this.handleChange}
                              />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='Last Name'
                              required
                              name='lastName'
                              value={this.state.lastName}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='House No'
                              
                              name='houseNoStreet'
                              value={this.state.houseNoStreet}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='Baranggay'
                              
                              name='barangay'
                              value={this.state.barangay}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='City'
                              
                              name='city'
                              value={this.state.city}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='Province'
                              
                              name='province'
                              value={this.state.province}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Input 
                              label='Zip Code'
                              
                              name='zipcode'
                              value={this.state.zipcode}
                              onChange={this.handleChange}
                               />
                          </Grid.Cell>
                           <Grid.Cell large={4} medium={6} small={12}>
                            <Select
                              label='User Type'
                              required
                              name='userType'
                              value={this.state.userType}
                              onChange={this.handleChange}
                              >
                              <option value='' disabled></option>
                              <option value='Student'>Student</option>
                              <option value='Teacher'>Teacher</option>
                            </Select>
                          </Grid.Cell>
                          <Grid.Cell className='sign-in-button-form'>
                            <span>
                              <button className='sign-in-button' type='submit'>SIGN UP</button>
                            </span>
                          </Grid.Cell>
                        </Grid.X>
                      </Grid>

                    </Form>
                    <div className='log-in-border'>
                      <div className='context-montserrat'>or</div>
                    </div>
                    <div  className='log-in-button'>
                      <span>
                        <FacebookLogin
                          appId="353023298781537"
                          autoLoad={true}                    
                          fields="name,email,picture"
                          onClick={this.componentClicked}
                          callback={this.responseFacebook}
                          cssClass='facebook-button'
                          textButton='SIGN UP USING FACEBOOK'

                          />
                        </span>
                        <span>
                        <GoogleLogin
                          clientId="293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com"
                          render={renderProps => (
                            <button className='google-button' onClick={renderProps.onClick}>SIGN UP USING GOOGLE</button>
                          )}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </span>
                    </div>
                  </div>
              : 
                 <div className='sign-in-message'>
                    <div className='confirmation'>
                       Your account has been created 
                       and is waiting for access approval from the Administrator. 
                       You will receive an email once your account has been given access.
                    </div>
                    <div className='credentials'>
                     <p>Email: <span>{this.state.email}</span></p>
                     <p>Name: <span>{this.state.firstName + ' ' + this.state.lastName}</span></p>
                     <p>User Role: <span>{this.state.userType}</span></p>
                    </div>
                    <div className='create-new-text' onClick={this.createNewAccount}>Create New Account ?</div>
                  </div>
              }
             


             
              
               
                
              


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

