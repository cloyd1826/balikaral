import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddReviewer from './AddReviewer'
import ListReviewer from './ListReviewer'
import EditReviewer from './EditReviewer'
import SelfReviewer from './SelfReviewer'
import ViewReviewer from './ViewReviewer'

const Routes = () => {
	return (
		<div>
			<Route path='/teacher/management/reviewer/add' component={AddReviewer} />
			<Route path='/teacher/management/reviewer/list' component={ListReviewer} />
      <Route path='/teacher/management/reviewer/edit' component={EditReviewer} />
      <Route path='/teacher/management/reviewer/self' component={SelfReviewer} />
			<Route path='/teacher/management/reviewer/view' component={ViewReviewer} />
		</div>
	)
}



class Reviewer extends Component {
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

export default Reviewer