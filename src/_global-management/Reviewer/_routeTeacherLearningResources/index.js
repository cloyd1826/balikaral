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
      <Route path='/teacher/management/learning-resources/add' component={AddReviewer} />
      <Route path='/teacher/management/learning-resources/list' component={ListReviewer} />
      <Route path='/teacher/management/learning-resources/edit' component={EditReviewer} />
      <Route path='/teacher/management/learning-resources/validate' component={ValidateReviewer} />
      <Route path='/teacher/management/learning-resources/view' component={ViewReviewer} />
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
            <NavLink to='/teacher/management/learning-resources/list' className='link' activeClassName='active'>
              List of Learning Resources
            </NavLink>
            <NavLink to='/teacher/management/learning-resources/add' className='link' activeClassName='active'>
              Add New Learning Resources
            </NavLink>
            {this.props.location.pathname === '/teacher/management/learning-resources/view' ? 
              <div className='link active'>
                View Learning Resources
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/learning-resources/edit' ? 
              <div className='link active'>
                Update Learning Resources
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/learning-resources/validate' ? 
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