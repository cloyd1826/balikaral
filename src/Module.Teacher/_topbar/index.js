import React, {Component} from 'react'

import { Link } from 'react-router-dom'
import UserProfile from './UserProfile'
import Sidebar from '../_sidebar'
class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-topbar'>
           <div className='topbar-left'>

            <Link to='/teacher/dashboard'>
              <span className='icon la la-home'></span>
            </Link>
            
            <Sidebar />

            <span className='balik'>BALIK&nbsp;</span>
            <span className='aral'>ARAL</span>
            

          </div>
          <div className='topbar-right'>
            
            <UserProfile />
            
          </div>
        </div>

    )
  }
}

export default TopBar