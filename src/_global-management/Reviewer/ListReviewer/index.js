import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ToggleButton from '../../../_component/ToggleButton'

import ImageLoader from '../../../_component/ImageLoader'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'
import Pagination from '../../../_component/Pagination'


import apiRequest from '../../../_axios'
import config from '../../../_config'

import { connect } from 'react-redux'

import ManagementDelete from '../../../_component/ManagementDelete'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'

import Select from '../../../_component/Form/Select'

import GridView from '../View.Grid'

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

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,

      deleteActive: false,
      link: '',

      view: false,
      selectedData: [],

    }
    this.fetchLevel = this.fetchLevel.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)

    this.handleChange = this.handleChange.bind(this)

    this.toggleView = this.toggleView.bind(this)
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
      validator: [{ user: this.props.user.id }]
    }
   
    this.formMessage('Validating Selected Data', 'loading', true, false)
    apiRequest('put', `/reviewer-management/validate-multiple`, data, this.props.token)
      .then((res)=>{
        let learningStrand = this.state.learningStrand
        let validation = this.state.validation
        let level = this.state.level
        let subject = this.state.subject
        let page = this.state.currentPage
        
        this.fetchLevel(validation, learningStrand, level, subject, page)
        this.formMessage('Reviewer has been validated', 'success', true, false)
        this.setState({
          selectedData: []
        })
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }



  toggleView(){
    this.setState({
      view: this.state.view ? false : true
    })
  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    let learningStrand = this.state.learningStrand
    let validation = this.state.validation
    this.fetchLevel(validation, learningStrand, page)
  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
    let learningStrand = this.state.learningStrand
    let validation = this.state.validation
    let page = this.state.currentPage
    if(name==='learningStrand'){
      learningStrand = value
    }
    if(name ==='validation'){
      validation = value
    }
    this.fetchLevel(validation, learningStrand, page)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      let learningStrand = this.state.learningStrand
      let validation = this.state.validation
      let page = this.state.currentPage
      this.fetchLevel(validation, learningStrand, page)
      
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

  fetchLevel(validation, learningStrand, page){
  
    let routeToUse = ''

    if(this.props.match.params.type === 'self'){
      routeToUse = `/reviewer-management/all?uploader=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}&page=${page}`
    }

    if(this.props.match.params.type === 'all'){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}`
    }

    if(this.props.match.params.type === 'teachers'){
      routeToUse = `/reviewer-management/all?disclude=${this.props.user.id}&validation=${validation}&learningStrand=${learningStrand}&page=${page}`
    }

    if(this.props.match.params.type === 'learner'){
      routeToUse = `/reviewer-management/all?validation=true&learningStrand=${learningStrand}&page=${page}`
    }

    apiRequest('get', routeToUse, false, this.props.token)
      .then((res)=>{
        if(res.data){
       
          this.setState({
            reviewer: res.data.data,
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
    this.fetchLevel('','',1)
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

                    {this.props.role === 'Teacher' ? 
                      <Link 
                        to={'/teacher/management/reviewer/list' 
                          + (this.props.match.params.type === 'teachers' ? '/self' : '')
                          + (this.props.match.params.type === 'self' ? '/teachers' : '')
                          }>
                        <div className='button primary small'>
                        { (this.props.match.params.type === 'teachers' ? 'Your Reviewer List' : '')
                          + (this.props.match.params.type === 'self' ? 'Other Teacher`s List' : '') }

                        </div>
                      </Link>

                    : null}

                    {this.state.selectedData.length > 0 ? 
                      <div className='button primary small' onClick={this.validateMultiple}>Validate Selected Reviewer</div>
                    : null}

                    <div className='button primary small' onClick={this.toggleView}>{this.state.view ? 'List' : 'Grid' } View</div>

                    {this.props.role === 'Learner' ? null : 
                      <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/reviewer/add'}>
                        <div className='button primary small'>Add New Reviewer</div>
                      </Link>
                    }

                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className='table-filter'>
                    {this.props.match.params.type != 'learner' ? 
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
                    : null}
                    <Grid.Cell large={2} medium={12} small={12}>
                      <SelectLearningStrand
                        label='Learning Strand' 
                        name='learningStrand' 
                        value={this.state.learningStrand} 
                        onChange={this.handleChange}/>
                    </Grid.Cell>

                  </div>


                  {this.state.view ? 
                  <Grid.X>
                    {this.state.reviewer.map((attr, index)=>{
                      return (
                        <GridView data={attr} key={index} toggleDelete={this.toggleDelete}/>
                        
                      )
                    })}
                  </Grid.X>
                  :
                  <Table hover nostripe>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell isNarrowed key='action'></Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Teacher</Table.HeaderCell>
                       
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>

                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {
                        this.state.reviewer.map((attr, index) =>{
                          let selectedData = this.state.selectedData
                          let indexOfSelectedData = selectedData.map((sd)=>{
                            return sd._id
                          }).indexOf(attr._id)
                          let isValidatedByUser = attr.validator.map((v)=>{
                            return v.user._id
                          }).indexOf(this.props.user.id)
                         
                          return (
                            <Table.Row key={index}>
                              <Table.Cell isNarrowed >
                                  {!attr.validation && this.props.role === 'Administrator' ?   
                                    <ToggleButton key={attr._id} setSelected={()=>{this.setSelected(attr)}} isSelected={(indexOfSelectedData > -1 ? true : false)} />
                                  :
                                    null 
                                  }
                                  {isValidatedByUser > -1 && !attr.validation && this.props.role === 'Teacher' ? 
                                     <Link to={{ 
                                        pathname: 
                                          (this.props.role === 'Administrator' ? '/admin/management/reviewer/view' : '') + 
                                          (this.props.role === 'Teacher' ? '/teacher/management/reviewer/view' : ''),
                                        state: { id: attr._id } 
                                      }}>
                                        <span>
                                          <i className='la la-star-half-full primary'></i>
                                        </span>
                                      </Link>
                                  : null}
                                  {attr.validation && this.props.role !== 'Learner'  ?
                                    <Link to={{ 
                                        pathname: 
                                          (this.props.role === 'Administrator' ? '/admin/management/reviewer/view' : '') + 
                                          (this.props.role === 'Teacher' ? '/teacher/management/reviewer/view' : ''),  
  
                                        state: { id: attr._id } 
                                      }}>
                                        <span>
                                          <i className='la la-star primary'></i>
                                        </span>
                                      </Link>
                                   : null}
                              </Table.Cell>
                              <Table.Cell>{attr.description}</Table.Cell>
                              <Table.Cell>{(attr.pdf ? 'PDF Reviewer' : '') + (attr.youtubeVideo ? 'Youtube Video' : '')}</Table.Cell>
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
                              
                              
                              <Table.Cell>{attr.validation ? 'Validated' : 'For Validation' }</Table.Cell>
                              <Table.Cell isNarrowed>
                                {attr.pdf ?
                                  <span>
                                    <a href={`${config}/${attr.pdf}`} download='reviewer.pdf' target='_blank'><i className='la la-file-pdf-o primary'/></a>
                                  </span>
                                 : null}

                                 {attr.youtubeVideo ?
                                  <span>
                                    <a href={`https://www.youtube.com/watch?v=${attr.youtubeVideo}`} target='_blank'><i className='la la-youtube-play primary'/></a>
                                  </span>
                                 : null}


                                 

                                 <Link to={{ 
                                    pathname: 
                                      (this.props.role === 'Administrator' ? '/admin/management/reviewer/view' : '') + 
                                      (this.props.role === 'Teacher' ? '/teacher/management/reviewer/view' : '') + 
                                      (this.props.role === 'Learner' ?  (this.props.hadPreTest ? '/learner/reviewer/view' : '/learner-start/reviewer/view' )     : ''), 
                                    state: { id: attr._id } 
                                  }}>
                                    <span>
                                      <i className='la la-folder-open-o primary'></i>
                                    </span>
                                  </Link>

                                { this.props.match.params.type === 'all' || this.props.match.params.type === 'teachers'  ? 
                                  <Link to={{ 
                                    pathname: (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/reviewer/validate', 
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
                        <Table.HeaderCell isNarrowed key='action'></Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Teacher</Table.HeaderCell>
                       
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>

                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                </Table>
                }
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

          <ManagementDelete item='Reviewer' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    role: state.role,
    hadPreTest: state.hadPreTest
  }
}
const ListReviewer = connect(mapStateToProps)(Layout)
export default ListReviewer