import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddSessionGuide from './AddSessionGuide'
import ListSessionGuide from './ListSessionGuide'
import EditSessionGuide from './EditSessionGuide'
import SelfSessionGuide from './SelfSessionGuide'
import ViewSessionGuide from './ViewSessionGuide'

const Routes = () => {
	return (
		<div>
			<Route path='/teacher/management/reviewer/add' component={AddSessionGuide} />
			<Route path='/teacher/management/reviewer/list' component={ListSessionGuide} />
      <Route path='/teacher/management/reviewer/edit' component={EditSessionGuide} />
      <Route path='/teacher/management/reviewer/self' component={SelfSessionGuide} />
			<Route path='/teacher/management/reviewer/view' component={ViewSessionGuide} />
		</div>
	)
}



class SessionGuide extends Component {
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

export default SessionGuide