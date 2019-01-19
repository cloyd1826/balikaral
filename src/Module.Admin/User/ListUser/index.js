import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'
import Pagination from '../../../_component/Pagination'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../_component/ManagementDelete'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	user: [],

    	message: '',
      type: '',
      active: false,

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,


    }
    this.fetchUser = this.fetchUser.bind(this)
   	this.formMessage = this.formMessage.bind(this)
    this.changePage = this.changePage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)

    this.grantAccess = this.grantAccess.bind(this)
  }
  changePage(page){
    this.setState({
      currentPage: page
    })
    this.fetchUser( page)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      let page = this.state.currentPage
      this.fetchUser(page)
    }else{
      this.setState({
        deleteActive: true,
        link: link
      })
    }
  }

  fetchUser(page){
  	apiRequest('get', `/user/all?page=${page}`, false, this.props.token)
  		.then((res)=>{
  
  			if(res.data){
  				this.setState({
	  				user: res.data.data,
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
  	this.fetchUser(1)
  }
  grantAccess(account,id,type){
    this.formMessage('Updating Data...', 'loading', true, true)
    let data = {
        id: account.id,
        email: account.email,
        disabled: account.disabled ? false : true ,
        userType: account.userType,
        name: account.name
    }
    apiRequest('put', `/user/update-social-info/${id}?type=${type}&userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          this.formMessage('Data has been updated', 'success', true, false)
          this.fetchUser(this.state.currentPage)
      })    
        .catch((err)=>{
        
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12} medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container hide-on-large-x'>
        						<div className='title'>User Management</div>
        						
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className="table-container">
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
				        				<Table.HeaderCell>Registered By</Table.HeaderCell>
				        				<Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>User Role</Table.HeaderCell>
                        <Table.HeaderCell>Access</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.user.map((attr, index) =>{
					        				return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                <Link 
                                    to={{ 
                                      pathname: '/admin/user-view/update-information', 
                                      state: { id: attr._id } 
                                    }}>
                                  {attr.local ? attr.local.email ? attr.local.email : '' : ''}
                                  {attr.facebook ? attr.facebook.email ? attr.facebook.email : '' : ''}
                                  {attr.google ? attr.google.id ? attr.google.id : '' : ''}
                                </Link>
                              </Table.Cell>
                              <Table.Cell>
                                {attr.local ? 'Local' : ''}
                                {attr.google ? 'Google' : ''}
                                {attr.facebook ? 'Facebook' : ''}
                              </Table.Cell>
                              <Table.Cell>
                                {attr.personalInformation ? 
                                  attr.personalInformation.lastName && attr.personalInformation.firstName ? 
                                    attr.personalInformation.lastName + ' ' + attr.personalInformation.firstName
                                  : '' : ''}
                                {attr.google ? attr.google.name ? attr.google.name : '' : '' }
                                {attr.facebook ? attr.facebook.name ? attr.facebook.name : '' : '' }
                              </Table.Cell>
                              <Table.Cell>
                                {attr.local ? attr.local.userType ? attr.local.userType : '' : ''}
                                {attr.google ? attr.google.userType ? attr.google.userType : '' : ''}
                                {attr.facebook ? attr.facebook.userType ? attr.facebook.userType : '' : ''}

                              </Table.Cell>
                              <Table.Cell>
                                {attr.local ? attr.local.disabled ? 'No Access' : 'Has Access' : ''}
                                {attr.google ? attr.google.disabled ? 'No Access' : 'Has Access' : ''}
                                {attr.facebook ? attr.facebook.disabled ? 'No Access' : 'Has Access' : ''}
                              </Table.Cell>
                              <Table.Cell isNarrowed>
                                {attr.local ? 
                                  <Link 
                                    to={{ 
                                      pathname: '/admin/user-view/update-information', 
                                      state: { id: attr._id } 
                                    }}>
                                    <span>
                                      <i className='fa fa-user primary'></i>
                                    </span>
                                  </Link>
                                : null}
                                {attr.facebook ? 
                                  <span>
                                      <i className='la la-key' onClick={()=>{this.grantAccess(attr.facebook, attr._id, 'facebook')}}></i>
                                  </span>
                                : null}
                                {attr.google ? 
                                  <span>
                                      <i className='la la-key' onClick={()=>{this.grantAccess(attr.google, attr._id, 'google')}}></i>
                                  </span>
                                : null}

                                  <span onClick={()=>{this.toggleDelete('/user/delete/' + attr._id)}}>
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
				        			  <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Registered By</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>User Role</Table.HeaderCell>
                        <Table.HeaderCell>Access</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
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

          <ManagementDelete item='User' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />


        </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
    user: state.user
	}
}
const ListUser = connect(mapStateToProps)(Layout)
export default ListUser