import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import FormMessage from '../../../_component/Form/FormMessage'
import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import config from '../../../_config'

import Pagination from '../../../_component/Pagination'

import {Bar} from 'react-chartjs-2';


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
  	apiRequest('get', `/learning-strand/generated-exam`, false, this.props.token)
        .then((res)=>{
            if(res.data){
              
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
	          <div className='title-text-container'>
	              <div className='title'>Statistics of Generated Exam</div>
	          </div>
	        <Grid.X>
	          <Grid.Cell large={12} medium={6} small={12}>
	            <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
	          </Grid.Cell>
	        </Grid.X>
	        <Grid.X>
	          
	         

	           
	          
	         
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