import React, {Component} from 'react'

import {Route, NavLink, Link} from 'react-router-dom'

import DashboardForum from '../DashboardForum'
import DiscussionForum from '../DiscussionForum'
import DiscussionAdd from '../DiscussionAdd'
import DiscussionView from '../DiscussionView'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/forum/dashboard' component={DashboardForum} />
      <Route path='/admin/forum/discussions/list' component={DiscussionForum} />
      <Route path='/admin/forum/discussions/add' component={DiscussionAdd} />
      <Route path='/admin/forum/discussions/view' component={DiscussionView} />
		</div>
	)
} 

class ManagementForum extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          


          <div className='third-top-bar'>
            <NavLink
                className='link' 
                activeClassName='active'
                to={{
                  pathname: '/admin/forum/dashboard',
                  state: {id: false }
                }}
              >
              Forum List
            </NavLink>
            {this.props.location.state.id ? 
              <NavLink 
                className='link' 
                activeClassName='active'
                to={{
                  pathname: '/admin/forum/discussions/list',
                  state: {id: this.props.location.state.id}
                }}
                >
                List of Discussions
              </NavLink>
            : null}
            {this.props.location.pathname === '/admin/forum/discussions/add' && this.props.location.state.id  ? 
              <NavLink 
                className='link' 
                activeClassName='active'
                to={{
                  pathname: '/admin/forum/discussions/add',
                  state: {id: this.props.location.state.id}
                }}
              >
                Add New Discussion
              </NavLink>
            : null}
            {this.props.location.pathname === '/admin/forum/discussions/view' && this.props.location.state.id ? 
              <NavLink 
                className='link' 
                activeClassName='active'
                to={{
                  pathname: '/admin/forum/discussions/view',
                  state: {id: this.props.location.state.id}
                }}>
                Discussion Details
              </NavLink>
            : null}
          </div>
        	<Routes />
        </div>
    )
  }
}

export default ManagementForum