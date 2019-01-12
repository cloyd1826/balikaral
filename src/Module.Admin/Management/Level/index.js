import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

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
          <div className='third-top-bar'>
            <NavLink to='/admin/management/level/list' className='link' activeClassName='active'>
              List of Levels
            </NavLink>
            <NavLink to='/admin/management/level/add' className='link' activeClassName='active'>
              Add New Level
            </NavLink>
            {this.props.location.pathname === '/admin/management/level/edit' ? 
              <div className='link active'>
                Update Level Data
              </div>
            : null}
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default Level