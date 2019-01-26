import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import FormMessage from '../../../_component/Form/FormMessage'
import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import Pagination from '../../../_component/Pagination'

import {Bar} from 'react-chartjs-2';

import moment from 'moment'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        
     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,
      generatedExam: [],
    }
    this.formMessage = this.formMessage.bind(this)
    this.fetchGeneratedExam = this.fetchGeneratedExam.bind(this)
  	this.changePage = this.changePage.bind(this)
  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    let status = this.state.status
    this.fetchGeneratedExam(status, page)
  }

  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  componentDidMount(){
    this.fetchGeneratedExam('', 1)
  }
  fetchGeneratedExam(status, page){
  	apiRequest('get', `/generated-exam/all?status=${status}&page=${page}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
            	
               this.setState({
               	generatedExam: res.data.data,
               	currentPage: res.data.currentPage,
	            nextPage: res.data.nextPage,
	            pageCount: res.data.pageCount,
	            perPage: res.data.perPage,
	            previousPage: res.data.previousPage,
	            totalCount: res.data.totalCount,
               })
              
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  
  render() {
    return (
    	<Grid fluid>
	        <div className='element-container'>
	          <div className='title-text-container hide-for-large'>
	              <div className='title'>Statistics of Generated Exam</div>
	          </div>
	        <Grid.X>
	          <Grid.Cell large={12} medium={6} small={12}>
	            <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
	          </Grid.Cell>
	        </Grid.X>
	        <Grid.X className="chart-data-container">
	          
	            {this.state.generatedExam.map((attr, index)=>{
	            	
	            	let data =  {
					    labels: [],
					    datasets: [
					      {
					        label: 'Correct',
					        backgroundColor: '#d1f4da',
					        borderColor: 'rgba(255,99,132,1)',
					        borderWidth: 1,
					        hoverBackgroundColor: '#d1f4da',
					        hoverBorderColor: 'rgba(255,99,132,1)',
					        data: []
					      },
					      {
					        label: 'Total Question',
					        type: 'line',
					        backgroundColor: 'rgba(54, 162, 235, 0.2)',
					        borderColor: 'rgba(54, 162, 235, 1)',
					        borderWidth: 1,
					        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
					        hoverBorderColor: 'rgba(54, 162, 235, 1)',
					        data: [],
					      }
					    ],
					  }
					let labels = [] 
					let correctScore = []
					let totalQuestion = []
					attr.percentagePerLearningStrand.map((pls)=>{
						labels = [...labels, (pls.learningStrand ? pls.learningStrand.name ? pls.learningStrand.name : '' : '' ) ]
						correctScore = [...correctScore, (pls.score ? pls.score : 0)]
						totalQuestion = [...totalQuestion, (pls.totalQuestion ? pls.totalQuestion : 0)]
					})

					data.labels = labels
					data.datasets[0].data = correctScore
					data.datasets[1].data = totalQuestion

    //   learningStrand: { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'learningStrand',
    //		name: '',
    //   },
    //   percentage: Number,
    //   score: Number,
    //   totalQuestion: Number
    //dateStarted: {
  //   type: Date
  // },
  // dateFinished: {
  //    type: Date
  // },
    // }
				    return (
				    	<Grid.Cell key={index} large={12} medium={12}  small={12}>
				    		<div className='bar-chart-label'>
								<div className='name'>{attr.type + ' - ' + ( 
								attr.examiner ? attr.examiner.personalInformation ? 
                                  (attr.examiner.personalInformation.firstName ? attr.examiner.personalInformation.firstName : '') 
                                  + ' ' + 
                                  (attr.examiner.personalInformation.middleName ? attr.examiner.personalInformation.middleName.substring(0,1) : '')
                                  + ' ' + 
                                  (attr.examiner.personalInformation.lastName ? attr.examiner.personalInformation.lastName : '')
                                  : '' : '') }
								{attr.examiner.google ? attr.examiner.google.name ? attr.examiner.google.name : '' : '' }
                                {attr.examiner.facebook ? attr.examiner.facebook.name ? attr.examiner.facebook.name : '' : '' }
								</div>
								<div className='label'>Date: { moment(attr.dateStarted).format('MMMM DD, YYYY - LTS') + ' - ' + moment(attr.dateFinished).format('MMMM DD, YYYY - LTS') }</div>
								<div className='label'>Result: {attr.status}</div>
								<div className='label'>Score: {attr.score}</div>
								
							</div>
	    					<Bar 
	    						data={data}
	    						height={75}
	    						options={{
						        animation: false
						    	}} />
	    				

				    		
							
							   
				    	</Grid.Cell>
				    )


				})}

	           
	          
	         
	        </Grid.X>
	        <Grid.X>
	        	<Grid.Cell large={12} medium={6}  small={12}>
		          	<div className='-pagination'>
	                  <Pagination
	                      changePage={this.changePage}
	                      currentPage={this.state.currentPage}
	                      nextPage={this.state.nextPage}
	                      pageCount={this.state.pageCount}
	                      perPage={this.state.perPage}
	                      previousPage={this.state.previousPage}
	                      totalCount={this.state.totalCount}

	                  />
	              	</div>
		          </Grid.Cell>
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