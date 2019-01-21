import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import TakeSurvey from '../TakeSurvey'

const Routes = () => {
  return (
    <div>
      <Route path='/learner/survey/take' component={TakeSurvey} />
      
    </div>
  )
}


 
class Survey extends Component {
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

export default Survey