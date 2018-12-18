import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddExamType from '../AddExamType'
import EditExamType from '../EditExamType'
import ListExamType from '../ListExamType'

const Routes = () => {
	return (
		<div>
      <Route path='/admin/management/exam-type/add' component={AddExamType} />
      <Route path='/admin/management/exam-type/edit' component={EditExamType} />
			<Route path='/admin/management/exam-type/list' component={ListExamType} />
		</div>
	)
}

class ExamType extends Component {
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

export default ExamType