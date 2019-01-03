import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import ListReviewer from '../ListReviewer'
import ViewReviewer from '../ViewReviewer'

const Routes = () => {
  return (
    <div>
      <Route path='/learner-start/reviewer/list/:type' component={ListReviewer} />
      <Route path='/learner-start/reviewer/view' component={ViewReviewer} />
    </div>
  )
}



class Reviewer extends Component {
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

export default Reviewer