import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'


import GeneratedExam from '../../../_global-management/GeneratedExam/_routeTeacher'

const Routes = () => {
	return (
		<div>
      <Route path='/teacher/generated-exam' component={GeneratedExam} />
      
		</div>
	)
}



class RouteManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentWillReceiveProps(nextProps){

  }
  render() { 
    return (
        <div>
          <div className='secondary-top-bar'>
            <div className='top-bar-title'>
              Tagumpay ng Mag-aaral
            </div>
            
            <Link to='/teacher/generated-exam/learner'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/generated-exam/') ? 'active' : '')}>
                <i className='la la-list-ol' />
                Learner Exam
              </div>
            </Link>
            
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement