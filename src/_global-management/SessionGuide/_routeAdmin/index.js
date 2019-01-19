import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import AddSessionGuide from '../AddSessionGuide'
import ListSessionGuide from '../ListSessionGuide'
import EditSessionGuide from '../EditSessionGuide'
import ValidateSessionGuide from '../ValidateSessionGuide'
import ViewSessionGuide from '../ViewSessionGuide'

const Routes = () => {
  return (
    <div>
      <Route path='/admin/teachers/session-guide/add' component={AddSessionGuide} />
      <Route path='/admin/teachers/session-guide/list/:type' component={ListSessionGuide} />
      <Route path='/admin/teachers/session-guide/edit' component={EditSessionGuide} />
      <Route path='/admin/teachers/session-guide/validate' component={ValidateSessionGuide} />
      <Route path='/admin/teachers/session-guide/view' component={ViewSessionGuide} />
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
          <div className='third-top-bar'>
            <NavLink to='/admin/teachers/session-guide/list/all' className='link' activeClassName='active'>
              List of Session Guide
            </NavLink>
            <NavLink to='/admin/teachers/session-guide/add' className='link' activeClassName='active'>
              Add New Session Guide
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/session-guide/view' ? 
              <div className='link active'>
                View Session Guide
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/edit' ? 
              <div className='link active'>
                Update Session Guide
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/validate' ? 
              <div className='link active'>
                Validate Session Guide
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default SessionGuide