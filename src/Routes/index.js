import React from 'react'

import { Route } from 'react-router-dom'

import isAuth from '../_hoc/isAuth'
import isTeacherAuth from '../_hoc/isTeacherAuth'
import isLearnerAuth from '../_hoc/isLearnerAuth'
import isLearnerWithoutPreTestAuth from '../_hoc/isLearnerWithoutPreTestAuth'

import Test from '../Test'


import Home from '../Page.Home'
import TeacherInstruction from '../Page.Teacher'
import ErrorPage from '../Page.Error'
import TermsOfService from '../Page.TermsOfService'
import PrivacyPolicy from '../Page.PrivacyPolicy'
import PreTestResult from '../Page.PreTestResult'


import Admin from '../Module.Admin'
import Teacher from '../Module.Teacher'
import Learner from '../Module.Learner'
import LearnerWithoutPreTest from '../Module.LearnerWithoutPreTest'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/terms-of-service' component={ TermsOfService } />
			<Route path='/error' component={ ErrorPage } />
			<Route path='/privacy-policy' component={ PrivacyPolicy } />
			<Route path='/admin' component={ isAuth(Admin) } />
			<Route path='/teacher' component={ isTeacherAuth(Teacher) } />
			<Route path='/learner' component={ isLearnerAuth(Learner) } />
			<Route path='/learner-start' component={ isLearnerWithoutPreTestAuth(LearnerWithoutPreTest) } />
			<Route path='/pre-test-result' component={ PreTestResult } />

			<Route path='/instruction/:type' component={ TeacherInstruction } />

			<Route path='/test' component={ Test } />

		</div>
	)
}

export default Routes
