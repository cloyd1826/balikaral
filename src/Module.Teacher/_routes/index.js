import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Exam from '../../_global-management/Exam/_routeTeacher'

import GeneratedExam from '../../_global-management/GeneratedExam/_routeTeacher'


import Reviewer from '../../_global-management/Reviewer/_routeTeacher'

import UserProfile from '../../Page.Profile/_routesTeacher'

import LearnerList from '../../Page.Profile/UserLearner'
import LearnerProfile from '../../Page.LearnerProfile/_routeTeacher'

import Forum from '../../_global-management/Forum/_routeTeacher'


const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/teacher/dashboard' component={Dashboard} />
            <Route path='/teacher/management/exam' component={Exam} />
            <Route path='/teacher/management/reviewer' component={Reviewer} />
            
            <Route path='/teacher/generated-exam' component={GeneratedExam} />

            <Route path='/teacher/profile' component={UserProfile} />

            <Route path='/teacher/forum' component={Forum} />


            <Route path='/teacher/learner-list' component={LearnerList} />
            <Route path='/teacher/learner-profile' component={LearnerProfile} />
        </div>

    )
}

export default Routes