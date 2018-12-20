import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AvailableExam from '../AvailableExam'
import GenerateExam from '../GenerateExam'
import LearnerExam from '../LearnerExam'
import ResultExam from '../ResultExam'
 
const Routes = () => {
  return (
    <div>
      <Route path='/learner/exam/available/' component={AvailableExam} />
      <Route path='/learner/exam/take/' component={GenerateExam} />
      <Route path='/learner/exam/list' component={LearnerExam} />
      <Route path='/learner/exam/result' component={ResultExam} />
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