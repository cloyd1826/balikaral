import React, { Component } from 'react'

import { Route } from 'react-router-dom'

import Home from '../Home'
import Test from '../Test'
import Admin from '../Admin'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/test-component' component={ Test } />
			<Route path='/admin' component={ Admin } />
			
		</div>
	)
}

export default Routes
