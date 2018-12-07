import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'

import Level from '../Management/Level'
import LearningStrand from '../Management/LearningStrand'
import Exam from '../../_global-management/Exam/_routeAdmin'
import Reviewer from '../../_global-management/Reviewer/_routeAdmin'


import User from '../User'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />
            <Route path='/admin/management/level' component={Level} />
            <Route path='/admin/management/learning-strand' component={LearningStrand} />
            <Route path='/admin/management/exam' component={Exam} />
            <Route path='/admin/management/reviewer' component={Reviewer} />
            <Route path='/admin/user' component={User} />
        </div>

    )
}

export default Routes