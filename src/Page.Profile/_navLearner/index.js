import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { NavLink, withRouter } from 'react-router-dom'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() { 
    return (
        <div className='nav-bar'>
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/learner/profile/update-information', state: { id: this.props.location.state.id } } }
            >Personal Information</NavLink> 
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/learner/profile/update-account-info', state: { id: this.props.location.state.id } } }
            >Account Information</NavLink>
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/learner/profile/audit-trail', state: { id: this.props.location.state.id } } }
            >Audit Trail</NavLink>
        </div>
    )
  }
}

const NavAdmin = withRouter(Layout)
export default NavAdmin