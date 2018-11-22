import React, { Component } from 'react'

import { Route } from 'react-router-dom'

import Home from '../Home'
import Test from '../Test'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/test-component' exact component={ Test } />
			
		</div>
	)
}

export default Routes
