import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import CreatePreTest from '../CreatePreTest'
import TakeExam from '../TakeExam'
import LearnerExam from '../LearnerExam'
 
const Routes = () => { 
  return (
    <div>
      <Route path='/learner-start/pre-test/take' component={TakeExam} />
      <Route path='/learner-start/pre-test/create' component={CreatePreTest} />
      <Route path='/learner-start/pre-test/list' component={LearnerExam} />

    </div>
  )
}

class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
          <Routes />
        </div>
    )
  }
}

export default Exam