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
      <Route path='/admin/teachers/learning-resources/add' component={AddReviewer} />
      <Route path='/admin/teachers/learning-resources/list' component={ListReviewer} />
      <Route path='/admin/teachers/learning-resources/edit' component={EditReviewer} />
      <Route path='/admin/teachers/learning-resources/validate' component={ValidateReviewer} />
      <Route path='/admin/teachers/learning-resources/view' component={ViewReviewer} />
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
            <NavLink to='/admin/teachers/learning-resources/list' className='link' activeClassName='active'>
              List of Learning Resources
            </NavLink>
            <NavLink to='/admin/teachers/learning-resources/add' className='link' activeClassName='active'>
              Add New Learning Resources
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/learning-resources/view' ? 
              <div className='link active'>
                View Learning Resources
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/learning-resources/edit' ? 
              <div className='link active'>
                Update Learning Resources
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/learning-resources/validate' ? 
              <div className='link active'>
                Validate Learning Resources
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer