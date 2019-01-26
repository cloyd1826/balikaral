import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Exam from '../../../_global-management/Exam/_routeAdmin'
import Reviewer from '../../../_global-management/Reviewer/_routeAdminReviewer'
import LearningResources from '../../../_global-management/Reviewer/_routeAdminLearningResources'
import SessionGuide from '../../../_global-management/Reviewer/_routeAdminSessionGuide'



const Routes = () => {
	return (
		<div>
      <Route path='/admin/teachers/exam/' component={Exam} />
      <Route path='/admin/teachers/reviewer/' component={Reviewer} />
      <Route path='/admin/teachers/learning-resources/' component={LearningResources} />
      <Route path='/admin/teachers/session-guide/' component={SessionGuide} />
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
              Saya ng Naglilingkod
            </div>
            
            
            <Link to='/admin/teachers/reviewer/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/reviewer') ? 'active' : '')}>
                <i className='la  la-file-pdf-o' />
                Modyul (Module)
              </div>
            </Link>
            <Link to='/admin/teachers/learning-resources/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/learning-resources') ? 'active' : '')}>
                <i className='la la-file-movie-o' />
                 Learning Resources
              </div>
            </Link>

            <Link to='/admin/teachers/session-guide/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/session-guide') ? 'active' : '')}>
                <i className='la  la-file-archive-o' />
                Session Guide
              </div>
            </Link>


            <Link to='/admin/teachers/exam/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/exam') ? 'active' : '')}>
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