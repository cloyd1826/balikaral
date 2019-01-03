import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser } from '../../_redux/actions/user'

import Form from '../../_component/Form/Form' 
import Input from '../../_component/Form/Input'
import Button from '../../_component/Form/Button'
import FormMessage from '../../_component/Form/FormMessage'


import axios from 'axios'
import apiRequest from '../../_axios'


class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    apiRequest('post', '/signin', {email: this.state.email, password: this.state.password})
      .then((res)=>{
        console.log(res)
          let result = res.data
          console.log('suser', result)
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
            hadPreTest: result.data.userSettings ? result.data.userSettings.hadPreTest ? result.data.userSettings.hadPreTest : false : false,
          }
          this.props.actions.logIn(userData)
          this.props.close()
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
              <div className='close-button fa fa-close'  onClick={this.props.close}></div>
              <div className='log-in-text'>
                <div className='subtitle-montserrat'>Log in to your account</div>
                <div className='context-montserrat'>Lorem Ipsum Dolor Sit Amet Consectur Adepescin Elit.</div>
              </div>
              <div className='log-in-form'>
                  <Form onSubmit={this.handleSubmit} size='small'>
                    <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                    <Input onChange={this.handleChange} label='Email' name='email' type='email' placeholder='email@email.com' value={this.state.email} /> 
                    <Input onChange={this.handleChange} label='Password' name='password' placeholder='password' type='password' value={this.state.password} />
                   
                    <div className='sign-in-button-form'>
                      <span>
                        <button className='sign-in-button' type='submit'>LOG IN</button>
                      </span>
                    </div>
                  </Form>
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
