import React, { Component } from 'react'

import TopBar from './_topbar'
import ResultPreTest from '../_global-management/GeneratedExam/ResultPreTest'


class Learner extends Component{
  
  render() {
    return ( 
      <div className='admin-container'>
          	<TopBar />
          	<div className='admin-content'>
            	<ResultPreTest />
        	</div>
      </div>
    );
  }
}

export default Learner
