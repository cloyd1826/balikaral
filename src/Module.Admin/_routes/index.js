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

import ManagementForum from '../../_global-management/Forum/_routeAdminManagement'

import Forum from '../../_global-management/Forum/_routeAdmin'

import UserView from '../../Page.Profile/_routeAdmin'

import LearnerProfile from '../../Page.LearnerProfile/_routeAdmin'
import LearnerList from '../../Page.Profile/UserLearner'

import User from '../User'
import Statistics from '../Statistics'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />

            <Route path='/admin/management/level' component={Level} />
            <Route path='/admin/management/learning-strand' component={LearningStrand} />
            <Route path='/admin/management/subject' component={Subject} />
            <Route path='/admin/management/forum' component={ManagementForum} />

            <Route path='/admin/forum' component={Forum} />

            <Route path='/admin/management/exam' component={Exam} />
            <Route path='/admin/management/exam-type' component={ExamType} />
            <Route path='/admin/management/reviewer' component={Reviewer} />
            <Route path='/admin/user' component={User} />

            <Route path='/admin/statistics/' component={Statistics} />


            <Route path='/admin/generated-exam/' component={GeneratedExam} />

            <Route path='/admin/learner-profile/' component={LearnerProfile} />
            <Route path='/admin/learner-list' component={LearnerList} />

            <Route path='/admin/user-view' component={UserView} />
        </div>

    )
}

export default Routes