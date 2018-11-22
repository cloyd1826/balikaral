import React, { Component } from 'react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.componentClicked = this.componentClicked.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)

    this.responseGoogle = this.responseGoogle.bind(this)
    this.successGoogle = this.successGoogle.bind(this)
  }
  componentClicked(){

  }
  responseFacebook(res){
    console.log(res)
  }
  responseGoogle(res){
    console.log(res)
  }
  successGoogle(res){
    console.log(res)
  }
  render() {
    return (
      <div>

        <FacebookLogin
          appId="353023298781537"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} 
          textButton='Facebook'
          size='small'
          cssClass='facebook-register'
          />

        <GoogleLogin
          clientId="293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
  
      </div>

    );
  }
}

export default SignUp
