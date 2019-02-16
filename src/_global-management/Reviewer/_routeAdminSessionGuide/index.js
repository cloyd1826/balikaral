import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import AddReviewer from '../AddReviewer'
import ListReviewer from '../ListReviewer'
import EditReviewer from '../EditReviewer'
import EditUploaderValidator from '../EditUploaderValidator'
import ValidateReviewer from '../ValidateReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/admin/teachers/session-guide/add' component={AddReviewer} />
      <Route path='/admin/teachers/session-guide/list' component={ListReviewer} />
      <Route path='/admin/teachers/session-guide/edit' component={EditReviewer} />
      <Route path='/admin/teachers/session-guide/edit-uploader' component={EditUploaderValidator} />
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
              List of Teaching Resources
            </NavLink>
            <NavLink to='/admin/teachers/session-guide/add' className='link' activeClassName='active'>
              Add New Teaching Resources
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/session-guide/view' ? 
              <div className='link active'>
                View Teaching Resources
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/edit' ? 
              <div className='link active'>
                Update Teaching Resources
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/session-guide/validate' ? 
              <div className='link active'>
                Validate Teaching Resources
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer