import React from 'react'

import { Route } from 'react-router-dom'

import isAuth from '../_hoc/isAuth'
import isTeacherAuth from '../_hoc/isTeacherAuth'
import isLearnerAuth from '../_hoc/isLearnerAuth'

import Home from '../Page.Home'
import Test from '../Test'

import Admin from '../Module.Admin'
import Teacher from '../Module.Teacher'
import Learner from '../Module.Learner'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/test-component' component={ Test } />
			<Route path='/admin' component={ isAuth(Admin) } />
			<Route path='/teacher' component={ isTeacherAuth(Teacher) } />
			<Route path='/learner' component={ isLearnerAuth(Learner) } />
			
		</div>
	)
}

export default Routes
