import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import ListUser from './ListUser'
import EditUser from './EditUser'
import AddUser from './AddUser'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/user/list' component={ListUser} />
      <Route path='/admin/user/edit' component={EditUser} />
			<Route path='/admin/user/add' component={AddUser} />
		</div>
	)
}


class User extends Component {
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

export default User