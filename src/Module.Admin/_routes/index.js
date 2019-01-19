import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'


 
import UserView from '../../Page.Profile/_routeAdmin'
import LearnerProfile from '../../Page.LearnerProfile/_routeAdmin'
import LearnerList from '../../Page.Profile/UserLearner'

import AuditTrail from '../AuditTrail'

import RouteManagement from './_routeManagement'
import RouteTeacher from './_routeTeacher'
import RouteStatistics from './_routeStatistics'
import RouteGeneratedExam from './_routeGeneratedExam'
import RouteUser from './_routeUser'
import RouteForum from './_routeForum'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />

            <Route path='/admin/management/' component={RouteManagement} />
            <Route path='/admin/teachers/' component={RouteTeacher} />
            <Route path='/admin/system/' component={RouteStatistics} />
            <Route path='/admin/audit-trail/' component={AuditTrail} />
            <Route path='/admin/forum/' component={RouteForum} />
            <Route path='/admin/user' component={RouteUser} />
            <Route path='/admin/generated-exam/' component={RouteGeneratedExam} />

            <Route path='/admin/learner-profile/' component={LearnerProfile} />
            <Route path='/admin/learner-list' component={LearnerList} />

            <Route path='/admin/user-view' component={UserView} />
        </div>

    )
}

export default Routes