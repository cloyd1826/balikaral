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
      <Route path='/teacher/management/exam/add' component={AddExam} />
      <Route path='/teacher/management/exam/edit' component={EditExam} />
      <Route path='/teacher/management/exam/import' component={ImportExam} />
      <Route path='/teacher/management/exam/validate' component={ValidateExam} />
      <Route path='/teacher/management/exam/list' component={ListExam} />
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
            <NavLink to='/teacher/management/exam/list' className='link' activeClassName='active'>
              List of Exam Questions
            </NavLink>
            
            <NavLink to='/teacher/management/exam/add' className='link' activeClassName='active'>
              Add New Exam Question
            </NavLink>
            <NavLink to='/teacher/management/exam/import' className='link' activeClassName='active'>
              Import Exam Question
            </NavLink>
            {this.props.location.pathname === '/teacher/management/exam/edit' ? 
              <div className='link active'>
                Update Exam Question
              </div>
            : null}
            {this.props.location.pathname === '/teacher/management/exam/validate' ? 
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