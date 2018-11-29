import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser, logOutUser } from '../../_redux/actions/user'

import Form from '../../_component/Form/Form' 
import Input from '../../_component/Form/Input'
import Button from '../../_component/Form/Button'

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
          let userData = {
            user: {
              id: 'id',
              email: this.state.email,
              firstName: 'first name',
              middleName: 'middle name',
              lastName: 'last name',
            },
            token: res.data.token,
            isLoggedIn: true
          }
          this.props.actions.logIn(userData)
          axios.defaults.headers.common['Authorization'] = res.data.token
          this.props.close()
      })
      .catch((err)=>{
         
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
       logIn: bindActionCreators(logInUser, dispatch),
       logOut: bindActionCreators(logOutUser, dispatch)
    }
  }
}

const LogIn = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default LogIn
