import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ToggleButton from '../../../_component/ToggleButton'
import Table from '../../../_component/Table'
import Pagination from '../../../_component/Pagination'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'
 
import ManagementDelete from '../../../_component/ManagementDelete'

import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectSubject from '../../../_special-form/SelectSubject'
import SelectReviewer from '../../../_special-form/SelectReviewer'

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

      selectedData: [],

      submittedBy: '',
      reviewer: '',

    }
    this.fetchLevel = this.fetchLevel.bind(this)
   	this.formMessage = this.formMessage.bind(this)
   	this.toggleDelete = this.toggleDelete.bind(this)

    this.handleChange = this.handleChange.bind(this)

    this.changePage = this.changePage.bind(this)

    this.setSelected = this.setSelected.bind(this)
    this.validateMultiple = this.validateMultiple.bind(this)

  }
  setSelected(data){
    let selectedData = this.state.selectedData

    let index = selectedData.map((attr)=>{
      return attr._id
    }).indexOf(data._id)

    if(index > -1){
      selectedData = [...selectedData.slice(0,index),...selectedData.slice(index + 1)]
    }else{
      selectedData = [...selectedData, data]
    } 
    
    this.setState({
      selectedData: selectedData
    })
  }
  validateMultiple(){
    let selectedData = this.state.selectedData
    let idOfSelectedData = []
    selectedData.map((attr)=>{
      idOfSelectedData = [...idOfSelectedData, attr._id]
    })
    let data = {
      id: idOfSelectedData,
      validator: [{ user: this.props.user.id}]
    }
    this.formMessage('Validating Selected Data', 'loading', true, false)
    apiRequest('put', `/exam-management/validate-multiple?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        let learningStrand = this.state.learningStrand
        let validation = this.state.validation
        let level = this.state.level
        let subject = this.state.subject
        let reviewer = this.state.reviewer
        let submittedBy = this.state.submittedBy
        let page = this.state.currentPage

        this.fetchLevel(validation, learningStrand, level, subject,reviewer, submittedBy, page)
        this.formMessage('Exam has been validated', 'success', true, false)
        this.setState({
          selectedData: []
        })
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }

  changePage(page){
    let learningStrand = this.state.learningStrand
    let validation = this.state.validation
    let level = this.state.level
    let subject = this.state.subject
    let reviewer = this.state.reviewer
    let submittedBy = this.state.submittedBy
    this.setState({
      currentPage: page
    })
    this.fetchLevel(validation, learningStrand, level, subject, reviewer, submittedBy, page)
  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
    let learningStrand = this.state.learningStrand
    let reviewer = this.state.reviewer
    let validation = this.state.validation
    let level = this.state.level
    let subject = this.state.subject
    let submittedBy = this.state.submittedBy
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
    if(name ==='reviewer'){
      reviewer = value
    }
    if(name ==='submittedBy'){
      submittedBy = value
    }
    this.fetchLevel(validation, learningStrand, level, subject, reviewer, submittedBy, page)
  }
  toggleDelete(link){
  	if(this.state.deleteActive){
  		this.setState({
  			deleteActive: false,
  			link: ''
  		})
      let learningStrand = this.state.learningStrand
  		let reviewer = this.state.reviewer
      let validation = this.state.validation
      let level = this.state.level
      let subject = this.state.subject
      let submittedBy = this.state.submittedBy
      let page = this.state.currentPage
      this.fetchLevel(validation, learningStrand, level, subject, reviewer, submittedBy, page)
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

  fetchLevel(validation, learningStrand, level, subject, reviewer, submittedBy, page){
    let uploaderDisclude = ''
    if(submittedBy === 'Submitted By You'){
      uploaderDisclude = `&uploader=${this.props.user.id}`
    }
    if(submittedBy === 'Submitted By Other Teachers'){
      uploaderDisclude = `&disclude=${this.props.user.id}`
    }

  	apiRequest('get', `/exam-management/all?validation=${validation}&learningStrand=${learningStrand}&level=${level}&learningStrandSub=${subject}&reviewer=${reviewer}&page=${page}${uploaderDisclude}`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
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
        
  			this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  componentDidMount(){
    this.fetchLevel('','','','','', '', 1)
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container hide-on-large-x'>
        						<div className='title'>Exam Management</div>
        						<div className='title-action'>

                   

                    {this.state.selectedData.length > 0 ? 
                      <div className='button primary small' onClick={this.validateMultiple}>Validate Selected Exam</div>
                    : null}

                      <Link to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') + '/exam/import'}>
                        <div className='button primary small'>Import Exam</div>
                      </Link>
        							<Link to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') + '/exam/add'}>
        								<div className='button primary small'>Add New Exam</div>
        							</Link>
        						</div>
        					</div>
        					<FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className='table-filter'>
                    
                    <Grid.Cell large={2} medium={12} small={12}>
                      <Select 
                        label='Submitted By'
                        name='submittedBy' 
                        value={this.state.submittedBy} 
                        onChange={this.handleChange}
                        >
                        <option value='' disabled> -- SELECT --</option>
                        <option value='Submitted By You'>Submitted By You</option>
                        <option value='Submitted By Other Teachers'>Submitted By Other Teachers</option>
                      </Select>
                    </Grid.Cell>
                    <Grid.Cell large={2} medium={12} small={12}>
                      <Select 
                        label='Validation'
                        name='validation' 
                        value={this.state.validation} 
                        onChange={this.handleChange}
                        >
                        <option value='' disabled> -- SELECT --</option>
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
                        <SelectReviewer
                          label='Modyul' 
                          name='reviewer' 
                          learningStrand={this.state.learningStrand}
                          value={this.state.reviewer} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                  </div>
  	        			<div className="table-container">
                    <Table hover nostripe>
  				          		<Table.Header>
  				          			<Table.Row>
                            <Table.HeaderCell isNarrowed key='action'></Table.HeaderCell>
                            <Table.HeaderCell>Question</Table.HeaderCell>
                            <Table.HeaderCell>Validation</Table.HeaderCell>
                            <Table.HeaderCell>Modyul</Table.HeaderCell>
                           
  				          				<Table.HeaderCell isNarrowed>Submitted By</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell isNarrowed>Learning Strand</Table.HeaderCell>
                            
  				          				
  				          				<Table.HeaderCell isNarrowed></Table.HeaderCell>
  				          			</Table.Row>
  				          		</Table.Header>
  				          		<Table.Body>
  				          			{
  					          			this.state.exam.map((attr, index) =>{
                              let selectedData = this.state.selectedData
                              let indexOfSelectedData = selectedData.map((sd)=>{
                                return sd._id
                              }).indexOf(attr._id)
  					          				

                            return (
                              <Table.Row key={index}>
                                  <Table.Cell isNarrowed>
                                    {!attr.validation && this.props.role === 'Administrator' ?   
                                      <ToggleButton key={attr._id} setSelected={()=>{this.setSelected(attr)}} isSelected={(indexOfSelectedData > -1 ? true : false)} />
                                    :
                                      null 
                                    }
                                    
                                  </Table.Cell>
      						  	        		
      							        		<Table.Cell>
      							        					<Link 
      							        						to={{ 
      														    pathname: (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') + '/exam/edit', 
      														    state: { id: attr._id } 
      															}}>
      															{attr.question.details}
      														</Link>
      													</Table.Cell>
                                <Table.Cell>
                                  {attr.validation ? 
                                  <div className='blue-bordered-radius'>Validated</div>
                                   : 
                                  <div className='red-bordered-radius'>For Validation</div> }

                                </Table.Cell>
                                <Table.Cell>{ attr.reviewer ? attr.reviewer.description ? attr.reviewer.description : '' : '' }</Table.Cell>
                                <Table.Cell isNarrowed>
                                {attr.uploader ? attr.uploader.personalInformation ? 
                                  (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                                  + ' ' + 
                                  (attr.uploader.personalInformation.middleName ? attr.uploader.personalInformation.middleName.substring(0,1) : '')
                                  + ' ' + 
                                  (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                                  : '' : ''}

                                </Table.Cell>
                                <Table.Cell isNarrowed>{ attr.level ? attr.level.name ? attr.level.name : '' : '' }</Table.Cell>
                                <Table.Cell isNarrowed>{ attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : '' }</Table.Cell>
  							        				
  							        				<Table.Cell isNarrowed>


                                  { (this.props.role === 'Administrator' || this.props.user.id !== (attr.uploader ? attr.uploader._id ? attr.uploader._id : '' : '')) && !attr.validation ?
                                    <Link to={{ 
                                      pathname: (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/exam/validate', 
                                      state: { id: attr._id } 
                                    }}>
                                      <span>
                                        <i className='la la-tags primary'></i>
                                      </span>
                                    </Link>
                                  : null }

                                  { this.props.role === 'Administrator' || this.props.user.id === (attr.uploader ? attr.uploader._id ? attr.uploader._id : '' : '') ? 
                                    <Link to={{ 
                                      pathname: (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/exam/edit', 
                                      state: { id: attr._id } 
                                    }}>
                                      <span>
                                        <i className='fa fa-edit primary'></i>
                                      </span>
                                      </Link>
                                    : null }

                                    { this.props.role === 'Administrator' || this.props.user.id === (attr.uploader ? attr.uploader._id ? attr.uploader._id : '' : '') ?
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
                            <Table.HeaderCell isNarrowed key='action-footer'></Table.HeaderCell>
                            <Table.HeaderCell>Question</Table.HeaderCell>
                            <Table.HeaderCell>Validation</Table.HeaderCell>
                            <Table.HeaderCell>Modyul</Table.HeaderCell>
                           
                            <Table.HeaderCell isNarrowed>Submitted By</Table.HeaderCell>
                            <Table.HeaderCell >Level</Table.HeaderCell>
                            <Table.HeaderCell isNarrowed>Learning Strand</Table.HeaderCell>
                            
                            
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

/*
{isValidatedByUser > -1 && !attr.validation && this.props.role === 'Teacher' ? 

<span>
<i className='la la-star-half-full primary'></i>
</span>
: null}
{attr.validation && this.props.role !== 'Learner'  ?

<span>
<i className='la la-star primary'></i>
</span>
: null}

*/