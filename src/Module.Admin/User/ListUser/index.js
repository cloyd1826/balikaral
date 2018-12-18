import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	user: [],

    	message: '',
      type: '',
      active: false,


    }
    this.fetchUser = this.fetchUser.bind(this)
   	this.formMessage = this.formMessage.bind(this)
  }
 
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchUser(){
  	apiRequest('get', '/user/all', false, this.props.token)
  		.then((res)=>{
        console.log(res)
  			if(res.data){
  				this.setState({
	  				user: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        console.log(err)
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
  	this.fetchUser()
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>User Management</div>
        						
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
				        				<Table.HeaderCell>Email</Table.HeaderCell>
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
                                  {attr.local.email}
                                </Link>
                              </Table.Cell>
                              <Table.Cell>
                                {attr.personalInformation ? 
                                  attr.personalInformation.lastName && attr.personalInformation.firstName ? 
                                    attr.personalInformation.lastName + ' ' + attr.personalInformation.firstName
                                  : '' : ''}
                              </Table.Cell>
                              <Table.Cell>{attr.local ? attr.local.userType ? attr.local.userType : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.local ? attr.local.disabled ? 'No Access' : 'Has Access' : ''}</Table.Cell>
                              <Table.Cell isNarrowed>
                                  <Link 
                                    to={{ 
                                      pathname: '/admin/user-view/update-information', 
                                      state: { id: attr._id } 
                                    }}>
                                    <span>
                                      <i className='fa fa-user primary'></i>
                                    </span>
                                  </Link>
                              </Table.Cell>
                            </Table.Row>
					        				)
					        			})
				        			}
				        		</Table.Body>
				        		<Table.Footer>
				        			<Table.Row>
				        			<Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>User Role</Table.HeaderCell>
                        <Table.HeaderCell>Access</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
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
const ListUser = connect(mapStateToProps)(Layout)
export default ListUser