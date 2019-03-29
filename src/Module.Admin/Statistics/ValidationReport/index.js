import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import  Table from '../../../_component/Table'
import Button from '../../../_component/Form/Button'
import FormMessage from '../../../_component/Form/FormMessage'
import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import Pagination from '../../../_component/Pagination'

import {Bar, Line} from 'react-chartjs-2';


import moment from 'moment'
import { Tapable } from 'tapable';

import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import Select from '../../../_component/Form/Select';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
				
				learnerList : [],
				validation: [],
				reportData: [],
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,
				showModalView: false,
				status: '',
        currentPage: 1,
     		nextPage: null,
     		pageCount: 0,
     		perPage: 10,
     		previousPage: null,
     		totalCount: 1,
				generatedExam: [],
				examinationData: [],

				modalOn: false,

				learnerName : '',
				prePostData : [],
				preAdaptivePostData : []
		}
		
		this.changePage = this.changePage.bind(this)
		this.viewReport = this.viewReport.bind(this)
		this.showModal = this.showModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

  changePage(page){
   
    this.setState({
      currentPage: page
		})
		
    this.fetchValidation(page)
	}

	viewReport(action){
		console.log(action)
		this.setState({showModalView: true,modalOn: false})	
		apiRequest('get', `/validation/fetch?type=Learning Resources&action=${action}`, false, this.props.token)
		.then(res => {
			console.log("RES",res)
			this.setState({
				reportData: res.data.data
			})
		})
		.catch((err)=>{
			console.log(err)
		})		
	}

	showModal(data, name){
		let modalOn = this.state.modalOn
		apiRequest('get', `/validation?user=${data}&action=Validate&type=Learning Resources`, false, this.props.token)
		.then(res => {
			console.log(res)
			this.setState({
				validation: res.data.data,
				modalOn : !modalOn
			})
		})
		.catch((err)=>{
			console.log(err)
		})		
	}

	closeModal(){
		this.setState({
			modalOn : false,
			showModalView: false
		})
	}

 
  componentDidMount(){
    this.fetchValidation(1)
  }
  fetchValidation(page, type){
  	apiRequest('get', `/user/all?page=${page}&type=Teacher`, false, this.props.token)
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
		
		// PRE POST DATA START
		let ppData = [this.state.prePostData]
		let prePostLabel = []
		let preData = []
		let postData = []
		let ppLabels = Object.keys(this.state.prePostData)
		

		ppLabels.map((attr, i)=>{
			ppData.map(data => {
				preData = [...preData, data[attr][0] ? data[attr][0].percentage : 0]
				postData = [...postData, data[attr][1] ? data[attr][1].percentage : 0]
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
		// PRE POST DATA END


		//PRE ADAPTIVE POST DATA START

		let papData = [this.state.preAdaptivePostData]
		let preAdaptPostLabel = []
		let adaptALabel = []
		let preAData = []
		let adaptAData = []
		let postAData = []
		let pApLabels = Object.keys(this.state.preAdaptivePostData)
		

		pApLabels.map((attr, i)=>{
			papData.map(data => {
				preAData = [...preAData, data[attr][0].percentage]
				postAData = [...postAData, data[attr][2].percentage]
			})
		})

		pApLabels.map((attr, i)=>{
			papData.map(data => {
				if(data[attr][i]){
					if(data[attr][i].learningStrand === attr && data[attr][i].type === 'Adaptive Test'){
						adaptAData = [...adaptAData, data[attr][i].percentage]
						adaptALabel = [...adaptALabel, 'Adaptive']
					}
				}
			})
		})

		let preAdaptivePostDatasets = [{
			label: 'Pre',
			backgroundColor: '#ffd778',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			data: [...preAData]
		},
		{
			label: 'Adaptive',
			backgroundColor: '#6fcdcd',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			// data: [...adaptAData],
			data: []
		},
		{
			label: 'Post',
			backgroundColor: '#5eb5ef',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			data: [...postAData]
		}]

		console.log('pAplabel', ppLabels)
		console.log('pApData', papData)
		//PRE ADAPTIVE POST DATA END



    return (
    	<Grid fluid>
	        <div className='element-container'>
	          <div className='title-text-container hide-for-large'>
	              <div className='title'>Analytics for Data Validations</div>
	          </div>
	        <Grid.X>
	          <Grid.Cell large={12} medium={6} small={12}>
	            <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
	          </Grid.Cell>
	        </Grid.X>
	        <Grid.X className="chart-data-container">

							{/* START TABLE */}
							<Grid.Cell large={12} medium={12} small={12}><button onClick={() => { this.viewReport("Validate") }} className='secondary small' style={{color:"white",position:"relative",left:20,backgroundColor:"#4257b2"}}><i className='la la-cloud-download' style={{fontSize:"18px"}}></i> View Ranking</button></Grid.Cell>
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
														<span onClick={(e)=> this.showModal(attr._id, attr.personalInformation.firstName + ' ' + attr.personalInformation.lastName)}>
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
										
										<Grid.Cell large={12} medium={12} small={12}><h2 className="text-center">Individual Teacher's Contribution Report</h2></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><h1 className="learner-name text-center">{this.state.learnerName}</h1></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><div className="underline"></div></Grid.Cell>
										<Grid.Cell large={3} medium={3} small={12}>
											<Select 
												label='Gender'
												name='gender'
												value={this.state.gender}
												onChange={this.handleChange}
											>
												<option value='' disabled> -- SELECT --</option>
												<option value='Male'>Male</option>
												<option value='Female'>Female</option>
											</Select>
										</Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}>
										<div className="table-container" style={{width:'100%'}}>
										<Table hover nostripe>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>Name</Table.HeaderCell>
													<Table.HeaderCell>Type</Table.HeaderCell>
													<Table.HeaderCell>Action</Table.HeaderCell>
													<Table.HeaderCell>Reviewer</Table.HeaderCell>
													<Table.HeaderCell>Reason</Table.HeaderCell>
													<Table.HeaderCell isNarrowed></Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
														{
															this.state.validation.map((x,i) => {
																return (<Table.Row key={i}>
																	<Table.Cell>{x.user.personalInformation.firstName}{" "}{x.user.personalInformation.lastName}</Table.Cell>
																	<Table.Cell>{x.type}</Table.Cell>
																	<Table.Cell>{x.action}</Table.Cell>
																	<Table.Cell>{x.reviewer.description}</Table.Cell>
																	<Table.Cell>{x.reason}</Table.Cell>
																	<Table.Cell>
																	
																	</Table.Cell>
																</Table.Row>)
															})
														}
													</Table.Body>
													<Table.Footer>
														<Table.Row>
														<Table.HeaderCell>Name</Table.HeaderCell>
														<Table.HeaderCell>Type</Table.HeaderCell>
														<Table.HeaderCell>Action</Table.HeaderCell>
														<Table.HeaderCell>Reviewer</Table.HeaderCell>
														<Table.HeaderCell>Reason</Table.HeaderCell>
															<Table.HeaderCell isNarrowed></Table.HeaderCell>
														</Table.Row>
													</Table.Footer>
											</Table>
											</div>
										</Grid.Cell>
									</Grid.X>
									
								</Grid>
							</div>
						</div>
					</div> 
				</div>
				<div className={ this.state.showModalView ? "visible" : "hidden"} >
					<div className='modal'>
						<div className='chart-modal'>
							<span className='close-button la la-times-circle' onClick={(e) => this.closeModal()}></span>
							<div className="chart-content-container">
								<Grid full>
									<Grid.X>
										<Grid.Cell large={12} medium={12} small={12}><h2 className="text-center">Systems Recommendation based on Teacher's Contribution</h2></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><div className="underline"></div></Grid.Cell>
										<Grid.Cell large={3} medium={3} small={12}>
											<Select 
												label='Status'
												name='status'
												value={this.state.status}
												onChange={(x) => { this.viewReport(x.target.value); console.log(this.state.status)  }}
											>
												<option> -- SELECT --</option>
												<option value='Validate'>Validated</option>
												<option value='Unvalidated'>Unvalidated</option>
											</Select>
										</Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}>
											<div className="table-container" style={{width:'100%'}}>
											<Table hover nostripe>
												<Table.Header>
													<Table.Row>
														<Table.HeaderCell>Name</Table.HeaderCell>
														<Table.HeaderCell>Total of Validated Data</Table.HeaderCell>
													</Table.Row>
												</Table.Header>
												<Table.Body>
															{
																this.state.reportData.map((x,i) => {
																	return (<Table.Row key={i}>
																		<Table.Cell>{x.users[0].personalInformation.firstName}{" "}{x.users[0].personalInformation.lastName}</Table.Cell>
																		<Table.Cell>{x.count}</Table.Cell>
																	</Table.Row>)
																})
															}
														</Table.Body>
														<Table.Footer>
															<Table.Row>
																<Table.HeaderCell>Name</Table.HeaderCell>
																<Table.HeaderCell>Total of Validated Data</Table.HeaderCell>
															</Table.Row>
														</Table.Footer>
												</Table>
											</div>
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
const ValidationReport = connect(mapStateToProps)(Layout)
export default ValidationReport