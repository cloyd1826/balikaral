
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
                    TAGUMPAY NG MAG-AARAL
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/generated-exam/learner'>
                    <i className='la la-list-ol'></i>
                    <span>Learner Exam</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/learner-list'>
                    <i className='la la-graduation-cap'></i>
                    <span>Kilalanin</span>
                  </NavLink>
                
                </div>


                 <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    SAYA NG NAGLILINGKOD
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/reviewer/list/all'>
                    <i className='la la-file-pdf-o'></i>
                    <span>Modyul ( Module )</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam/list/all'>
                    <i className='la la-list-ul'></i>
                    <span>Exam</span>
                  </NavLink>
                    <NavLink className='sidebar-link' activeClassName='active' to='/admin/forum/dashboard'>
                    <i className='la  la-comments'></i>
                    <span>Forum Discussions</span>
                  </NavLink>
                </div>


                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    PANDAYAN
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/level/List'>
                    <i className='la la-sort-amount-asc'></i>
                    <span>Level</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/learning-strand/list'>
                    <i className='la la-align-left'></i>
                    <span>Learning Strand</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/subject/list'>
                    <i className='la la-align-center'></i>
                    <span>Lesson (Leksiyon)</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/exam-type/list'>
                    <i className='la  la-th-list'></i>
                    <span>Exam Type</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/forum/list/'>
                    <i className='la la-comment'></i>
                    <span>Forum</span>
                  </NavLink>
                   <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/level/List'>
                    <i className='la la-sort-amount-asc'></i>
                    <span>Level</span>
                  </NavLink>
                
                </div>


                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    GALING NG SISTEMA
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/statistics/exam-type'>
                    <i className='la la-circle-o-notch'></i>
                    <span>Analytics ng Exam Type</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/statistics/generated-exam'>
                    <i className='la la-tasks'></i>
                    <span>Analytics ng Generated Exam</span>
                  </NavLink>
                
                </div>

                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    USER
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/user/list'>
                    <i className='la la-user'></i>
                    <span>Mga User</span>
                  </NavLink>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/user/add'>
                    <i className='la la-user-plus'></i>
                    <span>Magdagdag ng User</span>
                  </NavLink>
                
                </div>


                

                <div className='sidebar-content'>
                  <div className='sidebar-title'>
                    LANDING PAGE
                  </div>
                  <NavLink className='sidebar-link' activeClassName='active' to='/admin/management/landing-page/list'>
                    <i className='la  la-institution'></i>
                    <span>Detalye</span>
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