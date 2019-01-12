import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import User from '../../User'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/user' component={User} />
      
		</div>
	)
}



class RouteManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentWillReceiveProps(nextProps){

  }
  render() { 
    return (
        <div>
          <div className='secondary-top-bar'>
            <div className='top-bar-title'>
              Mga User
            </div>
            
            <Link to='/admin/user/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/user/list') ? 'active' : '')}>
                <i className='la la-user' />
                List of Users
              </div>
            </Link>
            <Link to='/admin/user/add'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/user/add') ? 'active' : '')}>
                <i className='la la-user-plus' />
                Add User
              </div>
            </Link>
            
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement