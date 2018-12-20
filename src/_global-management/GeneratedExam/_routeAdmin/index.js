import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import LearnerExam from '../LearnerExam'
import ResultExam from '../ResultExam'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/generated-exam/learner' component={LearnerExam} />
			<Route path='/admin/generated-exam/result' component={ResultExam} />
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