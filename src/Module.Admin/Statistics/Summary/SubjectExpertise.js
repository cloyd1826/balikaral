import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import {Bar} from 'react-chartjs-2';

import moment from 'moment'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        
        subjectExpertise: {},
    		noYear: '',
    		total: '',
     
    }
    this.fetchGeneratedExam = this.fetchGeneratedExam.bind(this)
  }

  componentDidMount(){
    this.fetchGeneratedExam('', 1)
  }
  fetchGeneratedExam(status, page){
 

     apiRequest('get', '/user/subject-expertise', false, this.props.token)
     	.then((res)=>{
     		console.log(res)
     		this.setState({
     			subjectExpertise: res.data.subjectExpertise,
     			noYear: res.data.noYear,
     			total: res.data.total,
     		})
     	})
     	.catch((err)=>{})
  }
  
  render() {
  		let subjectExpertise = this.state.subjectExpertise
  		let noYear = this.state.noYear
  		let labels = Object.keys(subjectExpertise)
  		let ageData = []
  		let backgroundColor = []
  		let borderColor = []

  		labels.map((attr)=>{
  			ageData = [...ageData, subjectExpertise[attr]]
  			backgroundColor = [...backgroundColor, 'rgba(255, 99, 132, 0.2)']
  			borderColor = [...borderColor, 'rgba(255, 99, 132, 0.2)']
  		})
  		
  		labels = [...labels, 'No Data']
  		ageData = [...ageData, noYear]
  		backgroundColor = [...backgroundColor, 'rgba(255, 99, 132, 0.2)']
  		borderColor = [...borderColor, 'rgba(255, 99, 132, 0.2)']

  		let data =  {
			labels: labels,
			datasets: [{
			label: 'Subject of Expertise',
			data: ageData,
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: 1
			}]
		}


    return (
   
				  
				    	<Grid.Cell large={12} medium={12}  small={12}>
				    		<div className='bar-chart-label'>
								<div className='name'>Subject of Expertise</div>
								
							</div>
	    					<Bar 
	    						data={data}
	    						height={75}
	    						options={{
						        animation: false
						    	}} />
	    				

				    		
							
							   
				    	</Grid.Cell>

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