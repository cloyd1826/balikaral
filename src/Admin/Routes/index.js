import React from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Level from '../Management/Level'
import LearningStrand from '../Management/LearningStrand'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />
            <Route path='/admin/management/level' component={Level} />
            <Route path='/admin/management/learning-strand' component={LearningStrand} />
        </div>

    )
}

export default Routes