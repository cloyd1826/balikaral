import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import FormMessage from '../../../_component/Form/FormMessage'
import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import Pagination from '../../../_component/Pagination'

import {Doughnut} from 'react-chartjs-2';


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
      

      reportExamType: [],
      examType: [],
    }
    this.fetchSingle = this.fetchSingle.bind(this)
    this.formMessage = this.formMessage.bind(this)
    this.fetchExamType = this.fetchExamType.bind(this)
  	this.changePage = this.changePage.bind(this)
  }
  changePage(page){
    
    this.setState({
      currentPage: page
    })
    this.fetchExamType(page)
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
    this.fetchExamType(1)
  }
  fetchExamType(page){
  	apiRequest('get', `/exam-type-management/all?page=${page}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
               this.setState({
               	examType: res.data.data,
               	currentPage: res.data.currentPage,
	            nextPage: res.data.nextPage,
	            pageCount: res.data.pageCount,
	            perPage: res.data.perPage,
	            previousPage: res.data.previousPage,
	            totalCount: res.data.totalCount,
               })
               let examType = res.data.data
               examType.map((attr)=>{
               	this.fetchSingle(attr)
               })
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  fetchSingle(examType){

    apiRequest('get', `/generated-exam/exam-count?examType=${examType._id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
            	let reportExamType = this.state.reportExamType
            	let data = {
            		name: (examType.level ? examType.level.name ? examType.level.name : '' : '' ) + ' - ' + examType.examType
            	}
            	data = { ...data, ...res.data }
            	reportExamType = [...reportExamType, data]
            	this.setState({
            		reportExamType: reportExamType
            	})
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }
  render() {
  console.log(this.state.reportExamType) 
    return (
      <Grid fluid>
        <div className='element-container'>
          <div className='title-text-container'>
              <div className='title'>Statistics of Exam Type</div>
          </div>
	        <Grid.X>
	          <Grid.Cell large={12} medium={6} small={12}>
	            <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
	          </Grid.Cell>
	        </Grid.X>
	        <Grid.X>
	          
	            {this.state.reportExamType.map((attr, index)=>{
	            	let data = {
				       	labels: ["Completed", "Retake", "Pending"],
				        datasets: [{
				            data: [attr.completed, attr.retake, attr.pending,],
				            backgroundColor: [
				                'rgba(255, 99, 132, 0.2)',
				                'rgba(54, 162, 235, 0.2)', 
				                'rgba(255, 206, 86, 0.2)',
				            ],
				            borderColor: [
				                'rgba(255,99,132,1)',
				                'rgba(54, 162, 235, 1)',
				                'rgba(255, 206, 86, 1)',
				            ],
				            borderWidth: 1
				        }]
				    }
				    return (
				    	<Grid.Cell key={index} large={4} medium={6}  small={12}>
				    		<Doughnut data={data} options={{
							        animation: false
							    }} />
							<div className='doughnut-chart-label'>
								<div className='name'>{attr.name}</div>
								<div className='label'>
									Total - {attr.total}
									
								</div>
								
							</div>
							   
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