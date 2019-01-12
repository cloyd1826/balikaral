import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

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
          <div className='third-top-bar'>
            <NavLink to='/admin/management/subject/list' className='link' activeClassName='active'>
              List of Modules
            </NavLink>
            <NavLink to='/admin/management/subject/add' className='link' activeClassName='active'>
              Add New Module
            </NavLink>
            {this.props.location.pathname === '/admin/management/subject/edit' ? 
              <div className='link active'>
                Update Module Data
              </div>
            : null}
            
          </div>

        	<Routes />
        </div>
    )
  }
}

export default Subject