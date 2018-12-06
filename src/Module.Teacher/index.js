import React, { Component } from 'react'

import TopBar from './_topbar'
import Routes from './_routes'

class Teacher extends Component{
  
  render() {
    return ( 
      <div className='admin-container'>
          <TopBar />
          <Routes />
      </div>
    );
  }
}

export default Teacher
