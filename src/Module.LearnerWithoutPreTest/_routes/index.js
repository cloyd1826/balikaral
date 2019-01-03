import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GeneratedExam from '../../_global-management/GeneratedExam/_routeLearnerWithoutPreTest'


const Routes = () => { 
  return (
        <div className='admin-content'>
            <Route path='/learner-start/dashboard' component={Dashboard} />
            <Route path='/learner-start/pre-test' component={GeneratedExam} /> 

        </div>

    )
}

export default Routes