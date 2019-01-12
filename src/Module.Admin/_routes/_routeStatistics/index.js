import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Statistics from '../../Statistics'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/statistics' component={Statistics} />
      
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
            
            <Link to='/admin/statistics/exam-type'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/statistics/exam-type') ? 'active' : '')}>
                <i className='la la-circle-o-notch' />
                Statistics ng Exam Type
              </div>
              
            </Link>
            <Link to='/admin/statistics/generated-exam'>
              <div className={'link ' + (this.props.location.pathname.match('/admin/statistics/generated-exam') ? 'active' : '')}>
                <i className='la la-tasks' />
                Statistics ng mga Exam
              </div>
              
            </Link>
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement