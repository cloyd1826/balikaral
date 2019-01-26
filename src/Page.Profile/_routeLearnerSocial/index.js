import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { Route } from 'react-router-dom'


import UpdateLearnerInformation from '../UpdateLearnerInformation'

const Routes = () => {
  return (
    <div className='user-route-container element-container'>
      <Route path='/learner/profile-social/update-learner-info' component={UpdateLearnerInformation} />
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
                <Grid.Cell className='user-content' large={12} medium={12} small={12}>
                  <Routes />
                </Grid.Cell>
            </Grid.X>
          </Grid>     
        </div>
    )
  }
}

export default UserAdmin