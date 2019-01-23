import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

import AddExam from '../AddExam'
import ListExam from '../ListExam'
import EditExam from '../EditExam'
import ImportExam from '../ImportExam'
import ValidateExam from '../ValidateExam'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/teachers/exam/add' component={AddExam} />
			<Route path='/admin/teachers/exam/list' component={ListExam} />
      <Route path='/admin/teachers/exam/edit' component={EditExam} />
      <Route path='/admin/teachers/exam/import' component={ImportExam} />
      <Route path='/admin/teachers/exam/validate' component={ValidateExam} />
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
            <NavLink to='/admin/teachers/exam/list' className='link' activeClassName='active'>
              List of Exam Questions
            </NavLink>
            <NavLink to='/admin/teachers/exam/add' className='link' activeClassName='active'>
              Add New Exam Question
            </NavLink>
            <NavLink to='/admin/teachers/exam/import' className='link' activeClassName='active'>
              Import Exam Question
            </NavLink>
            {this.props.location.pathname === '/admin/teachers/exam/edit' ? 
              <div className='link active'>
                Update Exam Question
              </div>
            : null}
            {this.props.location.pathname === '/admin/teachers/exam/validate' ? 
              <div className='link active'>
                Validate Exam Question
              </div>
            : null}
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default Exam