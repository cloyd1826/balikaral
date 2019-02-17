import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import GeneratedExam from '../../Statistics/GeneratedExam'
import ExamType from '../../Statistics/ExamType'
import Summary from '../../Statistics/Summary'
import AuditTrail from '../../AuditTrail'

import Survey from '../../../_global-management/Survey/_routeAdmin'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/system/exam-type' component={ExamType} />
      <Route path='/admin/system/summary' component={Summary} />
      <Route path='/admin/system/generated-exam' component={GeneratedExam} />
      <Route path='/admin/system/audit-trail' component={AuditTrail} />
			<Route path='/admin/system/survey' component={Survey} />
      
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
              Galing ng Sistema
            </div>
            
            <Link to='/admin/system/exam-type'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/system/exam-type') ? 'active' : '')}>
                <i className='la la-circle-o-notch' />
                Statistics ng Exam Type
              </div>
              
            </Link>
            <Link to='/admin/system/generated-exam'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/system/generated-exam') ? 'active' : '')}>
                <i className='la la-tasks' />
                Statistics ng mga Exam
              </div>
              
            </Link>
            <Link to='/admin/system/summary'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/system/summary') ? 'active' : '')}>
                <i className='la la-tasks' />
                Summary of User Data
              </div>
              
            </Link>
             <Link to='/admin/system/audit-trail'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/system/audit-trail') ? 'active' : '')}>
                <i className='la la-hourglass' />
                History
              </div>
              
            </Link>
            <Link to='/admin/system/survey/list'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/system/survey') ? 'active' : '')}>
                <i className='la la-folder-open-o' />
                Survey
              </div>
              
            </Link>
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement