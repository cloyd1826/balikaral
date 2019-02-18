import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import  Table from '../../../_component/Table'

import FormMessage from '../../../_component/Form/FormMessage'
import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import Pagination from '../../../_component/Pagination'

import {Bar} from 'react-chartjs-2';


import moment from 'moment'
import { Tapable } from 'tapable';

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
			
			modalOn: false,

			preAdaptivePost: {},
			adaptiveData : [],
			prePost : {}
    }
    this.formMessage = this.formMessage.bind(this)
    this.fetchGeneratedExam = this.fetchGeneratedExam.bind(this)
		this.changePage = this.changePage.bind(this)
		
		this.showModal = this.showModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    let status = this.state.status
    this.fetchGeneratedExam(status, page)
	}
	
	showModal(data){
		let modalOn = this.state.modalOn

		apiRequest('get', `/generated-exam/performance-indicator/${data}`, false, this.props.token)
		.then(res => {
				console.log('preadaptivepost', res.data)
				this.setState({
					preAdaptivePost : res.data,
					adaptiveData : res.data.adaptiveTest
				})

			apiRequest('get', `/generated-exam/pre-post/${data}`, false, this.props.token)
			.then(result => {
				this.setState({
					prePost : result.data,
					modalOn: !modalOn
				})

				console.log('asd', this.state.prePost)
			})
			.catch(err => {
				this.formMessage('Error: ' + err.message, 'error', true, false)
			})


		})
		.catch(err => {
			this.formMessage('Error: ' + err.message, 'error', true, false)
		})

	}
	closeModal(){
		this.setState({
			modalOn : false,
			preAdaptivePost: {},
			prePost : {}
		})
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

     apiRequest('get', '/user/age', false, this.props.token)
     	.then((res)=>{
     		console.log(res)
     	})
     	.catch((err)=>{})
  }
  
  render() {
		let adaptiveData = this.state.adaptiveData
		let adaptive = []
		let adaptiveLabel = []
		let adaptLabel = []
		let adaptiveBg = []

		let preLabel = ['Pre',]
		let postLabel = ['Post']
		let adptLabel = ['Adaptive']

		
		for(var i = 0; i < adaptiveData.length; i++){
			adaptive =  [...adaptive, adaptiveData[i].percentage]
			adaptiveLabel = adaptiveLabel.concat(adptLabel)
			adaptiveBg = [...adaptiveBg, ['#d7ecfb']]
		}

		adaptLabel = [preLabel, ...adaptiveLabel, postLabel]


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

							{/* START TABLE */}

							<div className="table-container" style={{width:'100%'}}>
                  <Table hover nostripe>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Exam Type</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>

                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                     
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
				    		<Table.Row key={index}>
									<Table.Cell>
										{( 
								attr.examiner ? 
								 attr.examiner.google ? attr.examiner.google.email
								 : attr.examiner.facebook ? attr.examiner.facebook.email : attr.examiner.personalInformation ? 
								 (attr.examiner.personalInformation.firstName ? attr.examiner.personalInformation.firstName : '') + ' ' + (attr.examiner.personalInformation.middleName ? attr.examiner.personalInformation.middleName.substring(0,1) : '')
								 + ' ' + (attr.examiner.personalInformation.lastName ? attr.examiner.personalInformation.lastName : '')
								 : '' : ''
								 )}
									</Table.Cell>
									<Table.Cell>{attr.type}</Table.Cell>
									<Table.Cell>
									{ moment(attr.dateStarted).format('MMMM DD, YYYY - LTS') + ' - ' + moment(attr.dateFinished).format('MMMM DD, YYYY - LTS') }
									</Table.Cell>
									<Table.Cell>
									<span onClick={()=>{this.showModal(attr.examiner._id)}}>
                    <i className='la la-folder-open-o primary'></i>
                  </span>
									</Table.Cell>
							</Table.Row>
	    					/* <Bar 
	    						data={data}
									height={75}
	    						options={{
										animation: false,
						    	}} /> */
				    )


				})}
                      
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
												<Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Exam Type</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                </Table>
                </div>

							{/* END TABLE */}
	          








	            {/* {this.state.generatedExam.map((attr, index)=>{
	            	
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
								
								</div>
								<div className='label'>Date: { moment(attr.dateStarted).format('MMMM DD, YYYY - LTS') + ' - ' + moment(attr.dateFinished).format('MMMM DD, YYYY - LTS') }</div>
								<div className='label'>Result: {attr.status}</div>
								<div className='label'>Score: {attr.score}</div>
								
							</div>
	    					<Bar 
	    						data={data}
									height={75}
	    						options={{
										animation: false,
						    	}} />
	    				

				    		
							
							   
				    	</Grid.Cell>
				    )


				})} */}

	           
	          
	         
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

				<div className={ this.state.modalOn ? "visible" : "hidden"} >
					<div className='modal'>
						<div className='chart-modal'>
							

							<span className='close-button la la-times-circle' onClick={(e) => this.closeModal()}></span>
							<div className="chart-content-container">
								<Grid full>
									<Grid.X>
										<Grid.Cell large={12} medium={12} small={12}><h1 className="text-center">Performance Indicator</h1></Grid.Cell>
										<Grid.Cell large={4} medium={4} small={12}>
											<h3>Pre and Post</h3>
												<Bar 
													data = {{
														labels: [],
														datasets: [
															{
																label: 'Pre',
																backgroundColor: '#d1f4da',
																borderColor: 'rgba(255,99,132,1)',
																borderWidth: 1,
																hoverBackgroundColor: '#d1f4da',
																hoverBorderColor: 'rgba(255,99,132,1)',
																data: [this.state.prePost.pre ? this.state.prePost.pre.length > 0 ? this.state.prePost.pre[0].percentage : 0 : 0 ]
															},
															{
																label: 'Post',
																backgroundColor: '#bbe3ff',
																borderColor: 'rgba(255,99,132,1)',
																borderWidth: 1,	
																hoverBorderColor: 'rgba(255,99,132,1)',
																data: [this.state.prePost.post ? this.state.prePost.post.length > 0 ? this.state.prePost.post[0].percentage : 0 : 0 ]
															}
															
														],
													}}
													height={75}
													options={{
														animation: false,
														scales: {
															yAxes: [{
																			display: true,
																			ticks: {
																					beginAtZero: true,
																					steps: 10,
																					stepValue: 5,
																					max: 100
																			}
																	}]
													},
												}} />
										</Grid.Cell>
										<Grid.Cell large={8} medium={8} small={12}>
											<h3>All Examinations</h3>										
											<Bar 
													data = {
														{
															labels: adaptLabel,
															datasets: [
																{
																	backgroundColor: ['#fff5dd', ...adaptiveBg, '#ffe0e6'],
																	borderColor: 'rgba(255,99,132,1)',
																	borderWidth: 1,
																	hoverBorderColor: 'rgba(255,99,132,1)',
																	data: [
																		this.state.preAdaptivePost.pre ? this.state.preAdaptivePost.pre.length > 0 ? this.state.preAdaptivePost.pre[0].percentage : 0 : 0 , ...adaptive ,
																		this.state.preAdaptivePost.post ? this.state.preAdaptivePost.post.length > 0 ? this.state.preAdaptivePost.post[0].percentage : 0 : 0 
																	]
																}
															],
														}
													}
													height={75}
													options={{
														
														legend: {
															display: false
													},
														animation: false,
														scales: {
															yAxes: [{
																			display: true,
																			ticks: {
																					beginAtZero: true,
																					steps: 10,
																					stepValue: 5,
																					max: 100
																			}
																	}]
													},
												}} />
										</Grid.Cell>
									</Grid.X>
									
								</Grid>
							</div>
							</div>
						</div> 
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