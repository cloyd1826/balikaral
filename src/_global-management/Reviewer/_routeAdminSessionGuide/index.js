import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import AddReviewer from '../AddReviewer'
import ListReviewer from '../ListReviewer'
import EditReviewer from '../EditReviewer'
import ValidateReviewer from '../ValidateReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/admin/teachers/session-guide/add' component={AddReviewer} />
      <Route path='/admin/teachers/session-guide/list' component={ListReviewer} />
      <Route path='/admin/teachers/session-guide/edit' component={EditReviewer} />
      <Route path='/admin/teachers/session-guide/validate' component={ValidateReviewer} />
      <Route path='/admin/teachers/session-guide/view' component={ViewReviewer} />
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
          <div className='third-top-bar'>
            <NavLink to='/admin/teachers/session-guide/list' className='link' activeClassName='active'>
              List of Session Guides
            </NavLink>
            <NavLink to='/admin/teachers/session-guide/add' className='link' activeClassName='active'>
              Add New Session Guides
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/session-guide/view' ? 
              <div className='link active'>
                View Session Guides
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/edit' ? 
              <div className='link active'>
                Update Session Guides
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/validate' ? 
              <div className='link active'>
                Validate Session Guides
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer