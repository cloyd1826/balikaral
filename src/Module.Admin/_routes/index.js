import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'

import Level from '../Management/Level'
import LearningStrand from '../Management/LearningStrand'
import Subject from '../Management/Subject'

import Exam from '../../_global-management/Exam/_routeAdmin'
import ExamType from '../../_global-management/ExamType/_routeAdmin'
import Reviewer from '../../_global-management/Reviewer/_routeAdmin'
import GeneratedExam from '../../_global-management/GeneratedExam/_routeAdmin'

import UserView from '../../Page.Profile/_routeAdmin'


import User from '../User'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />

            <Route path='/admin/management/level' component={Level} />
            <Route path='/admin/management/learning-strand' component={LearningStrand} />
            <Route path='/admin/management/subject' component={Subject} />

            <Route path='/admin/management/exam' component={Exam} />
            <Route path='/admin/management/exam-type' component={ExamType} />
            <Route path='/admin/management/reviewer' component={Reviewer} />
            <Route path='/admin/user' component={User} />

            <Route path='/admin/generated-exam/' component={GeneratedExam} />

            <Route path='/admin/user-view' component={UserView} />
        </div>

    )
}

export default Routes