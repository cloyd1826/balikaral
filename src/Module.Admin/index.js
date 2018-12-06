import React, { Component } from 'react'

import Sidebar from './_sidebar'
import TopBar from './_topbar'
import Routes from './_routes'

class Admin extends Component{
  
  render() {
    return ( 
      <div className='admin-container'>
          <TopBar />
          {/*<Sidebar />*/}
          <Routes />
      </div>
    );
  }
}

export default Admin
