import React, {Component} from 'react'

import {Route} from 'react-router-dom'

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
        	<Routes />
        </div>
    )
  }
}

export default ManagementForum