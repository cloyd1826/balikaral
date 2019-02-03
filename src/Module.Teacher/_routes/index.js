import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import TeacherLearner from '../TeacherLearner'

import UserProfile from '../../Page.Profile/_routesTeacher'

import LearnerList from '../../Page.Profile/UserLearner'
import LearnerProfile from '../../Page.LearnerProfile/_routeTeacher'

import RouteTeacher from './_routeTeacher'
import RouteGeneratedExam from './_routeGeneratedExam'
import RouteForum from './_routeForum'


const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/teacher/dashboard' component={Dashboard} />
            
            <Route path='/teacher/management/' component={RouteTeacher} />
            <Route path='/teacher/forum/' component={RouteForum} />
            <Route path='/teacher/generated-exam/' component={RouteGeneratedExam} />


            <Route path='/teacher/profile' component={UserProfile} />


            <Route path='/teacher/learner-list' component={LearnerList} />
            <Route path='/teacher/your-students' component={TeacherLearner} />
            <Route path='/teacher/learner-profile' component={LearnerProfile} />
        </div>

    )
}

export default Routes