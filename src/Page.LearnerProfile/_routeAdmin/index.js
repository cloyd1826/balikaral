import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { Route } from 'react-router-dom'

import Profile from '../Profile'

const Routes = () => {
  return (
    <div className='user-route-container element-container'>

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
                <Grid.Cell large={12} medium={12} small={12}>
                  <Profile />
                </Grid.Cell>
                <Grid.Cell className='user-content' large={12} medium={12} small={12}>

                </Grid.Cell>
            </Grid.X>
          </Grid>     
        </div>
    )
  }
}

export default UserAdmin