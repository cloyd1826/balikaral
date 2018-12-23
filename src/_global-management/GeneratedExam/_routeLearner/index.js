import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AvailableExam from '../AvailableExam'
import TakeExam from '../TakeExam'
import LearnerExam from '../LearnerExam'
import ResultExam from '../ResultExam'
import LearnerLearningStrand from '../LearnerLearningStrand'
import ExerciseExam from '../ExerciseExam'
 
const Routes = () => { 
  return (
    <div>
      <Route path='/learner/exam/available/' component={AvailableExam} />
      <Route path='/learner/exam/take/' component={TakeExam} />
      <Route path='/learner/exam/list' component={LearnerExam} />
      <Route path='/learner/exam/result' component={ResultExam} />
      <Route path='/learner/exam/learning-strand' component={LearnerLearningStrand} />
      <Route path='/learner/exam/exercise' component={ExerciseExam} />
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