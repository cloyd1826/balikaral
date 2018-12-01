import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'
import Table from '../../../../_component/Table'
import FormMessage from '../../../../_component/Form/FormMessage'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../../_component/ManagementDelete'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	exam: [],

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
  	
  	apiRequest('get', '/exam-management/all', false, this.props.token)
  		.then((res)=>{
  			if(res.data){
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
        						<div className='title'>Exam Management</div>
        						<div className='title-action'>
        							<Link to='/admin/management/exam/add'>
        								<div className='button primary small'>Add New Exam</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage> 
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Question</Table.HeaderCell>
				        				<Table.HeaderCell>Answer</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
				        				<Table.HeaderCell>Learning Strand</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.exam.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
    							        		<Table.Cell>
    							        					<Link 
    							        						to={{ 
    														    pathname: '/admin/management/exam/edit', 
    														    state: { id: attr._id } 
    															}}>
    															{attr.question.details}
    														</Link>
    													</Table.Cell>
                              <Table.Cell>{attr.question.answer}</Table.Cell>
                              <Table.Cell>{attr.level.name}</Table.Cell>
							        				<Table.Cell>{attr.learningStrand.name}</Table.Cell>
							        				<Table.Cell isNarrowed>
							        					<Link to={{ 
															    pathname: '/admin/management/exam/edit', 
															    state: { id: attr._id } 
															  }}>
								        					<span>
								        						<i className='fa fa-edit primary'></i>
								        					</span>
							        					</Link>
							        				
							        					<span onClick={()=>{this.toggleDelete('/exam-management/delete/' + attr._id)}}>
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
                        <Table.HeaderCell>Question</Table.HeaderCell>
				        				<Table.HeaderCell>Answer</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
			        	</div>
        			</Grid.Cell>
        		</Grid.X>
        	</Grid>


        	<ManagementDelete item='Exam' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

        </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}
const ListLevel = connect(mapStateToProps)(Layout)
export default ListLevel