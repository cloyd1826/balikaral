import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import AddLearningStrand from './AddLearningStrand'
import ListLearningStrand from './ListLearningStrand'
import EditLearningStrand from './EditLearningStrand'

const Routes = () => {
	return (
		<div>
			<Route path='/admin/management/learning-strand/add' component={AddLearningStrand} />
			<Route path='/admin/management/learning-strand/list' component={ListLearningStrand} />
			<Route path='/admin/management/learning-strand/edit' component={EditLearningStrand} />
		</div>
	)
}



class LearningStrand extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div>
        	<Routes />
        </div>
    )
  }
}

export default LearningStrand