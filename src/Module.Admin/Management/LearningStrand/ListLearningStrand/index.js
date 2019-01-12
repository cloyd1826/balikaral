import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'
import Pagination from '../../../../_component/Pagination'
import Table from '../../../../_component/Table'
import FormMessage from '../../../../_component/Form/FormMessage'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../../_component/ManagementDelete'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	learningStrand: [],

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
      link: '',

      level: [],
    }
    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)
   	this.formMessage = this.formMessage.bind(this)

   	this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)

    this.fetchLevel = this.fetchLevel.bind(this)
  }
  fetchLevel(){

    apiRequest('get', `/level/fetchAllWithoutPagination`, false, this.props.token)
      .then((res)=>{
       
        if(res.data){
          this.setState({
            level: res.data.data,
           
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }

  changePage(page){

    this.setState({
      currentPage: page
    })
    this.fetchLearningStrand( page)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
      let page = this.state.currentPage
  		this.fetchLearningStrand(page)
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

  fetchLearningStrand(page){
  	
  	apiRequest('get', `/learning-strand/fetchAllQuestion?page=${page}`, false, this.props.token)
  		.then((res)=>{
       
  			if(res.data){
  				this.setState({
	  				learningStrand: res.data.data,
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
    this.fetchLevel()
  	this.fetchLearningStrand(1)

  }
  render() { 
    const renderLevelName = (levelId) => {
      let level = this.state.level
      let index = level.map((attr)=>{
        return attr._id
      }).indexOf(levelId)
      return level[index].name
    }

    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12} medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container hide-on-large'>
        						<div className='title'>Learning Strand Management</div>
        						<div className='title-action'>
        							<Link to='/admin/management/learning-strand/add'>
        								<div className='button primary small'>Add New Learning Strand</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
				        				<Table.HeaderCell>No Of Questions</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.learningStrand.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
							        				<Table.Cell>
							        					<Link 
							        						to={{ 
														    pathname: '/admin/management/learning-strand/edit', 
														    state: { id: attr._id } 
    															}}>
    															{attr.name}
    														</Link>
    													</Table.Cell>
                              <Table.Cell>{attr.level ? renderLevelName(attr.level) : ''}</Table.Cell>
							        				<Table.Cell>{attr.description}</Table.Cell>
                              <Table.Cell>{attr.questions ? attr.questions.length : 0}</Table.Cell>
							        				<Table.Cell isNarrowed>
							        					<Link to={{ 
															    pathname: '/admin/management/learning-strand/edit', 
															    state: { id: attr._id } 
															  }}>
								        					<span>
								        						<i className='fa fa-edit primary'></i>
								        					</span>
							        					</Link>
							        				
							        					<span onClick={()=>{this.toggleDelete('/learning-strand/delete/' + attr._id)}}>
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
				        				<Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>No Of Questions</Table.HeaderCell>
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


        	<ManagementDelete item='Learning Strand' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

        </div>
    )
  }
} 

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}
const ListLearningStrand = connect(mapStateToProps)(Layout)
export default ListLearningStrand