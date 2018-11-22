import React, { Component } from 'react'

import Logo from './Image/logo.png'

import {Link, NavLink, withRouter} from 'react-router-dom'

import LogIn from '../LogIn'
import SignUp from '../SignUp'

class Layout extends Component {
	constructor(props){
		super(props)
		this.state = { 
			logIn: false,
			signUp: false
		}
		this.toggleLogIn = this.toggleLogIn.bind(this)
		this.toggleSignUp = this.toggleSignUp.bind(this)
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
	render() {
	    return (
		    <div className='nav-container'>
		      <div className='grid-container fluid'>
		      	<div className='grid-x'>
		      		<div className='large-6 medium-12'>
		      			<div className='nav-icon'>
		      				<img src={Logo} alt='logo'/>
		      			</div>
		      		</div>
		      		<div className='large-6 medium-12 '>
		      			<div className='link-container'>
		      				<span className='log-in' onClick={this.toggleLogIn}>Log In</span>
		      				<span className='sign-up' onClick={this.toggleSignUp}>Sign Up</span>
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

const Nav = withRouter(Layout)

export default Nav
