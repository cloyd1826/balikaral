import React, { Component } from 'react'

import NavBar from '../_userComponent/NavBar'

import apiRequest from '../_axios'
import config from '../_config'



class ErrorPage extends Component {

  render() {
    return (
      <div  className='home-container'>
        <NavBar />

        <div className='error-container-page'>
          <span>
          <i className='la la-code' />
          <div className='message'>An error occured.</div>
          </span>
        </div>
        



      </div>

    );
  }
}

export default ErrorPage
