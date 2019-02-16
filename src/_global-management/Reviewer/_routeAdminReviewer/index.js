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
      <Route path='/admin/teachers/reviewer/add' component={AddReviewer} />
      <Route path='/admin/teachers/reviewer/list' component={ListReviewer} />
      <Route path='/admin/teachers/reviewer/edit' component={EditReviewer} />
      <Route path='/admin/teachers/reviewer/edit-uploader' component={EditUploaderValidator} />
      <Route path='/admin/teachers/reviewer/validate' component={ValidateReviewer} />
      <Route path='/admin/teachers/reviewer/view' component={ViewReviewer} />
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
            <NavLink to='/admin/teachers/reviewer/list' className='link' activeClassName='active'>
              List of Modyul (Module)
            </NavLink>
            <NavLink to='/admin/teachers/reviewer/add' className='link' activeClassName='active'>
              Add New Modyul (Module)
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/reviewer/view' ? 
              <div className='link active'>
                View Modyul (Module)
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/reviewer/edit' ? 
              <div className='link active'>
                Update Modyul (Module)
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/reviewer/validate' ? 
              <div className='link active'>
                Validate Modyul (Module)
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer