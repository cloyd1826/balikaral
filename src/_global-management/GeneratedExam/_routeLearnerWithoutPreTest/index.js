import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import CreatePreTest from '../CreatePreTest'
import TakeExam from '../TakeExam'
 
const Routes = () => { 
  return (
    <div>
      <Route path='/learner-start/pre-test/take' component={TakeExam} />
      <Route path='/learner-start/pre-test/create' component={CreatePreTest} />

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