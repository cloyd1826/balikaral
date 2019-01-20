import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import ListSurvey from '../ListSurvey'
import ViewSurvey from '../ViewSurvey'

const Routes = () => {
  return (
    <div>
      <Route path='/admin/system/survey/list' component={ListSurvey} />
      <Route path='/admin/system/survey/view' component={ViewSurvey} />
    </div>
  )
}



class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <div className='third-top-bar'>
            <NavLink to='/admin/system/survey/list' className='link' activeClassName='active'>
              List of Surveys
            </NavLink>
            {this.props.location.pathname === '/admin/system/survey/view' ? 
              <div className='link active'>
                Survey Result
              </div>
            : null}
          </div>
          <Routes />
        </div>
    )
  }
}

export default Exam