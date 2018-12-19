import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Reviewer from '../../_global-management/Reviewer/_routeLearner'
import Exam from '../../_global-management/Exam/_routeLearner'


const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/learner/dashboard' component={Dashboard} />
            <Route path='/learner/reviewer/' component={Reviewer} />
            <Route path='/learner/exam/' component={Exam} /> 
        </div>

    )
}

export default Routes