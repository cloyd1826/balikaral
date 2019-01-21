import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Exam from '../../../_global-management/Exam/_routeAdmin'
import Reviewer from '../../../_global-management/Reviewer/_routeAdmin'
import SessionGuide from '../../../_global-management/SessionGuide/_routeAdmin'



const Routes = () => {
	return (
		<div>
      <Route path='/admin/teachers/exam/' component={Exam} />
      <Route path='/admin/teachers/reviewer/' component={Reviewer} />
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
            
            <Link to='/admin/teachers/reviewer/list/all'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/reviewer') ? 'active' : '')}>
                <i className='la  la-file-pdf-o' />
                Reviewer
              </div>
            </Link>

            <Link to='/admin/teachers/session-guide/list/all'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/teachers/session-guide') ? 'active' : '')}>
                <i className='la  la-file-archive-o' />
                Session Guide
              </div>
            </Link>


            <Link to='/admin/teachers/exam/list/all'>
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