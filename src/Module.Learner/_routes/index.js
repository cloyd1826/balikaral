import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Reviewer from '../../_global-management/Reviewer/_routeLearner'
import GeneratedExam from '../../_global-management/GeneratedExam/_routeLearner'

import Survey from '../../_global-management/Survey/_routeLearner'

import UserProfile from '../../Page.Profile/_routesLearner'

import Forum from '../../_global-management/Forum/_routeLearner'


const Routes = () => { 
  return (
        <div className='admin-content'>
            <Route path='/learner/dashboard' component={Dashboard} />
            <Route path='/learner/reviewer/' component={Reviewer} />
            <Route path='/learner/exam/' component={GeneratedExam} /> 

            <Route path='/learner/survey/' component={Survey} /> 

            <Route path='/learner/forum' component={Forum} />

            <Route path='/learner/profile' component={UserProfile} />

        </div>

    )
}

export default Routes