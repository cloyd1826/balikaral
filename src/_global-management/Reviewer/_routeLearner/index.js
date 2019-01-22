import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import ListReviewer from '../ListReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/learner/resources/reviewer/list' component={ListReviewer} />
      <Route path='/learner/resources/reviewer/view' component={ViewReviewer} />
      <Route path='/learner/resources/learning-resources/list' component={ListReviewer} />
      <Route path='/learner/resources/learning-resources/view' component={ViewReviewer} />
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
            <NavLink to='/learner/resources/reviewer/list' className='link' activeClassName='active'>
              Reviewers
            </NavLink>
            <NavLink to='/learner/resources/learning-resources/list' className='link' activeClassName='active'>
              Learning Resources
            </NavLink>
            {this.props.location.pathname === '/learner/resources/reviewer/view' ? 
              <div className='link active'>
                View Reviewer
              </div>
            : null}
            {this.props.location.pathname === '/learner/resources/learning-resources/view' ? 
              <div className='link active'>
                View Learning Resource
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer