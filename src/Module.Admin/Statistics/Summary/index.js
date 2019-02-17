import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import AgeCount from './AgeCount'
import YearInAls from './YearInAls'
import UserGender from './UserGender'
import Occupation from './Occupation'
import Region from './Region'
import RegisteredExaminee from './RegisteredExaminee'
import LetPasser from './LetPasser'
import NoOfYearTeaching from './NoOfYearTeaching'
import NoOfYearTeachingAls from './NoOfYearTeachingAls'
import SubjectExpertise from './SubjectExpertise'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        

    }
  }

  render() {
  		

    return (
    	<Grid fluid>
	        <div className='element-container'>
	          <div className='title-text-container hide-for-large'>
	              <div className='title'>Summary of User Data</div>
	          </div>
	        <Grid.X>
	          <Grid.Cell large={12} medium={6} small={12}>
	          </Grid.Cell>
	        </Grid.X>
	        <Grid.X className="chart-data-container">
	        	<AgeCount />
	        	<UserGender />
	        	<Occupation />
	        	<Region />
	        	<YearInAls />
	        	<RegisteredExaminee />
	        	<LetPasser />
	        	<NoOfYearTeaching />
	        	<NoOfYearTeachingAls />
	        	<SubjectExpertise />

	        </Grid.X>
	       
        </div>
       </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    role: state.role
  }
}
const ExamTotal = connect(mapStateToProps)(Layout)
export default ExamTotal