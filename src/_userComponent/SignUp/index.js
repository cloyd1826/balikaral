import React, { Component } from 'react'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.componentClicked = this.componentClicked.bind(this)

    this.responseFacebook = this.responseFacebook.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
  }
  componentClicked(){

  }
  responseFacebook(res){
    console.log(res)
  }
  responseGoogle(res){
    console.log(res)
  }
  render() {
    return (
      <div className='modal'>
        <div className='modal-container'>
            <div className='log-in-modal'>
              <div className='close-button fa fa-close'  onClick={this.props.close}></div>
              <div className='log-in-text'>
                <div className='subtitle-montserrat'>Become a Member</div>
                <div className='context-montserrat'>Lorem Ipsum Dolor Sit Amet Consectur Adepescin Elit.</div>
              </div>
              <div className='log-in-button'>
                <span>
                  <FacebookLogin
                    appId="353023298781537"
                    autoLoad={true}                    
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    cssClass='facebook-button'
                    textButton='SIGN IN USING FACEBOOK'
                    />
                  <GoogleLogin
                    clientId="293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com"
                    render={renderProps => (
                      <button className='google-button' onClick={renderProps.onClick}>SIGN IN USING GOOGLE</button>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                </span>
              </div>
              <div className='log-in-border'>
                <div className='context-montserrat'>or</div>
              </div>
              <div className='log-in-register'>
                Register using an <span className='blue-text'>email address</span>
              </div>
            </div>
        </div>
      </div>

    );
  }
}

export default SignUp
