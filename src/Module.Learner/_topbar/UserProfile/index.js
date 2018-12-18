import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../../_redux/actions/user'


import Profile from '../../../_images/vol3.jpeg'

import { Link } from 'react-router-dom'

class Layout extends Component{
  constructor(props){
    super(props)
    this.state = {
      userLink: false
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
    console.log(this.props)
  }
 
  componentWillReceiveProps(nextProps){
    
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
                pathname: '/admin/profile/', 
                state: { id: this.props.user.id } 
              }}>
            {
                (this.props.user.firstName ? this.props.user.firstName : '') 
                + ' ' + 
                (this.props.user.middleName ? this.props.user.middleName.substring(0,1) : '')
                + ' ' + 
                (this.props.user.lastName ? this.props.user.lastName : '')
            }
          </Link>

          </div>
          <div className='role'>{
            this.props.role ? this.props.role : ''
          }</div>
        </div>
        <div className='user-image'  onClick={this.toggleUserLink} style={{backgroundImage: 'url(' + Profile +')'}}></div>
        
        {this.state.userLink ? 
            <div className='user-container'>
              <Link to='/'>
                <div className='user-bar'>
                  <span><i className='la la-home' />Home</span>
                </div>
              </Link>
              <div className='user-bar'>
                <span><i className='fa fa-user' />Profile</span>
              </div>
              <div className='user-bar'>
                <span><i className='fa fa-calendar' />Link Two</span>
              </div>
              <div className='user-bar'>
                <span><i className='fa fa-code' />Link Three</span>
              </div>
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
