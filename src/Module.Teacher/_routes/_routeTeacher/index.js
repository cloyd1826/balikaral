import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Exam from '../../../_global-management/Exam/_routeTeacher'
import Reviewer from '../../../_global-management/Reviewer/_routeTeacher'
import SessionGuide from '../../../_global-management/SessionGuide/_routeTeacher'



const Routes = () => {
	return (
		<div>
      <Route path='/teacher/management/exam/' component={Exam} />
      <Route path='/teacher/management/reviewer/' component={Reviewer} />
      <Route path='/teacher/management/session-guide/' component={SessionGuide} />
		</div>
	)
}



class RouteManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render() { 
    return (
        <div>
          <div className='secondary-top-bar'>
            <div className='top-bar-title'>
              Turuan
            </div>
            
            <Link to='/teacher/management/reviewer/list/teachers'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/management/reviewer') ? 'active' : '')}>
                <i className='la la-file-pdf-o' />
                Reviewer
              </div>
            </Link>
            <Link to='/teacher/management/session-guide/list/teachers'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/management/session-guide') ? 'active' : '')}>
                <i className='la  la-file-archive-o' />
                Session Guide
              </div>
            </Link>
            <Link to='/teacher/management/exam/list/teachers'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/management/exam') ? 'active' : '')}>
                <i className='la la-align-left' />
                Exam
              </div>
              
            </Link>
            
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement