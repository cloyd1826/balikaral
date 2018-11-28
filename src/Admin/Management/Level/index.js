import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddLevel from './AddLevel'
import ListLevel from './ListLevel'
import EditLevel from './EditLevel'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/level/add' component={AddLevel} />
			<Route path='/admin/management/level/list' component={ListLevel} />
			<Route path='/admin/management/level/edit' component={EditLevel} />
		</div>
	)
}



class Level extends Component {
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

export default Level