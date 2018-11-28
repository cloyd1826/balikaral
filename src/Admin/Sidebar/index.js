
import React, {Component} from 'react'

import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-sidebar'>
            <div className='sidebar-content'>
              <div className='sidebar-title'>
                DASHBOARD TITLE
              </div>
              <NavLink className='sidebar-link' activeClassName='active' to='/admin/dashboard'>
                <i className='fa fa-dashboard'></i>
                <span className='show-for-large-only'>Dashboard</span>
              </NavLink>
            </div>


            <div className='sidebar-content'>
              <div className='sidebar-title'>
                MANAGEMENT
              </div>

              <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/level/list'>
                <i className='fa fa-edit'></i>
                <span className='show-for-large-only'>Level</span>
              </NavLink>
              <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/learning-strand/list'>
                <i className='fa fa-bell'></i>
                <span className='show-for-large-only'>Learning Strands</span>
              </NavLink>
              <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam'>
                <i className='fa fa-calendar'></i>
                <span className='show-for-large-only'>Exam</span>
              </NavLink>
            </div>

            <div className='sidebar-content'>
              <div className='sidebar-title'>
                TITLE THREE
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-comments'></i>
                <span className='show-for-large-only'>Link One</span>
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-code'></i>
                <span className='show-for-large-only'>Link Two</span>
              </div>
            </div>
        </div>

    )
  }
}

export default Sidebar