import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { Route } from 'react-router-dom'

import Profile from '../Profile'
import NavBar from '../_navAdmin'

import UpdateInformation from '../UpdateInformation'
import UpdatePassword from '../UpdatePassword'
import AuditTrail from '../AuditTrail'
import UpdateLearnerInformation from '../UpdateLearnerInformation'



const Routes = () => {
  return (
    <div className='user-route-container element-container'>
      <Route path='/admin/user-view/update-information' component={UpdateInformation} />
      <Route path='/admin/user-view/update-account-info' component={UpdatePassword} />
      <Route path='/admin/user-view/update-learner-info' component={UpdateLearnerInformation} />
      <Route path='/admin/user-view/audit-trail' component={AuditTrail} />

    </div>
  )
}



class UserAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
                <Grid.Cell large={4} medium={12} small={12}>
                  <Profile />
                </Grid.Cell>
                <Grid.Cell className='user-content' large={8} medium={12} small={12}>
                  <NavBar />
                  <Routes />
                </Grid.Cell>
            </Grid.X>
          </Grid>     
        </div>
    )
  }
}

export default UserAdmin