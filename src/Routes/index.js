import React from 'react'

import { Route } from 'react-router-dom'

import isAuth from '../_hoc/isAuth'

import Home from '../Home'
import Test from '../Test'
import Admin from '../Admin'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/test-component' component={ Test } />
			<Route path='/admin' component={ isAuth(Admin) } />
			
		</div>
	)
}

export default Routes
