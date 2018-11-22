import React, {Component} from 'react'

import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard'

const Routes = () => {
  return (
        <div className='admin-content'>
            <Route path='/admin/dashboard' component={Dashboard} />
        </div>

    )
}

export default Routes