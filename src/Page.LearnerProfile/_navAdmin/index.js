import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { NavLink, withRouter } from 'react-router-dom'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentDidMount(){
   
  }
  render() { 
    return (
        <div className='nav-bar'>
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/admin/learner-profile/exam-type', state: { id: this.props.location.state.id } } }
            >Exam Type</NavLink> 
          <NavLink 
            className='link' 
            activeClassName='active' 
            to={ { pathname:'/admin/learner-profile/generated-exam', state: { id: this.props.location.state.id } } }
            >Taken Exam</NavLink>
          
        </div>
    )
  }
}

const NavAdmin = withRouter(Layout)
export default NavAdmin