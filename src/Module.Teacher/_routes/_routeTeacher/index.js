import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Exam from '../../../_global-management/Exam/_routeTeacher'
import Reviewer from '../../../_global-management/Reviewer/_routeTeacherReviewer'
import LearningResources from '../../../_global-management/Reviewer/_routeTeacherLearningResources'
import SessionGuide from '../../../_global-management/Reviewer/_routeTeacherSessionGuide'



const Routes = () => {
	return (
		<div>
      <Route path='/teacher/management/exam/' component={Exam} />
      <Route path='/teacher/management/reviewer/' component={Reviewer} />
      <Route path='/teacher/management/learning-resources/' component={LearningResources} />
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
            
            <Link to='/teacher/management/reviewer/list'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/management/reviewer') ? 'active' : '')}>
                <i className='la la-file-pdf-o' />
                Reviewer
              </div>
            </Link>
            <Link to='/teacher/management/learning-resources/list'>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/management/learning-resources') ? 'active' : '')}>
                <i className='la la-file-movie-o' />
                Learning Resources
              </div>
            </Link>
            <Link to='/teacher/management/session-guide/list'>
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