import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../../_redux/actions/user'

import { Link } from 'react-router-dom'

import config from '../../../_config'
import ImageLoader from '../../../_component/ImageLoader'

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
            {this.props.type === 'local' ? 
              <Link to={{ 
                    pathname: '/admin/user-view/update-information', 
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
            : null}
            {this.props.type !== 'local' ? 
              (this.props.user.firstName ? this.props.user.firstName : '' )
            : null}
          </div>
          <div className='role'>{
            this.props.role ? this.props.role : ''
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

              {this.props.type === 'local' ? 
                <Link to={{ 
                  pathname: '/admin/user-view/update-information', 
                  state: { id: this.props.user.id } 
                }}>
                  <div className='user-bar'>
                    <span><i className='fa fa-user' />Profile</span>
                  </div>
                </Link>
              : null}
              
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
    role: state.role,
    type: state.type
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
