import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import Pagination from '../../../_component/Pagination'
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

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,

      deleteActive: false,
      link: ''
    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)
   	this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)
  }
  changePage(page){
    this.setState({
      currentPage: page
    })
    this.fetchLevel(page)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})

      let page = this.state.currentPage
      this.fetchLevel(page)

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

  fetchLevel(page){
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
	  		}
  		})
  		.catch((err)=>{
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
  	this.fetchLevel(1)
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
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
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Easy</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
                        <Table.HeaderCell>Hard</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Exam Total</Table.HeaderCell>
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
                              <Table.Cell>{attr.level ? attr.level.name ? attr.level.name : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.easy}</Table.Cell>
                              <Table.Cell>{attr.medium}</Table.Cell>
                              <Table.Cell>{attr.hard}</Table.Cell>
                              <Table.Cell>{attr.examDescription}</Table.Cell>
                             
                              <Table.Cell>{attr.examTotal}</Table.Cell>
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
                        <Table.HeaderCell>Level</Table.HeaderCell>
                         <Table.HeaderCell>Easy</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
                        <Table.HeaderCell>Hard</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Exam Total</Table.HeaderCell>
                        <Table.HeaderCell>Exam Time</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
                  <div className='table-pagination'>
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