import React, { Component } from 'react'

import Logo from '../../_images/logo.png'

import { Link } from 'react-router-dom'

import LogIn from '../LogIn'
import SignUp from '../SignUp'
import UserProfile from '../UserProfile'

import { connect } from 'react-redux'

class Layout extends Component {
	constructor(props){
		super(props)
		this.state = { 
			logIn: false,
			signUp: false,
			profile: true
		}
		this.toggleLogIn = this.toggleLogIn.bind(this)
		this.toggleSignUp = this.toggleSignUp.bind(this)
		this.toggleProfile = this.toggleProfile.bind(this)
	}
	toggleLogIn(){
		if(this.state.logIn){
			this.setState({
				logIn: false
			})
		}else{
			this.setState({
				logIn: true
			})
		}
	}
	toggleSignUp(){
		if(this.state.signUp){
			this.setState({
				signUp: false
			})
		}else{
			this.setState({
				signUp: true
			})
		}
	}
	toggleProfile(){
		if(this.state.profile){
			this.setState({
				profile: false
			})
		}else{
			this.setState({
				profile: true
			})
		}
	}
	
	render() {
	    return (
		    <div className='nav-container'>
		      <div className='grid-container fluid'>
		      	<div className='grid-x'>
		      		<div className='large-6 medium-12'>
		      			<Link to='/'>
		      			<div className='nav-icon'>
		      				<img src={Logo} alt='logo'/>
		      			</div>
		      			</Link>
		      		</div>
		      		<div className='large-6 medium-12 '>
		      			<div className='link-container'>
		      				{this.props.isLoggedIn ? 
		      					this.state.profile ? <UserProfile /> : null
		      				: 
		      					<div>
			      					<span className='log-in' onClick={this.toggleLogIn}>Log In</span>
			      					<span className='sign-up' onClick={this.toggleSignUp}>Sign Up</span>
		      					</div>
		      				}
		      				

		      				
		      			</div>
		      		</div>
		      	</div>
		      </div>

		      { this.state.logIn ? <LogIn close={this.toggleLogIn}/> : null }
		      { this.state.signUp ? <SignUp close={this.toggleSignUp}/> : null }

	      	</div>
	    	);
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }
}

const Nav = connect(mapStateToProps )(Layout)

export default Nav
