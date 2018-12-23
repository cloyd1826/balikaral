import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddSubject from './AddSubject'
import ListSubject from './ListSubject'
import EditSubject from './EditSubject'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/subject/add' component={AddSubject} />
			<Route path='/admin/management/subject/list' component={ListSubject} />
			<Route path='/admin/management/subject/edit' component={EditSubject} />
		</div>
	)
}



class Subject extends Component {
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

export default Subject