import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Level from '../../Management/Level'
import LearningStrand from '../../Management/LearningStrand'
import Subject from '../../Management/Subject'
import ExamType from '../../../_global-management/ExamType/_routeAdmin'
import LandingPage from '../../Management/LandingPage'
import ManagementForum from '../../../_global-management/Forum/_routeAdminManagement'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/level/' component={Level} />
      <Route path='/admin/management/learning-strand/' component={LearningStrand} />
      <Route path='/admin/management/landing-page/' component={LandingPage} />
      <Route path='/admin/management/subject/' component={Subject} />
      <Route path='/admin/management/exam-type/' component={ExamType} />
      <Route path='/admin/management/forum/' component={ManagementForum} />
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
              Pandayan
            </div>
            
            <Link to='/admin/management/level/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/level') ? 'active' : '')}>
                <i className='la la-sort-amount-asc' />
                Level
              </div>
              
            </Link>
            <Link to='/admin/management/learning-strand/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/learning-strand') ? 'active' : '')}>
                <i className='la la-align-left' />
                Learning Strand
              </div>
              
            </Link>
            <Link to='/admin/management/subject/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/subject') ? 'active' : '')}>
                <i className='la la-align-center' />
                Modyul
              </div>
            </Link>
            <Link to='/admin/management/exam-type/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/exam-type') ? 'active' : '')}>
                <i className='la la-th-list' />
                Exam Type
              </div>
            </Link>
             <Link to='/admin/management/forum/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/forum') ? 'active' : '')}>
                <i className='la la-comment' />
                Forum
              </div>
            </Link>
            <Link to='/admin/management/landing-page/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/management/landing-page') ? 'active' : '')}>
                <i className='la la-institution' />
                Landing Page
              </div>
            </Link>
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement