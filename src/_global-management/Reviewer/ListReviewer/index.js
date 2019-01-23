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

      role: '',

      urlLinkToUse: '',
      header: '',

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
    apiRequest('put', `/reviewer-management/validate-multiple?userId=${this.props.user.id}`, data, this.props.token)
      .then((res)=>{
        let learningStrand = this.state.learningStrand
        let validation = this.state.validation
        let level = this.state.level
        let subject = this.state.subject
        let page = this.state.currentPage
        
        this.fetchLevel(validation, learningStrand, level, subject, page)
        this.formMessage(this.state.header + ' has been validated', 'success', true, false)
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
  toggleDelete(link, item){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: '',
        item: ''
      })
      let learningStrand = this.state.learningStrand
      let validation = this.state.validation
      let page = this.state.currentPage
      this.fetchLevel(validation, learningStrand, page)
      
    }else{
      this.setState({
        deleteActive: true,
        link: link,
        item: item
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


    //admin routes
    if(this.props.location.pathname.match('/admin/teachers/reviewer')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Reviewer`
      this.setState({
        urlLinkToUse: '/admin/teachers/reviewer',
        header: 'Reviewer'
      })
    }
    if(this.props.location.pathname.match('/admin/teachers/learning-resources')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Learning Resources`
       this.setState({
        urlLinkToUse: '/admin/teachers/learning-resources',
        header: 'Learning Resources'
      })
    }
    if(this.props.location.pathname.match('/admin/teachers/session-guide')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Session Guide`
       this.setState({
        urlLinkToUse: '/admin/teachers/session-guide',
        header: 'Session Guide'
      })
    }



    //teacher routes
    if(this.props.location.pathname.match('/teacher/management/reviewer')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Reviewer`
      this.setState({
        urlLinkToUse: '/teacher/management/reviewer',
        header: 'Reviewer'
      })
    }
    if(this.props.location.pathname.match('/teacher/management/learning-resources')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Learning Resources`
       this.setState({
        urlLinkToUse: '/teacher/management/learning-resources',
        header: 'Learning Resources'
      })
    }
    if(this.props.location.pathname.match('/teacher/management/session-guide')){
      routeToUse = `/reviewer-management/all?validation=${validation}&learningStrand=${learningStrand}&page=${page}&fileUsage=Session Guide`
       this.setState({
        urlLinkToUse: '/teacher/management/session-guide',
        header: 'Session Guide'
      })
    }

    //learner
    if(this.props.location.pathname.match('/learner/resources/reviewer') && this.props.hadPreTest){
      routeToUse = `/reviewer-management/all?validation=true&level=${this.props.level}&learningStrand=${learningStrand}&page=${page}&fileUsage=Reviewer`
      this.setState({
        urlLinkToUse: '/learner/resources/reviewer',
        header: 'Reviewer'
      })
    }
    if(this.props.location.pathname.match('/learner/resources/learning-resources') && this.props.hadPreTest){
      routeToUse = `/reviewer-management/all?validation=true&level=${this.props.level}&learningStrand=${learningStrand}&page=${page}&fileUsage=Learning Resources`
       this.setState({
        urlLinkToUse: '/learner/resources/learning-resources',
        header: 'Learning Resources'
      })
    }

    // learner without pre-test
    if(this.props.location.pathname.match('/learner-start/resources/reviewer') && !this.props.hadPreTest){
      routeToUse = `/reviewer-management/all?validation=true&level=${this.props.level}&learningStrand=${learningStrand}&page=${page}&fileUsage=Reviewer`
      this.setState({
        urlLinkToUse: '/learner-start/resources/reviewer',
        header: 'Reviewer'
      })
    }
    if(this.props.location.pathname.match('/learner-start/resources/learning-resources') && !this.props.hadPreTest){
      routeToUse = `/reviewer-management/all?validation=true&level=${this.props.level}&learningStrand=${learningStrand}&page=${page}&fileUsage=Learning Resources`
       this.setState({
        urlLinkToUse: '/learner-start/resources/learning-resources',
        header: 'Learning Resources'
      })
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

    this.setState({
      role: this.props.role
    })
  }

  componentWillReceiveProps(nextProps){
    
    this.setState({
      role: nextProps.role
    })
}
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12}  medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>{this.state.header} List</div>
                    <div className='title-action'>

                   

                    {this.state.selectedData.length > 0 ? 
                      <div className='button primary small' onClick={this.validateMultiple}>Validate Selected {this.state.header}</div>
                    : null}

                    <div className='button primary small' onClick={this.toggleView}>{this.state.view ? 'List' : 'Grid' } View</div>
 
                    {(this.props.role === 'Learner' || this.props.location.pathname.match('/teacher/management/session-guide') || this.props.location.pathname.match('/teacher/management/reviewer')) ? null : 
                      <Link to={this.state.urlLinkToUse + '/add'}>
                        <div className='button primary small'>Add New {this.state.header}</div>
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
                  <div className="table-container">
                  <Table hover nostripe>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell isNarrowed key='action'></Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Modyul</Table.HeaderCell>
                        <Table.HeaderCell>Submitted By</Table.HeaderCell>
                       
                        {this.state.role === 'Learner' ? '' : <Table.HeaderCell>Status</Table.HeaderCell>}
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
                                 
                              </Table.Cell>
                              <Table.Cell>{attr.description}</Table.Cell>
                              <Table.Cell>{attr.fileType}</Table.Cell>
                              <Table.Cell>{attr.level ? attr.level.name ? attr.level.name : '' : ''}</Table.Cell>
                              <Table.Cell>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : ''}</Table.Cell>
                              
                              <Table.Cell>{attr.learningStrandSub ? attr.learningStrandSub.lessonName ? attr.learningStrandSub.lessonName : '' : ''}</Table.Cell>
                              <Table.Cell>{
                                attr.uploader ? attr.uploader.personalInformation ? 
                                (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                                + ' ' + 
                                (attr.uploader.personalInformation.middleName ? attr.uploader.personalInformation.middleName.substring(0,1) : '')
                                + ' ' + 
                                (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                                : '' : ''
                              }</Table.Cell>
                              
                              
                              {this.state.role === 'Learner' ? '' : 
                              <Table.Cell>
                              {attr.validation ? 
                                  <div className='blue-bordered-radius'>Validated</div>
                                   : 
                                  <div className='red-bordered-radius'>For Validation</div> }
                              </Table.Cell>  
                              }
                              <Table.Cell isNarrowed>
                                {attr.fileType === 'PDF' ?
                                  <span>
                                    <a href={`${config}/${attr.pdf}`} download target='_blank'><i className='la la-file-pdf-o primary'/></a>
                                  </span>
                                 : null}

                                {attr.fileType === 'Powerpoint Presentation' ?
                                  <span>
                                    <a href={`${config}/${attr.pdf}`} download target='_blank'><i className='la la-file-powerpoint-o primary'/></a>
                                  </span>
                                 : null}

                                {attr.fileType === 'Microsoft Word Document' ?
                                  <span>
                                    <a href={`${config}/${attr.pdf}`} download target='_blank'><i className='la la-file-word-o primary'/></a>
                                  </span>
                                 : null}
                                {attr.fileType === 'Youtube Video' ?
                                  <span>
                                    <a href={`https://www.youtube.com/watch?v=${attr.youtubeVideo}`} target='_blank'><i className='la la-youtube-play primary'/></a>
                                  </span>
                                 : null}


                                 {(this.props.role === 'Administrator' || attr.uploader._id !== this.props.user.id) && this.props.role !== 'Learner' && !attr.validation ?
                                   <Link to={{
                                      pathname: this.state.urlLinkToUse + '/validate',
                                      state: { id: attr._id }
                                   }}>
                                    <span>
                                        <i className='la la-tags primary'></i>
                                      </span>
                                   </Link>
                                  : null }


                                 <Link to={{
                                    pathname: this.state.urlLinkToUse + '/view',
                                    state: { id: attr._id }
                                 }}>
                                  <span>
                                      <i className='la la-folder-open-o primary'></i>
                                    </span>
                                 </Link>

                                 {(this.props.role === 'Administrator' || attr.uploader._id === this.props.user.id) && this.props.role !== 'Learner' ? 
                                   <Link to={{
                                      pathname: this.state.urlLinkToUse + '/edit',
                                      state: { id: attr._id }
                                   }}>
                                    <span>
                                        <i className='la la-edit primary'></i>
                                      </span>
                                   </Link>
                                 : null}


                                 

                                 


                               

                                

                                { this.props.role === 'Administrator' || attr.uploader._id === this.props.user.id ?
                                  <span onClick={()=>{this.toggleDelete('/reviewer-management/delete/' + attr._id, attr.fileUsage)}}>
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
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell>Modyul</Table.HeaderCell>
                        <Table.HeaderCell>Submitted By</Table.HeaderCell>
                       
                        {this.state.role === "Learner" ? '' : <Table.HeaderCell>Status</Table.HeaderCell>}
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                </Table>
                </div>
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

          <ManagementDelete item={this.state.item} close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    role: state.role,
    hadPreTest: state.hadPreTest,
    level: state.level
  }
}
const ListReviewer = connect(mapStateToProps)(Layout)
export default ListReviewer