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
        
        ageCount: {},
    		noBirthday: '',
    		total: '',
     
    }
    this.fetchGeneratedExam = this.fetchGeneratedExam.bind(this)
  }

  componentDidMount(){
    this.fetchGeneratedExam('', 1)
  }
  fetchGeneratedExam(status, page){
 

     apiRequest('get', '/user/occupation', false, this.props.token)
     	.then((res)=>{
     		console.log(res)
     		this.setState({
     			none: res.data.none,
          fulltime: res.data.fulltime,
          parttime: res.data.parttime,
          total: res.data.total,
     		})
     	})
     	.catch((err)=>{})
  }
  
  render() {
  		let data =  {
  			labels: ['Full Time','Part Time','No occupation','Total'],
  			datasets: [{
  			label: 'Occupation Type of Users',
  			data: [this.state.fulltime, this.state.parttime, this.state.none, this.state.total],
  			backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
        ],
  			borderWidth: 1
			}]
		}
    return (
   
				  
				    	<Grid.Cell large={12} medium={12}  small={12}>
				    		<div className='bar-chart-label'>
								<div className='name'>Occupation Type of Users</div>
								
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