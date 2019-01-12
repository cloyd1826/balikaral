import React, {Component} from 'react'

import {Route, NavLink} from 'react-router-dom'

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
            <div className='third-top-bar'>
              <NavLink to='/admin/management/learning-strand/list' className='link' activeClassName='active'>
                List of Learning Strand
              </NavLink>
              <NavLink to='/admin/management/learning-strand/add' className='link' activeClassName='active'>
                Add New Learning Strand
              </NavLink>
              {this.props.location.pathname === '/admin/management/learning-strand/edit' ? 
                <div className='link active'>
                  Update Learning Strand Data
                </div>
              : null}
              
            </div>
        	<Routes />
        </div>
    )
  }
}

export default LearningStrand