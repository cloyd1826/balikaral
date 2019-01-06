import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'
import Table from '../../../../_component/Table'
import FormMessage from '../../../../_component/Form/FormMessage'
import Pagination from '../../../../_component/Pagination'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../../_component/ManagementDelete'
import SetActive from '../SetActive'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	landingPage: [],

    	message: '',
      type: '',
      active: false,


      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,

      setActiveData: {},

      deleteActive: false,
      setActive: false,
      link: '',
    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)
   	this.toggleSetActive = this.toggleSetActive.bind(this)
    this.changePage = this.changePage.bind(this)

  }
  toggleSetActive(data){
    this.setState({
      setActive: (this.state.setActive ? false : true),
      setActiveData: (this.state.setActive ? {} : data),
    })
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
  	apiRequest('get', `/landing-page/all?page=${page}`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				landingPage: res.data.data,
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
        						<div className='title'>Landing Page Management</div>
        						<div className='title-action'>
        							<Link to='/admin/management/landing-page/add'>
        								<div className='button primary small'>Add New Landing Page</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
	        				<Table hover nostripe scroll>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Page Description</Table.HeaderCell>
                        <Table.HeaderCell>Tungkol sa Programa</Table.HeaderCell>
				        				<Table.HeaderCell>Active</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Contact Number</Table.HeaderCell>
                        <Table.HeaderCell>Facebook</Table.HeaderCell>
                        <Table.HeaderCell>Twitter</Table.HeaderCell>
                        <Table.HeaderCell>Instagram</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
				        				<Table.HeaderCell>Google</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.landingPage.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
							        				<Table.Cell>
                                <Link to={{ 
                                    pathname: '/admin/management/landing-page/edit', 
                                    state: { id: attr._id } 
                                  }}>
                                  {attr.pageDescription}
                                </Link>
                              </Table.Cell>
                              <Table.Cell>{attr.tungkolSaProgramaDescription}</Table.Cell>
							        				<Table.Cell>{(attr.active ? 'Active' : 'Inactive')}</Table.Cell>
                              <Table.Cell>{attr.email}</Table.Cell>
                              <Table.Cell>{attr.contact}</Table.Cell>
                              <Table.Cell>{attr.facebook}</Table.Cell>
                              <Table.Cell>{attr.twitter}</Table.Cell>
                              <Table.Cell>{attr.instagram}</Table.Cell>
                              <Table.Cell>{attr.medium}</Table.Cell>
                              <Table.Cell>{attr.google}</Table.Cell>
							        				<Table.Cell isNarrowed>
							        					<Link to={{ 
															    pathname: '/admin/management/landing-page/edit', 
															    state: { id: attr._id } 
															  }}>
								        					<span>
								        						<i className='fa fa-edit primary'></i>
								        					</span>
							        					</Link>
							        				
                                <span onClick={()=>{this.toggleSetActive(attr)}}>
                                    <i className='la la-tags primary'></i>
                                </span>
                                {!attr.active ? 
                                  <span onClick={()=>{this.toggleDelete('/landing-page/delete/' + attr._id)}}>
                                  <i className='fa fa-trash cancel'></i>
                                </span>
                                : null}

							        					
							        				</Table.Cell>
							        			</Table.Row>
					        				)
					        			})
					        			
				        			}
				        			
				        			
				        		</Table.Body>
				        		<Table.Footer>
				        			<Table.Row>
				        			 <Table.HeaderCell>Page Description</Table.HeaderCell>
                        <Table.HeaderCell>Tungkol sa Programa</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>

                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Contact Number</Table.HeaderCell>
                        <Table.HeaderCell>Facebook</Table.HeaderCell>
                        <Table.HeaderCell>Twitter</Table.HeaderCell>
                        <Table.HeaderCell>Instagram</Table.HeaderCell>
                        <Table.HeaderCell>Medium</Table.HeaderCell>
                        <Table.HeaderCell>Google</Table.HeaderCell>
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


          <ManagementDelete item='Landing Page' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />
        	<SetActive 
            data={this.state.setActiveData} 
            close={this.toggleSetActive} 
            active={this.state.setActive} 
            fetch={this.fetchLevel} 
            currentPage={this.state.currentPage}
            />

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