import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import LearnerExam from '../LearnerExam'
import ResultExam from '../ResultExam'

const Routes = () => {
  return (
    <div>
      <Route path='/teacher/generated-exam/learner' component={LearnerExam} />
      <Route path='/teacher/generated-exam/result' component={ResultExam} />
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
          <div className='third-top-bar'>
            <NavLink to={{ 
                pathname: '/teacher/generated-exam/learner', 
                state: {learner: this.props.location.state.learner}
              }} className='link' activeClassName='active'>
              List of Generated Exam
            </NavLink>
            {this.props.location.pathname === '/teacher/generated-exam/result' ? 
              <div className='link active'>
                Result of Exam
              </div>
            : null}
            
          </div>
          <Routes />
        </div>
    )
  }
}

export default Exam