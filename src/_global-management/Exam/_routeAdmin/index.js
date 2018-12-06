import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddExam from '../AddExam'
import ListExam from '../ListExam'
import EditExam from '../EditExam'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/exam/add' component={AddExam} />
			<Route path='/admin/management/exam/list' component={ListExam} />
			<Route path='/admin/management/exam/edit' component={EditExam} />
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