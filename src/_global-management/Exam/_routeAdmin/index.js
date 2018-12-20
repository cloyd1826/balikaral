import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddExam from '../AddExam'
import ListExam from '../ListExam'
import EditExam from '../EditExam'
import ImportExam from '../ImportExam'
import ValidateExam from '../ValidateExam'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/exam/add' component={AddExam} />
			<Route path='/admin/management/exam/list/:type' component={ListExam} />
      <Route path='/admin/management/exam/edit' component={EditExam} />
      <Route path='/admin/management/exam/import' component={ImportExam} />
      <Route path='/admin/management/exam/validate' component={ValidateExam} />
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