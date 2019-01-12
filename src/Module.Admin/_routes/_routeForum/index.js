import React, {Component} from 'react'

import {Route, NavLink, Link, withRouter} from 'react-router-dom'

import Forum from '../../../_global-management/Forum/_routeAdmin'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/forum' component={Forum} />
      
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
              Forum
            </div>
            
            <Link 
                to={{
                  pathname: '/admin/forum/dashboard',
                  state: {id: false}
                }}>
              <div className={'link ' + (this.props.location.pathname.match('/admin/forum/') ? 'active' : '')}>
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