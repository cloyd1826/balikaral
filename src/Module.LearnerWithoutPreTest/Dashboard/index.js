import React, {Component} from 'react'

import {NavLink, Link} from 'react-router-dom'

import Grid from '../../_component/Grid'

import { connect } from 'react-redux'

import tapang from '../../IconImages/tapang.png'
import talino from '../../IconImages/talino.png'
import tiyaga from '../../IconImages/tiyaga.png'
import forum from '../../IconImages/forum.png'

import apiRequest from '../../_axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user : {}
    }
    this.checkIfProfileEdit = this.checkIfProfileEdit.bind(this)
    this.toggleProfileUpdate = this.toggleProfileUpdate.bind(this)
  }
  toggleProfileUpdate(){
    this.setState({
      modalProfile: (this.state.modalProfile ? false : true),
    })
  }
  checkIfProfileEdit(){
    apiRequest('get', `/user/check-profile/${this.props.user.id}` , false, this.props.token)
      .then((res)=>{
        console.log(res)
        if(res.data.learnerStatus === 'Edit Profile'){
          this.setState({
            isProfileEdit: true,
            modalProfile: true
          })
        }
      })
      .catch((err)=>{

      })
  }
  componentDidMount(){
    this.checkIfProfileEdit()
    this.setState({
      user: this.props.user
    })

  }

  componentWillReceiveProps(nextProps){
      
      this.setState({
        user: nextProps.user
      })
  }
  render() { 
    return (
        <div className='admin-dashboard'>
          
          <div className='learner-dashboard dashboard-link-container'>
            <Grid>
              <Grid.X>
                  <Grid.Cell large={3} medium={5} small={12}>
                    <Grid full className="show-for-medium">
                      <Grid.X>
                          <Grid.Cell large={12} medium={12} small={12}>
                              <div className='learner-side-container'>
                                <p className="welcome">Welcome,</p>
                                <p className="learner-name">{this.state.user.firstName}!</p>
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
                                    Learner
                                  </div>
                                  <NavLink className='sidebar-link' activeClassName='active' to='/learner-start/pre-test/create'>
                                    <i className='la la-list-ol'></i>
                                    <span>Tapang</span>
                                  </NavLink>
                                  <NavLink className='sidebar-link' activeClassName='active' to='/learner/resources/reviewer/list'>
                                    <i className='la la-file-pdf-o'></i>
                                    <span>Talino</span>
                                  </NavLink>
                                   {this.state.isProfileEdit ? 
                                    <NavLink className='sidebar-link' activeClassName='active' to={{ 
                                        pathname: '/learner-start/profile/update-learner-info', 
                                        state: { id: this.state.user.id } 
                                      }}>
                                      <i className='la la-user'></i>
                                      <span>Update Profile</span>
                                    </NavLink>
                                  : null}
                                </div>
                              </div>
                          </Grid.Cell>
                      </Grid.X>
                    </Grid>
                  </Grid.Cell>
                  <Grid.Cell large={9} medium={7} small={12}>
                      <Grid full>
                        <Grid.X>
                          <Grid.Cell large={12} medium={12} small={12}>
                            <div className="learning-module-title">
                              <h1><span>Learner</span> Module</h1>
                            </div>
                          </Grid.Cell>
                          <Grid.Cell large={6} medium={12} small={12}>
                              
                              <div className='dashboard-link' >
                                <img src={tapang} className="learner-icon-set"/>
                                <div className='link-title'>Tapang</div>
                                  <Link to='/learner-start/pre-test/create'>
                                    <button class="dashboard-link-button">Go <i class="la la-arrow-right"></i></button>
                                  </Link>
                              </div>
                          </Grid.Cell>
                          <Grid.Cell large={6} medium={12} small={12}>
                            
                              <div className='dashboard-link' >
                              <img src={talino} className="learner-icon-set"/>
                                <div className='link-title'>Talino</div>
                                <Link to='/learner-start/resources/reviewer/list/'>
                                  <button class="dashboard-link-button">Go <i class="la la-arrow-right"></i></button>
                                </Link>
                              </div>
                          </Grid.Cell>
                          
                        </Grid.X>
                      </Grid>
                  </Grid.Cell>
              </Grid.X>
            </Grid>
          </div>
          {this.state.modalProfile ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleProfileUpdate}></span>
                <div className='delete-title text-center'>You need to update your User and Learner Information</div>
                <div className='context-montserrat text-center'>We would like to know more about you.</div>
                <div className='delete-button-group'>
                  <Link  to={{ 
                      pathname: '/learner-start/profile/update-learner-info', 
                      state: { id: this.state.user.id } 
                    }}>
                    <button type='button' className='button yes small'>Update Profile</button>
                  </Link>
                  <button type='button' className='button yes small' onClick={this.toggleProfileUpdate}>Later</button>
                </div>
              </div> 
            </div>
          : null}
        </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
    role: state.role,
    token: state.token,
    level: state.level
  }
}

const Dashboard = connect(mapStateToProps)(Layout)

export default Dashboard
