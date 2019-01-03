import React from 'react'

import { Route } from 'react-router-dom'

import isAuth from '../_hoc/isAuth'
import isTeacherAuth from '../_hoc/isTeacherAuth'
import isLearnerAuth from '../_hoc/isLearnerAuth'
import isLearnerWithoutPreTestAuth from '../_hoc/isLearnerWithoutPreTestAuth'

import Home from '../Page.Home'
import TermsOfService from '../Page.TermsOfService'
import PrivacyPolicy from '../Page.PrivacyPolicy'

import Admin from '../Module.Admin'
import Teacher from '../Module.Teacher'
import Learner from '../Module.Learner'
import LearnerWithoutPreTest from '../Module.LearnerWithoutPreTest'

const Routes = () => {
	return (
		<div>
			<Route path='/' exact component={ Home } />
			<Route path='/terms-of-service' component={ TermsOfService } />
			<Route path='/privacy-policy' component={ PrivacyPolicy } />
			<Route path='/admin' component={ isAuth(Admin) } />
			<Route path='/teacher' component={ isTeacherAuth(Teacher) } />
			<Route path='/learner' component={ isLearnerAuth(Learner) } />
			<Route path='/learner-start' component={ isLearnerWithoutPreTestAuth(LearnerWithoutPreTest) } />
			
		</div>
	)
}

export default Routes
