import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../_component/ManagementDelete'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	examType: [],

    	message: '',
      type: '',
      active: false,

      deleteActive: false,
      link: ''
    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)
   	this.toggleDelete = this.toggleDelete.bind(this)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
  		this.fetchLevel()
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

  fetchLevel(){
  	apiRequest('get', `/exam-type-management/all`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				examType: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        console.log(err)
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
  	this.fetchLevel()
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Exam Type Management</div>
        						<div className='title-action'>
                     
        							<Link to={'/admin/management/exam-type/add'}>
        								<div className='button primary small'>Add New Exam Type</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Easy</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
                        <Table.HeaderCell>Hard</Table.HeaderCell>
                        <Table.HeaderCell>Exam Total</Table.HeaderCell>
                        <Table.HeaderCell>Passing Rate</Table.HeaderCell>
                        <Table.HeaderCell>Exam Time</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.examType.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
                              <Table.Cell>{attr.examType}</Table.Cell>
                              <Table.Cell>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.examDescription}</Table.Cell>
                              <Table.Cell>{attr.difficulty ? attr.difficulty.easy ? attr.difficulty.easy : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.difficulty ? attr.difficulty.medium ? attr.difficulty.medium : '' : ''}</Table.Cell>
    							        	  <Table.Cell>{attr.difficulty ? attr.difficulty.hard ? attr.difficulty.hard : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.examTotal}</Table.Cell>
                              <Table.Cell>{attr.passingRate}</Table.Cell>
                              <Table.Cell>{attr.totalHours}</Table.Cell>
							        				<Table.Cell isNarrowed>
                                  
                                  <Link to={{ 
                                    pathname: '/admin/management/exam-type/edit', 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='fa fa-edit primary'></i>
                                    </span>
                                  </Link>

                                  <span onClick={()=>{this.toggleDelete('/exam-type-management/delete/' + attr._id)}}>
                                    <i className='fa fa-trash cancel'></i>
                                  </span>
                              
							        				
							        				</Table.Cell>
							        			</Table.Row>
					        				)
					        			})
					        			
				        			}
				        			
				        			
				        		</Table.Body>
				        		<Table.Footer>
				        			<Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Easy</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
                        <Table.HeaderCell>Hard</Table.HeaderCell>
                        <Table.HeaderCell>Exam Total</Table.HeaderCell>
                        <Table.HeaderCell>Passing Rate</Table.HeaderCell>
                        <Table.HeaderCell>Exam Time</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
			        	</div>
        			</Grid.Cell>
        		</Grid.X>
        	</Grid>

        	<ManagementDelete item='Exam Type' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

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