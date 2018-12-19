import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddExam from '../AddExam'
import ListExam from '../ListExam'
import EditExam from '../EditExam'
import ImportExam from '../ImportExam'
import ValidateExam from '../ValidateExam'
import LearnerExam from '../LearnerExam'
import ResultExam from '../ResultExam'

const Routes = () => {
  return (
    <div>
      <Route path='/teacher/management/exam/add' component={AddExam} />
      <Route path='/teacher/management/exam/edit' component={EditExam} />
      <Route path='/teacher/management/exam/import' component={ImportExam} />
      <Route path='/teacher/management/exam/validate' component={ValidateExam} />
      <Route path='/teacher/management/exam/list/:type' component={ListExam} />
      <Route path='/teacher/management/exam/learner' component={LearnerExam} />
      <Route path='/teacher/management/exam/result' component={ResultExam} />
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