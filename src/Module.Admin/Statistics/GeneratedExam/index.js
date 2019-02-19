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
				
				learnerList : [],
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

				prePostData : []
		}
		
		this.changePage = this.changePage.bind(this)
		
		this.showModal = this.showModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
  }
  changePage(page){
   
    this.setState({
      currentPage: page
		})
		
    this.fetchAllLearner(page)
	}
	
	showModal(data){
		let modalOn = this.state.modalOn

		apiRequest('get', `/generated-exam/analytics/pre-post/${data}`, false, this.props.token)
		.then(res => {
			console.log('prepost', res.data.data)
			const prePostData = res.data.data

			this.setState({
				prePostData : prePostData,
				modalOn : !modalOn
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	closeModal(){
		let modalOn = this.state.modalOn
		this.setState({
			modalOn : !modalOn
		})
	}

 
  componentDidMount(){
    this.fetchAllLearner(1)
  }
  fetchAllLearner(page, type){
  	apiRequest('get', `/user/all?page=${page}&type=Learner`, false, this.props.token)
        .then((res)=>{
						if(res.data){
						
						console.log('learnerlist',res)
            	
               this.setState({
               		learnerList: res.data.data,
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
		
		let ppData = [this.state.prePostData]
		let prePostLabel = []
		let preData = []
		let postData = []
		let ppLabels = Object.keys(this.state.prePostData)
		

		ppLabels.map((attr, i)=>{
			ppData.map(data => {
				preData = [...preData, data[attr][0].percentage]
				postData = [...postData, data[attr][1].percentage]
			})
		})

		let prePostDatasets = [{
			label: 'Pre',
			backgroundColor: '#ffd778',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			data: [...preData]
		},
		{
			label: 'Post',
			backgroundColor: '#5eb5ef',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			data: [...postData]
		}]

		console.log('pplabel', ppLabels)
		console.log('ppData', ppData)


    return (
    	<Grid fluid>
	        <div className='element-container'>
	          <div className='title-text-container hide-for-large'>
	              <div className='title'>Analytics of Generated Exam</div>
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
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                     
										 {
											 this.state.learnerList.map((attr, index) => {
                      return(
												<Table.Row key={index}>
													<Table.Cell>{attr.personalInformation.firstName + ' ' + attr.personalInformation.lastName}</Table.Cell>
													<Table.Cell>{attr.local.userType}</Table.Cell>
													<Table.Cell>
														<span onClick={(e)=> this.showModal(attr._id)}>
      								    		<i className='la la-folder-open-o primary'></i>
      								    	</span>
													</Table.Cell>
												</Table.Row>
											)											 
										 })
										 }
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
												<Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                </Table>
                </div>

							{/* END TABLE */}
	          
	         
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
										<Grid.Cell large={12} medium={12} small={12}>
											<h3>Pre and Post</h3>
												<Bar 
													data = {{
														labels: [...ppLabels],
														datasets: [...prePostDatasets],
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
																	}],
													},
												}} />
										</Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}>
											<h3>All Examinations</h3>										
											<Bar 
													data = {
														{
															labels: [],
															datasets: [
																{
																	backgroundColor: ['#fff5dd', [], '#ffe0e6'],
																	borderColor: 'rgba(255,99,132,1)',
																	borderWidth: 1,
																	hoverBorderColor: 'rgba(255,99,132,1)',
																	data: []
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