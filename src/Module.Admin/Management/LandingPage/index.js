import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddLandingPage from './AddLandingPage'
import ListLandingPage from './ListLandingPage'
import EditLandingPage from './EditLandingPage'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/landing-page/add' component={AddLandingPage} />
			<Route path='/admin/management/landing-page/list' component={ListLandingPage} />
			<Route path='/admin/management/landing-page/edit' component={EditLandingPage} />
		</div>
	)
}



class LandingPage extends Component {
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

export default LandingPage