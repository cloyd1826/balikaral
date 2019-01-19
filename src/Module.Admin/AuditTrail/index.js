import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'
import Table from '../../_component/Table'
import FormMessage from '../../_component/Form/FormMessage'
import Pagination from '../../_component/Pagination'

import apiRequest from '../../_axios'

import moment from 'moment'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	auditTrail: [],

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
    this.fetchLevel( page)
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
  	apiRequest('get', `/audit-trail/all?page=${page}`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
          console.log(res.data)
  				this.setState({
	  				auditTrail: res.data.data,
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
        					<div className='title-text-container hide-on-large-x'>
        						<div className='title'>History</div>
        						<div className='title-action'>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
							<div className="table-container">
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
				        				<Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Module</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
				        				<Table.HeaderCell>User</Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.auditTrail.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
                              <Table.Cell>{moment(attr.date).format('MMMM DD, YYYY - LTS')}</Table.Cell>
                              <Table.Cell>{attr.module}</Table.Cell>
                              <Table.Cell>{attr.title}</Table.Cell>
							        				<Table.Cell>
                                {
                                  attr.user ? attr.user.personalInformation ? 
                                  (attr.user.personalInformation.firstName ? attr.user.personalInformation.firstName : '') 
                                  + ' ' + 
                                  (attr.user.personalInformation.middleName ? attr.user.personalInformation.middleName.substring(0,1) : '')
                                  + ' ' + 
                                  (attr.user.personalInformation.lastName ? attr.user.personalInformation.lastName : '')
                                  : '' : ''
                                }

                              </Table.Cell>
							        			</Table.Row>
					        				)
					        			})
					        			
				        			}
				        			
				        			
				        		</Table.Body>
				        		<Table.Footer>
				        			<Table.Row>
				        				<Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Module</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
						</div>
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