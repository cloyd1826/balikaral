import React, {Component} from 'react'


import UserProfile from './UserProfile'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-topbar'>
          <div className='topbar-left'></div>
          <div className='topbar-right'>
            <span className='icon la la-calendar-o' />
            <span className='icon la la-comments-o' />
            
            <UserProfile />
            
          </div>
        </div>

    )
  }
}

export default TopBar