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
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
				examinationData: [],

				modalOn: false,

				learnerName : '',
				prePostData : [],
				preAdaptivePostData : []
		}
		
		this.changePage = this.changePage.bind(this)
		
		this.showModal = this.showModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.printExam = this.printExam.bind(this)
	}
	
	printExam(){
		let arr = []
		this.state.examinationData.map( (x,i) => {
			console.log(x)
			let date = new Date(x.dateFinished)
			arr.push([
				{
						text:x.examiner.personalInformation.firstName+ " "+x.examiner.personalInformation.lastName, fontSize:14
				},
				{
						text:x.examType.examType, fontSize:14,alignment:"center"
				},
				{
						ul:x.percentagePerLearningStrand.map( (a,b) =>{
							return a.learningStrand.name + " - " +a.score+" out of "+a.totalQuestion  
						}), fontSize:14
				},
				{
						text:Math.round((x.score/x.exam.length)*100), fontSize:14,alignment:"center"
				},
				{
						text:(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(), fontSize:14,alignment:"center"
				},
				{
						text:x.status === "Retake" ? "Failed" : "Passed", fontSize:14,alignment:"center"
				}
			])

		}) 
		var dd = {
				pageOrientation: "landscape",
				pageSize: "Legal",
				pageMargins: [40, 70, 40, 40],
			header: [
					{
							
							table: {
									body: [
							[{text:[{text:"BALIK",color: "#4257b2",fontSize:20},{text:"ARAL",color:"red",fontSize:20}],border:[],margin:[34,30,0,0]}, {text:" - Student Examination Report",border:[],fontSize:16,margin:[0,33,0,0]}]
						]
							}
					}
					],
			content: [
				{
					table: {
							widths:["20%","14%","26%","20%","12%","8%"],
						body: [
							[{text:"Full Name",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]},
							{text:"Type of Exam",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]},
							{text:"Examination Result",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]},
							{text:"Average",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]},
							{text:"Date Taken",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]},
							{text:"Status",alignment:"center",fontSize:16,fillColor:"#4257b2",color:"white",margin:[10,10,10,10]}
							],
							...arr
						]
					}
				}
			]
		}
		pdfMake.createPdf(dd).open()
	}

  changePage(page){
   
    this.setState({
      currentPage: page
		})
		
    this.fetchAllLearner(page)
	}
	
	showModal(data, name){
		let modalOn = this.state.modalOn
		console.log(data)
		apiRequest('get', `/generated-exam/analytics/pre-post/${data}`, false, this.props.token)
		.then(res => {
			console.log('prepost', res.data.data)
			const prePostData = res.data.data

			this.setState({
				prePostData : prePostData,
			})

			//PRE ADAPTIVE POST
			apiRequest('get', `/generated-exam/analytics/all/${data}`, false, this.props.token)
				.then(res => {
					const preAdaptivePostData = res.data.data

					console.log('preadaptivepost', preAdaptivePostData)
					this.setState({
						preAdaptivePostData : preAdaptivePostData,
						learnerName: name,
						modalOn : !modalOn
					})

					apiRequest('get', `/generated-exam/fetch-examination/${data}`, false, this.props.token)
						.then(employeeRes => {
							console.log(employeeRes)
							this.setState({
								examinationData: employeeRes.data.data
							})
						})
						.catch((err)=>{
							console.log(err)
						})

				})
				.catch((err)=>{
					console.log(err)
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

		console.log('pplabel', ppLabels)
		console.log('ppData', ppData)

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
										 
										<Grid.Cell large={12} medium={12} small={12}><h2 className="text-center">Performance Indicator</h2></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><h1 className="learner-name text-center">{this.state.learnerName}</h1></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><button onClick={() => { this.printExam() }} className='secondary small' style={{color:"white",backgroundColor:"#4257b2"}}><i className='la la-cloud-download' style={{fontSize:"24px"}}></i> Export Examination</button></Grid.Cell>
										<Grid.Cell large={12} medium={12} small={12}><div className="underline"></div></Grid.Cell>
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
											<Grid full>
												<Grid.X>
												<Grid.Cell large={12}><h3>All Examinations</h3></Grid.Cell>
												{
												pApLabels.map((attr, i)=>{
													return(
														papData.map(data => {
															return(
																<Grid.Cell key={i} large={6} medium={12} small={12}>
																	<Line 
																		key={i}
																			data={{
																				labels: ['Pre',...adaptALabel, 'Post'],
																				datasets: [{
																						fill: false,
																						lineTension: 0,
																						pointRadius: 4,
																						label: data[attr][0].learningStrand,
																						backgroundColor: '#ffd778',
																						borderColor: 'rgba(255,99,132,1)',
																						borderWidth: 1,
																						data: [data[attr][0] ? data[attr][0].percentage : 0, ...adaptAData ,data[attr][2] ? data[attr][2].percentage : 0]
																					}
																				]
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
															)
														})
													)
												})
											}
												</Grid.X>
											</Grid>										
											
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