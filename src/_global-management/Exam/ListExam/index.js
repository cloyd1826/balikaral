import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import Pagination from '../../../_component/Pagination'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'
 
import ManagementDelete from '../../../_component/ManagementDelete'

import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectSubject from '../../../_special-form/SelectSubject'

import Select from '../../../_component/Form/Select'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	exam: [],

    	message: '',
      type: '',
      active: false,

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,


      validation: '',
      learningStrand: '',
      level: '',
      subject: '',

      deleteActive: false,
      link: '',



    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)
   	this.toggleDelete = this.toggleDelete.bind(this)

    this.handleChange = this.handleChange.bind(this)

    this.changePage = this.changePage.bind(this)
  }
  changePage(page){
    let learningStrand = this.state.learningStrand
    let validation = this.state.validation
    let level = this.state.level
    let subject = this.state.subject
    this.setState({
      currentPage: page
    })
    this.fetchLevel(validation, learningStrand, level, subject, page)
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
    let subject = this.state.subject
    let page = this.state.page
    if(name==='learningStrand'){
      learningStrand = value
    }
    if(name ==='validation'){
      validation = value
    }
    if(name ==='level'){
      level = value
    }
    if(name ==='subject'){
      subject = value
    }
    this.fetchLevel(validation, learningStrand, level, subject)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
  		let learningStrand = this.state.learningStrand
      let validation = this.state.validation
      let level = this.state.level
      let subject = this.state.subject
      let page = this.state.currentPage
      this.fetchLevel(validation, learningStrand, level, subject, page)
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

  fetchLevel(validation, learningStrand, level,subject,page){

    let routeToUse = ''

    if(this.props.match.params.type === 'self'){
      routeToUse = `/exam-management/all?uploader=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}&level=${level}&learningStrandSub=${subject}&page=${page}`
    }

    if(this.props.match.params.type === 'all'){
      routeToUse = `/exam-management/all?validation=${validation}&learningStrand=${learningStrand}&level=${level}&learningStrandSub=${subject}&page=${page}`
    }

    if(this.props.match.params.type === 'teachers'){
      routeToUse = `/exam-management/all?disclude=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}&level=${level}&learningStrandSub=${subject}&page=${page}`
    }

  	apiRequest('get', routeToUse, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
          console.log(res)
  				this.setState({
	  				exam: res.data.data,
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
        console.log(err)
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
    this.fetchLevel('','','','',1)
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
                      <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') + '/management/exam/import'}>
                        <div className='button primary small'>Import Exam</div>
                      </Link>
        							<Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') + '/management/exam/add'}>
        								<div className='button primary small'>Add New Exam</div>
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
                        <SelectLevel
                          label='Level' 
                          name='level' 
                          value={this.state.level}
                          onChange={this.handleChange}/>
                      </Grid.Cell>


                      <Grid.Cell large={2} medium={12} small={12}>
                        <SelectLearningStrand
                          label='Learning Strand' 
                          name='learningStrand' 
                          level={this.state.level}
                          value={this.state.learningStrand} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                      <Grid.Cell large={2} medium={12} small={12}>
                        <SelectSubject
                          label='Subject' 
                          name='subject' 
                          learningStrand={this.state.learningStrand}
                          value={this.state.subject} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                  </div>
  	        				<Table hover nostripe scroll>
  				        		<Table.Header>
  				        			<Table.Row>
                          <Table.HeaderCell>Question</Table.HeaderCell>
                          <Table.HeaderCell>Answer</Table.HeaderCell>
                          <Table.HeaderCell>Difficulty</Table.HeaderCell>
  				        				<Table.HeaderCell>Submitted By</Table.HeaderCell>
                          <Table.HeaderCell>Level</Table.HeaderCell>
                          <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                          <Table.HeaderCell>Subject</Table.HeaderCell>
  				        				<Table.HeaderCell>Validation</Table.HeaderCell>
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
      														    pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') + '/management/exam/edit', 
      														    state: { id: attr._id } 
      															}}>
      															{attr.question.details}
      														</Link>
      													</Table.Cell>
                                <Table.Cell>{ attr.question ? attr.question.answer ? attr.question.answer : '' : '' }</Table.Cell>
                                <Table.Cell>{ attr.question ? attr.question.difficulty ? attr.question.difficulty : '' : '' }</Table.Cell>
                                <Table.Cell isNarrowed>{
                                  attr.uploader ? attr.uploader.personalInformation ? 
                                  (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                                  + ' ' + 
                                  (attr.uploader.personalInformation.middleName ? attr.uploader.personalInformation.middleName.substring(0,1) : '')
                                  + ' ' + 
                                  (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                                  : '' : ''
                                }</Table.Cell>
                                <Table.Cell isNarrowed>{ attr.level ? attr.level.name ? attr.level.name : '' : '' }</Table.Cell>
                                <Table.Cell isNarrowed>{ attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : '' }</Table.Cell>
  							        				<Table.Cell isNarrowed>{ attr.learningStrandSub ? attr.learningStrandSub.lessonName ? attr.learningStrandSub.lessonName : '' : '' }</Table.Cell>
                                <Table.Cell>{attr.validation ? 'Validated' : 'For Validation' }</Table.Cell>
  							        				<Table.Cell isNarrowed>


                                  { this.props.match.params.type === 'all' || this.props.match.params.type === 'teachers'  ? 
                                    <Link to={{ 
                                      pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/validate', 
                                      state: { id: attr._id } 
                                    }}>
                                      <span>
                                        <i className='la la-tags primary'></i>
                                      </span>
                                    </Link>
                                  : null }

                                  { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ? 
                                    <Link to={{ 
                                      pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/edit', 
                                      state: { id: attr._id } 
                                    }}>
                                      <span>
                                        <i className='fa fa-edit primary'></i>
                                      </span>
                                    </Link>
                                  : null }

                                  { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ?
                                    <span onClick={()=>{this.toggleDelete('/exam-management/delete/' + attr._id)}}>
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
                          <Table.HeaderCell>Question</Table.HeaderCell>
                          <Table.HeaderCell>Answer</Table.HeaderCell>
                          <Table.HeaderCell>Difficulty</Table.HeaderCell>
                          <Table.HeaderCell >Submitted By</Table.HeaderCell>
                          <Table.HeaderCell >Level</Table.HeaderCell>
                          <Table.HeaderCell >Learning Strand</Table.HeaderCell>
                          <Table.HeaderCell>Subject</Table.HeaderCell>
                          <Table.HeaderCell>Validation</Table.HeaderCell>
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

        	<ManagementDelete item='Exam' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

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