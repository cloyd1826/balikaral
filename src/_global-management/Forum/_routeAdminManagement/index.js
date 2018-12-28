import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddForum from '../AddForum'
import ListForum from '../ListForum'
import EditForum from '../EditForum'
import DashboardForum from '../DashboardForum'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/forum/add' component={AddForum} />
			<Route path='/admin/management/forum/list/' component={ListForum} />
      <Route path='/admin/management/forum/edit' component={EditForum} />
      <Route path='/admin/management/forum/dashboard' component={DashboardForum} />
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
        	<Routes />
        </div>
    )
  }
}

export default ManagementForum