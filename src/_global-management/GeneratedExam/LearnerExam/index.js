import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'
 
import ManagementDelete from '../../../_component/ManagementDelete'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'

import Select from '../../../_component/Form/Select'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	exam: [],

    	message: '',
      type: '',
      active: false,

      status: '',
      learningStrand: '',
    

      deleteActive: false,
      link: ''
    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)
   	this.toggleDelete = this.toggleDelete.bind(this)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
    let learningStrand = this.state.learningStrand
    let status = this.state.status
    let examType = this.state.examType

   
    if(name ==='status'){
      status = value
    }
    this.fetchLevel(status)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
  		this.fetchLevel('')
  	}else{
  		this.setState({
  			deleteActive: true,
  			link: link
  		})
  	}
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchLevel(status){

    let routeToUse = ''

    if(this.props.role === 'Learner'){
      routeToUse = `/generated-exam/all?examiner=${this.props.user.id}&status=${status}`
    }else{
      routeToUse = `/generated-exam/all?status=${status}`
    }

   

  	apiRequest('get', routeToUse, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
          console.log(res)
  				this.setState({
	  				exam: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        console.log(err)
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
  	this.fetchLevel('')
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Generated Exam</div>
        						<div className='title-action'>
                     
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className='table-filter'>
                    <Grid.Cell large={2} medium={12} small={12}>
                      <Select 
                        label='Status'
                        name='status' 
                        value={this.state.status} 
                        onChange={this.handleChange}
                        >
                        <option value=''></option>
                        <option value='Pending'>Pending</option>
                        <option value='Completed'>Completed</option>
                      </Select>
                    </Grid.Cell>
                   

                  </div>
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Exam Type</Table.HeaderCell>
                        <Table.HeaderCell>Examiner</Table.HeaderCell>
                        <Table.HeaderCell>Date Started</Table.HeaderCell>
				        				<Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>No of Questions</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Date Finished</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.exam.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
                              <Table.Cell>{attr.examType ? attr.examType.examType ? attr.examType.examType : '' : ''}</Table.Cell>
                               <Table.Cell isNarrowed>{
                                attr.examiner ? attr.examiner.personalInformation ? 
                                (attr.examiner.personalInformation.firstName ? attr.examiner.personalInformation.firstName : '') 
                                + ' ' + 
                                (attr.examiner.personalInformation.middleName ? attr.examiner.personalInformation.middleName.substring(0,1) : '')
                                + ' ' + 
                                (attr.examiner.personalInformation.lastName ? attr.examiner.personalInformation.lastName : '')
                                : '' : ''
                              }</Table.Cell>

                              <Table.Cell>{attr.dateStarted ? new Date(attr.dateStarted).toLocaleDateString() : ''}</Table.Cell>
                              <Table.Cell>{attr.status ? attr.status : ''}</Table.Cell>
                              <Table.Cell>{attr.exam ? attr.exam.length : ''}</Table.Cell>
                              <Table.Cell>{attr.score ? attr.score : ''}</Table.Cell>
                              <Table.Cell>{attr.dateFinished ? new Date(attr.dateFinished).toLocaleDateString() : '' }</Table.Cell>
							        				<Table.Cell isNarrowed>

                                { attr.status === 'Completed' || attr.status === 'Retake' && this.props.role === 'Learner' ? 
                                  <Link to={{ 
                                    pathname: '/learner/exam/result', 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='la la-folder-open-o primary'></i>
                                    </span>
                                  </Link>
                                : null }

                                { attr.status === 'Pending' && this.props.role === 'Learner' ?
                                  <Link to={{ 
                                    pathname: '/learner/exam/take', 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='la la-edit primary'></i>
                                    </span>
                                  </Link>
                                 : null }


                                {this.props.role !== 'Learner' ?
                                 
                                  <Link to={{ 
                                    pathname: (this.props.role === 'Administrator' ? '/admin/generated-exam/result' : '') + (this.props.role === 'Teacher' ? '/teacher/generated-exam/result' : ''),
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='la la-folder-open-o primary'></i>
                                    </span>
                                  </Link>

                                   : null}

                                { this.props.role === 'Administrator' ?
                                  <span onClick={()=>{this.toggleDelete('/generated-exam/delete/' + attr._id)}}>
                                    <i className='fa fa-trash cancel'></i>
                                  </span>
                                : null }
							        				
							        				</Table.Cell>
							        			</Table.Row>
					        				)
					        			})
					        			
				        			}
				        			
				        			
				        		</Table.Body>
				        		<Table.Footer>
				        			<Table.Row>
                        <Table.HeaderCell>Exam Type</Table.HeaderCell>
                        <Table.HeaderCell>Examiner</Table.HeaderCell>
                        <Table.HeaderCell>Date Started</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>No of Questions</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Date Finished</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
			        	</div>
        			</Grid.Cell>
        		</Grid.X>
        	</Grid>

        	<ManagementDelete item='Generated Exam' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

        </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
    role: state.role,
    user: state.user
	}
}
const ListLevel = connect(mapStateToProps)(Layout)
export default ListLevel