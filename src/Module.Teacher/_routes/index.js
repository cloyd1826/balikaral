import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Exam from '../../_global-management/Exam/_routeTeacher'

import GeneratedExam from '../../_global-management/GeneratedExam/_routeTeacher'


import Reviewer from '../../_global-management/Reviewer/_routeTeacher'

import UserProfile from '../../Page.Profile/_routesTeacher'


const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/teacher/dashboard' component={Dashboard} />
            <Route path='/teacher/management/exam' component={Exam} />
            <Route path='/teacher/management/reviewer' component={Reviewer} />
            
            <Route path='/teacher/generated-exam' component={GeneratedExam} />

            <Route path='/teacher/profile' component={UserProfile} />
        </div>

    )
}

export default Routes