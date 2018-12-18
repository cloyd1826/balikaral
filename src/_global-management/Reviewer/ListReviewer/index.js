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
    	reviewer: [],

      validation: '',
      learningStrand: '',

    	message: '',
      type: '',
      active: false,

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
    let validation = this.state.validation
    let level = this.state.level
    if(name==='learningStrand'){
      learningStrand = value
    }
    if(name ==='validation'){
      validation = value
    }
    this.fetchLevel(validation, learningStrand)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
      this.fetchLevel('','')
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

  fetchLevel(validation, learningStrand){
  
    let routeToUse = ''

    if(this.props.match.params.type === 'self'){
      routeToUse = `/reviewer-management/all?uploader=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}`
    }

    if(this.props.match.params.type === 'all'){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}`
    }

    if(this.props.match.params.type === 'teachers'){
      routeToUse = `/reviewer-management/all?disclude=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}`
    }

  	apiRequest('get', routeToUse, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
          console.log(res)
  				this.setState({
	  				reviewer: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        console.log(err)
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
  	this.fetchLevel('','')
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Reviewer List</div>
        						<div className='title-action'>

                      

        							<Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/reviewer/add'}>
        								<div className='button primary small'>Add New Reviewer</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className='table-filter'>
                    <Grid.Cell large={2} medium={12} small={12}>
                      <Select 
                        label='Validation'
                        name='validation' 
                        value={this.state.validation} 
                        onChange={this.handleChange}
                        >
                        <option value=''></option>
                        <option value='false'>For Validation</option>
                        <option value='true'>Validated</option>
                      </Select>
                    </Grid.Cell>
                    <Grid.Cell large={2} medium={12} small={12}>
                      <SelectLearningStrand
                        label='Learning Strand' 
                        name='learningStrand' 
                        value={this.state.learningStrand} 
                        onChange={this.handleChange}/>
                    </Grid.Cell>

                  </div>
	        				<Table hover nostripe>
				        		<Table.Header>
				        			<Table.Row>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Teacher</Table.HeaderCell>
				        				<Table.HeaderCell>PDF Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Header>
				        		<Table.Body>
				        			{
					        			this.state.reviewer.map((attr, index) =>{
					        				return (
					        					<Table.Row key={index}>
                              <Table.Cell>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : ''}</Table.Cell>
                              <Table.Cell>{
                                attr.uploader ? attr.uploader.personalInformation ? 
                                (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                                + ' ' + 
                                (attr.uploader.personalInformation.middleName ? attr.uploader.personalInformation.middleName.substring(0,1) : '')
                                + ' ' + 
                                (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                                : '' : ''
                              }</Table.Cell>
                              <Table.Cell>{attr.pdf}</Table.Cell>
                              <Table.Cell>{attr.description}</Table.Cell>
                              <Table.Cell>{attr.validation ? 'Validated' : 'For Validation' }</Table.Cell>
							        				<Table.Cell isNarrowed>

                                { this.props.match.params.type === 'all' || this.props.match.params.type === 'teachers'  ? 
                                  <Link to={{ 
                                    pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/reviewer/view', 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='la la-tags primary'></i>
                                    </span>
                                  </Link>
                                : null }

                                { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ? 
                                  <Link to={{ 
                                    pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/reviewer/edit', 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='fa fa-edit primary'></i>
                                    </span>
                                  </Link>
                                : null }

                                { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ?
                                  <span onClick={()=>{this.toggleDelete('/reviewer-management/delete/' + attr._id)}}>
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
                         <Table.HeaderCell>Learning Strand</Table.HeaderCell>
				        				 <Table.HeaderCell>Teacher</Table.HeaderCell>
                        <Table.HeaderCell>PDF Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>

				        				<Table.HeaderCell isNarrowed></Table.HeaderCell>
				        			</Table.Row>
				        		</Table.Footer>
			        	</Table>
			        	</div>
        			</Grid.Cell>
        		</Grid.X>
        	</Grid>

          <ManagementDelete item='Reviewer' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
    user: state.user,
    role: state.role
	}
}
const ListReviewer = connect(mapStateToProps)(Layout)
export default ListReviewer