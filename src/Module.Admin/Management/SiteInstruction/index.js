import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import AddSiteInstruction from './AddSiteInstruction'
import ListSiteInstruction from './ListSiteInstruction'
import EditSiteInstruction from './EditSiteInstruction'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/site-instruction/add' component={AddSiteInstruction} />
			<Route path='/admin/management/site-instruction/list' component={ListSiteInstruction} />
			<Route path='/admin/management/site-instruction/edit' component={EditSiteInstruction} />
		</div>
	)
}



class SiteInstruction extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <div className='third-top-bar'>
            <NavLink to='/admin/management/site-instruction/list' className='link' activeClassName='active'>
              List of Site Instructions
            </NavLink>
            <NavLink to='/admin/management/site-instruction/add' className='link' activeClassName='active'>
              Add New Site Instruction
            </NavLink>
            {this.props.location.pathname === '/admin/management/site-instruction/edit' ? 
              <div className='link active'>
                Update Site Instruction Data
              </div>
            : null}
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default SiteInstruction