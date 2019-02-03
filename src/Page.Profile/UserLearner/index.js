import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'
import Table from '../../_component/Table'
import FormMessage from '../../_component/Form/FormMessage'

import Pagination from '../../_component/Pagination'


import apiRequest from '../../_axios'

import { connect } from 'react-redux'


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
    this.postTeacherLearner = this.postTeacherLearner.bind(this)
   	this.formMessage = this.formMessage.bind(this)

    this.changePage = this.changePage.bind(this)

    this.toggleConfirm = this.toggleConfirm.bind(this)

  }
  toggleConfirm(id){
    this.setState({
      modalConfirm: this.state.modalConfirm ? false : true,
      selectedLearner: this.state.modalConfirm ? '' : id
    })
  }
  postTeacherLearner(){
    let data = {
      teacher: this.props.user.id,
      learner: this.state.selectedLearner
    }
    apiRequest('post', `/teacher-learner?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        this.formMessage('Data has been recorded', 'success', true, false)
        this.toggleConfirm('')
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  changePage(page){
    this.setState({
      currentPage: page
    })
    this.fetchUser(page)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchUser(page){
  	apiRequest('get', `/user/all?type=Learner&page=${page}`, false, this.props.token)
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
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>List of Learners</div>
        						
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className="table-container">
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Learning Center</Table.HeaderCell>
                        <Table.HeaderCell>Grade/Level</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.user.map((attr, index) =>{
					        				return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                {attr.personalInformation ? 
                                  attr.personalInformation.lastName && attr.personalInformation.firstName ? 
                                  attr.personalInformation.lastName + ' ' + attr.personalInformation.firstName
                                  : '' : ''}
                              </Table.Cell>
                              <Table.Cell>
                                {attr.personalInformation ? attr.personalInformation.learningCenter ? attr.personalInformation.learningCenter : '' : ''}
                              </Table.Cell>
                              <Table.Cell>
                                {attr.personalInformation ? attr.personalInformation.gradeLevel ? attr.personalInformation.gradeLevel : '' : ''}
                              </Table.Cell>
                              
                              <Table.Cell isNarrowed>
                                  {this.props.role === 'Administrator' ? 
                                    <Link 
                                      to={{ 
                                        pathname: ( (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '')  +  '/learner-profile/exam-type'), 
                                        state: { id: attr._id } 
                                      }}>
                                      <span>
                                        <i className='fa fa-user primary'></i>
                                      </span>
                                    </Link>
                                  : null}
                                  {this.props.role === 'Teacher' ? 
                                    <span onClick={() => this.toggleConfirm(attr._id)}>
                                      <i className='la la-user-plus primary'></i>
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
				        			  <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Learning Center</Table.HeaderCell>
                        <Table.HeaderCell>Grade/Level</Table.HeaderCell>
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

          {this.state.modalConfirm ? 
            <div className='modal'>
              <div className='delete-modal'>
                <span className='close-button la la-times-circle' onClick={() => this.toggleConfirm('')}></span>
                <div className='delete-title text-center'>Set as your Learner ?</div>
                <div className='context-montserrat text-center'>The student will be listed as one of your learners.</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.postTeacherLearner}>Ok</button>
                  <button type='button' className='button no' onClick={() => this.toggleConfirm('')}>Cancel</button>
                </div>
              </div> 
            </div>
          : null}

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
const ListUser = connect(mapStateToProps)(Layout)
export default ListUser