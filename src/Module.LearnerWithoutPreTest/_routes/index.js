import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GeneratedExam from '../../_global-management/GeneratedExam/_routeLearnerWithoutPreTest'
import Reviewer from '../../_global-management/Reviewer/_routeLearnerWithoutPreTest'
import UserProfile from '../../Page.Profile/_routesLearnerWithoutPreTest'


const Routes = () => { 
  return (
        <div className='admin-content'>
            <Route path='/learner-start/dashboard' component={Dashboard} />
            <Route path='/learner-start/pre-test' component={GeneratedExam} /> 
            <Route path='/learner-start/resources/' component={Reviewer} />
            <Route path='/learner-start/profile' component={UserProfile} />


        </div>

    )
}

export default Routes