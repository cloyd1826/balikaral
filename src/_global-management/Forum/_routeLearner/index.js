import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import DashboardForum from '../DashboardForum'
import DiscussionForum from '../DiscussionForum'
import DiscussionAdd from '../DiscussionAdd'
import DiscussionView from '../DiscussionView'

const Routes = () => {
  return (
    <div>
      <Route path='/learner/forum/dashboard' component={DashboardForum} />
      <Route path='/learner/forum/discussions/list' component={DiscussionForum} />
      <Route path='/learner/forum/discussions/add' component={DiscussionAdd} />
      <Route path='/learner/forum/discussions/view' component={DiscussionView} />
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