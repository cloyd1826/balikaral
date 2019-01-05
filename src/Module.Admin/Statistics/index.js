import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import ExamType from './ExamType'
import GeneratedExam from './GeneratedExam'
import LearningStrand from './LearningStrand'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/statistics/exam-type' component={ExamType} />
      <Route path='/admin/statistics/generated-exam' component={GeneratedExam} />
			<Route path='/admin/statistics/learning-strand' component={LearningStrand} />
		</div>
	)
}



class Level extends Component {
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

export default Level