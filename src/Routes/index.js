import React from 'react'

import { Route } from 'react-router-dom'

import isAuth from '../_hoc/isAuth'

import Home from '../Page.Home'
import Test from '../Test'

import Admin from '../Module.Admin'
import Teacher from '../Module.Teacher'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/test-component' component={ Test } />
			<Route path='/admin' component={ isAuth(Admin) } />
			<Route path='/teacher' component={ isAuth(Teacher) } />
			
		</div>
	)
}

export default Routes
