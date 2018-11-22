import React, { Component } from 'react'

import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Routes from './Routes'

class Admin extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    return ( 
      <div className='admin-container'>
          <TopBar />
          <Sidebar />
          <Routes />
      </div>
    );
  }
}

export default Admin
