import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { NavLink, withRouter } from 'react-router-dom'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentDidMount(){
    if(!this.props.location.state){
       this.props.history.push('/')
    }
 
  }
  render() { 
    return (
        <div className='nav-bar'>
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/teacher/profile/update-information', state: { id: this.props.location.state.id } } }
            >Personal Information</NavLink> 
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/teacher/profile/update-account-info', state: { id: this.props.location.state.id } } }
            >Account Information</NavLink>
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/teacher/profile/audit-trail', state: { id: this.props.location.state.id } } }
            >History</NavLink>
        </div>
    )
  }
}

const NavAdmin = withRouter(Layout)
export default NavAdmin