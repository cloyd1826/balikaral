import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

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
          <div className='third-top-bar'>
            <NavLink to='/admin/management/landing-page/list' className='link' activeClassName='active'>
              List of Landing Page
            </NavLink>
            <NavLink to='/admin/management/landing-page/add' className='link' activeClassName='active'>
              Add New Landing Page
            </NavLink>
            {this.props.location.pathname === '/admin/management/landing-page/edit' ? 
              <div className='link active'>
                Update Landing Page
              </div>
            : null}
            
          </div>

        	<Routes />
        </div>
    )
  }
}

export default LandingPage