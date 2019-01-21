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
      <Route path='/teacher/management/session-guide/add' component={AddSessionGuide} />
      <Route path='/teacher/management/session-guide/list/:type' component={ListSessionGuide} />
      <Route path='/teacher/management/session-guide/edit' component={EditSessionGuide} />
      <Route path='/teacher/management/session-guide/validate' component={ValidateSessionGuide} />
      <Route path='/teacher/management/session-guide/view' component={ViewSessionGuide} />
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
            <NavLink to='/teacher/management/session-guide/list/teachers' className='link' activeClassName='active'>
              Session Guide by other teachers
            </NavLink>
            <NavLink to='/teacher/management/session-guide/list/self' className='link' activeClassName='active'>
              Session Guide by yourself
            </NavLink>
            <NavLink to='/teacher/management/session-guide/add' className='link' activeClassName='active'>
              Add New Session Guide
            </NavLink>
            {this.props.location.pathname === '/teacher/management/session-guide/view' ? 
              <div className='link active'>
                View Session Guide
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/session-guide/edit' ? 
              <div className='link active'>
                Update Session Guide
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/session-guide/validate' ? 
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