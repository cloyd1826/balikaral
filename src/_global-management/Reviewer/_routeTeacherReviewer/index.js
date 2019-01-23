import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import ListReviewer from '../ListReviewer'
import EditReviewer from '../EditReviewer'
import ValidateReviewer from '../ValidateReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/teacher/management/reviewer/list' component={ListReviewer} />
      <Route path='/teacher/management/reviewer/edit' component={EditReviewer} />
      <Route path='/teacher/management/reviewer/validate' component={ValidateReviewer} />
      <Route path='/teacher/management/reviewer/view' component={ViewReviewer} />
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
            <NavLink to='/teacher/management/reviewer/list' className='link' activeClassName='active'>
              List of Reviewer
            </NavLink>
            {this.props.location.pathname === '/teacher/management/reviewer/view' ? 
              <div className='link active'>
                View Reviewer
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/reviewer/edit' ? 
              <div className='link active'>
                Update Reviewer
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/reviewer/validate' ? 
              <div className='link active'>
                Validate Reviewer
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer