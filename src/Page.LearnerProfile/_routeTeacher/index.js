import React, {Component} from 'react'

import Grid from '../../_component/Grid'

import { Route } from 'react-router-dom'

import Profile from '../Profile'
import NavBar from '../_navTeacher'


import ExamTotal from '../ExamTotal'
import LearnerGeneratedExam from '../LearnerGeneratedExam'

const Routes = () => {
  return (
    <div className='user-route-container element-container'>
      <Route path='/teacher/learner-profile/exam-type' component={ExamTotal} />
      <Route path='/teacher/learner-profile/generated-exam' component={LearnerGeneratedExam} />
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
                <Grid.Cell large={3} medium={12} small={12}>
                  <Profile />
                </Grid.Cell>
                <Grid.Cell className='user-content' large={9} medium={12} small={12}>
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