
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
                    KILALANIN
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/learner-list'>
                    <i className='la la-user'></i>
                    <span>Mga Learner</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/generated-exam/learner'>
                    <i className='la la-list-ol'></i>
                    <span>Learner Exam</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    TURUAN
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/reviewer/list'>
                    <i className='la la-file-pdf-o'></i>
                    <span>Modyul (Module)</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/learning-resources/list/'>
                    <i className='la la-file-movie-o'></i>
                    <span>Learning Resources</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/session-guide/list'>
                    <i className='la la-file-archive-o'></i>
                    <span>Teaching Resources</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/teacher/management/exam/list'>
                    <i className='la la-list-ul'></i>
                    <span>Exam</span>
                  </NavLink>
                </div>
                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    DAMAYAN
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to={{
                    pathname: '/teacher/forum/dashboard',
                    state: {id: false }}}>
                    <i className='la la-comment'></i>
                    <span>Forum</span>
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