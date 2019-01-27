import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'
 
import ListReviewer from '../ListReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/teacher/management/session-guide/list' component={ListReviewer} />     
      <Route path='/teacher/management/session-guide/view' component={ViewReviewer} />
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
            <NavLink to='/teacher/management/session-guide/list' className='link' activeClassName='active'>
              List of Teaching Resources
            </NavLink>
           
            {this.props.location.pathname === '/teacher/management/session-guide/view' ? 
              <div className='link active'>
                View Teaching Resources
              </div>
            : null}
          
          </div>
          <Routes />
        </div>
    )
  }
}

export default Reviewer