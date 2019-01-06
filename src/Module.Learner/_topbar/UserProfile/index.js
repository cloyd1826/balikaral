import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../../_redux/actions/user'

import ImageLoader from '../../../_component/ImageLoader'

import { Link } from 'react-router-dom'

import config from '../../../_config'


class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      userLink: false,
      user: {},
      role: ''
    }
    this.logOut = this.logOut.bind(this)
    this.toggleUserLink = this.toggleUserLink.bind(this)
  }
  toggleUserLink(){
    if(this.state.userLink){
      this.setState({
        userLink: false
      })
    }else{ 
      this.setState({
        userLink: true
      })
    }
  }
  componentDidMount(){
      this.setState({
        user: this.props.user,
        role: this.props.role
      })
  }
 
  componentWillReceiveProps(nextProps){
      
      this.setState({
        user: nextProps.user,
        role: nextProps.role
      })
  }
  logOut(){
    this.props.actions.logOut()
  }
  render() {
   
    return (
      <div className='user-top-bar'>
        <div className='user-name'>
          <div className='name'>
          <Link to={{ 
                pathname: '/learner/profile/update-information', 
                state: { id: this.state.user.id } 
              }}>
            {
                (this.state.user.firstName ? this.state.user.firstName : '') 
                + ' ' + 
                (this.state.user.middleName ? this.state.user.middleName.substring(0,1) : '')
                + ' ' + 
                (this.state.user.lastName ? this.state.user.lastName : '')
            }
          </Link>

          </div>
          <div className='role'>{
            this.state.role ? this.state.role : ''
          }</div>
        </div>
        
        <ImageLoader className='user-image' onClick={this.toggleUserLink} image={this.props.user.image} type='user' />
        
        {this.state.userLink ? 
            <div className='user-container'>
              <Link to='/'>
                <div className='user-bar'>
                  <span><i className='la la-home' />Home</span>
                </div>
              </Link>
              <Link to={{ 
                  pathname: '/learner/profile/update-information', 
                  state: { id: this.state.user.id } 
                }}>
                <div className='user-bar'>
                  <span><i className='fa fa-user' />Profile</span>
                </div>
              </Link>
              
              <div className='user-bar' onClick={this.logOut}>
                 <span><i className='fa fa-sign-out' />Log Out</span>
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
    role: state.role
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions: {
       logOut: bindActionCreators(logOutUser, dispatch)
     }
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default UserProfile
