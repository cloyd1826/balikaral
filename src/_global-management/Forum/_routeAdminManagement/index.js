import React, {Component} from 'react'

import {Route,NavLink} from 'react-router-dom'

import AddForum from '../AddForum'
import ListForum from '../ListForum'
import EditForum from '../EditForum'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/forum/add' component={AddForum} />
			<Route path='/admin/management/forum/list/' component={ListForum} />
      <Route path='/admin/management/forum/edit' component={EditForum} />
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
            <NavLink to='/admin/management/forum/list' className='link' activeClassName='active'>
              List of Forums
            </NavLink>
            <NavLink to='/admin/management/forum/add' className='link' activeClassName='active'>
              Add New Forum
            </NavLink>
            {this.props.location.pathname === '/admin/management/forum/edit' ? 
              <div className='link active'>
                Update Forum Data
              </div>
            : null}
          </div>
        	<Routes />
        </div>
    )
  }
}

export default ManagementForum