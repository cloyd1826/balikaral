
import React, {Component} from 'react'

import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }
  toggleSidebar(){
    if(this.state.active){
      this.setState({
        active: false
      })
    }else{
       this.setState({
        active: true
      })
    }
  }
  render() { 
    return (
      <div>
        <span onClick={this.toggleSidebar} className='icon la la-navicon'></span>
        {this.state.active ? 
            <div className='admin-sidebar'>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    DASHBOARD
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/dashboard'>
                    <i className='la la-home'></i>
                    <span>Home</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    MANAGEMENT
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/level/list'>
                    <i className='la la-sort-amount-asc'></i>
                    <span>Level</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/learning-strand/list'>
                    <i className='la la-align-left'></i>
                    <span>Learning Strand</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam/list/all'>
                    <i className='la la-list-ul'></i>
                    <span>Exam</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam-type/list'>
                    <i className='la la-flag-checkered'></i>
                    <span>Exam Type</span>
                  </NavLink>
                </div>
    
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    User
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/user/list'>
                    <i className='la la-user'></i>
                    <span>List of User</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/user/add'>
                    <i className='la la-user-plus'></i>
                    <span>Add User</span>
                  </NavLink>
                </div>

                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    Teacher
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/reviewer/list/all'>
                    <i className='la la-file-pdf-o'></i>
                    <span>Reviewer</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    Learner
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam/learner'>
                    <i className='la la-list-ol'></i>
                    <span>Learner Exam</span>
                  </NavLink>
                </div>
            </div>
            :
            null
          }
      </div>
    )
  }
}

export default Sidebar