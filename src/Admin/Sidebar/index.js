
import React, {Component} from 'react'


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-sidebar'>
            <div className='sidebar-content'>
              <div className='sidebar-title'>
                DASHBOARD TITLE
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-dashboard'></i>
                <span className='show-for-large-only'>Dashboard</span>
              </div>
            </div>


            <div className='sidebar-content'>
              <div className='sidebar-title'>
                TITLE TWO
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-edit'></i>
                <span className='show-for-large-only'>Link One</span>
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-bell'></i>
                <span className='show-for-large-only'>Link Two</span>
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-calendar'></i>
                <span className='show-for-large-only'>Link Three</span>
              </div>
            </div>

            <div className='sidebar-content'>
              <div className='sidebar-title'>
                TITLE THREE
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-comments'></i>
                <span className='show-for-large-only'>Link One</span>
              </div>
              <div className='sidebar-link'>
                <i className='fa fa-code'></i>
                <span className='show-for-large-only'>Link Two</span>
              </div>
            </div>
        </div>

    )
  }
}

export default Sidebar