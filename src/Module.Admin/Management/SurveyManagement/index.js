import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import AddSurvey from './AddSurvey'
import ListSurvey from './ListSurvey'
import EditSurvey from './EditSurvey'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/survey-management/add' component={AddSurvey} />
			<Route path='/admin/management/survey-management/list' component={ListSurvey} />
			<Route path='/admin/management/survey-management/edit' component={EditSurvey} />
		</div>
	)
}



class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <div className='third-top-bar'>
            <NavLink to='/admin/management/survey-management/list' className='link' activeClassName='active'>
              List of Survey Management
            </NavLink>
            <NavLink to='/admin/management/survey-management/add' className='link' activeClassName='active'>
              Add New Survey Management
            </NavLink>
            {this.props.location.pathname === '/admin/management/survey-management/edit' ? 
              <div className='link active'>
                Update Survey Management Data
              </div>
            : null}
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default Survey