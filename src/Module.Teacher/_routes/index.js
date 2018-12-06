import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Exam from '../../_global-management/Exam/_routeTeacher'


const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/teacher/dashboard' component={Dashboard} />
            <Route path='/teacher/management/exam' component={Exam} />
        </div>

    )
}

export default Routes