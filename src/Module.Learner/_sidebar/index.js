
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
                  <NavLink className='sidebar-link' activeClassName='active' to='/learner/dashboard'>
                    <i className='la la-home'></i>
                    <span>Home</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    REVIEWERS
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/learner/reviewer/list/learner'>
                    <i className='la la-file-pdf-o'></i>
                    <span>Reviewer</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    Exam
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/learner/exam/available'>
                    <i className='la la-list-ul'></i>
                    <span>Available Exam</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/learner/exam/list'>
                    <i className='la la-rotate-left'></i>
                    <span>Taken Exam</span>
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