import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { Route } from 'react-router-dom'

import Profile from '../Profile'
import NavBar from '../_navTeacher'

import UpdateInformation from '../UpdateInformation'
import UpdatePassword from '../UpdatePassword'

const Routes = () => {
  return (
    <div className='user-route-container element-container'>
      <Route path='/teacher/profile/update-information' component={UpdateInformation} />
      <Route path='/teacher/profile/update-account-info' component={UpdatePassword} />
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