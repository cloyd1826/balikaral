
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
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/dashboard'>
                    <i className='la la-home'></i>
                    <span>Home</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    MANAGEMENT
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/exam/list/self'>
                    <i className='la la-list-ul'></i>
                    <span>Exam</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/reviewer/list/self'>
                    <i className='la la-folder-o'></i>
                    <span>Your Reviewer</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    Teacher
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/reviewer/list/teachers'>
                    <i className='la la-file-pdf-o'></i>
                    <span>Reviewer List</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/exam/list/teachers'>
                    <i className='la la-list-ul'></i>
                    <span>Exam</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    Learner
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/exam/learner'>
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