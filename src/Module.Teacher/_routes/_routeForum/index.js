import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Forum from '../../../_global-management/Forum/_routeTeacher'

const Routes = () => {
	return (
		<div>
      <Route path='/teacher/forum' component={Forum} />
      
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
              Damayan
            </div>
            
            <Link 
                to={{ 
                  pathname: '/teacher/forum/dashboard',
                  state: {id: false}
                }}>
              <div className={'link ' + (this.props.location.pathname.match('/teacher/forum/') ? 'active' : '')}>
                <i className='la la-comments' />
                Forum Dashboard
              </div>
            </Link>
            
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default RouteManagement