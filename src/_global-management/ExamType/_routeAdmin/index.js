import React, {Component} from 'react'

import { Route, NavLink} from 'react-router-dom'

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
          <div className='third-top-bar'>
            <NavLink to='/admin/management/exam-type/list' className='link' activeClassName='active'>
              List of Exam Types
            </NavLink>
            <NavLink to='/admin/management/exam-type/add' className='link' activeClassName='active'>
              Add New Exam Type
            </NavLink>
            {this.props.location.pathname === '/admin/management/exam-type/edit' ? 
              <div className='link active'>
                Update Exam Type Data
              </div>
            : null}
            
          </div>
        	<Routes />
        </div>
    )
  }
}

export default ExamType