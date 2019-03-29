import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import apiRequest from '../../../_axios'
import config from '../../../_config'

import Grid from '../../../_component/Grid'
import PdfViewer from '../../../_component/PdfViewer'
import FormMessage from '../../../_component/Form/FormMessage'
import axios from 'axios'
import { connect } from 'react-redux'

import YouTube from 'react-youtube'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        learningStrand: '',
        pdf: null,
        fileUsage: null,
        description: '',
        uploader: '',
        validation: '',
        validator: [],

        youtubeVideo: null,
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        disableReview: false,
        disableReviewUnvalidate: false,
        modalActive: false,
        modalUnvalidate: false,
        stats: false,
        header: '',
        urlToUse: '',
        reason: ''


      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.onDocumentComplete = this.onDocumentComplete.bind(this)

    this.toggleModal = this.toggleModal.bind(this)
    this.toggleModalUnvalidate = this.toggleModalUnvalidate.bind(this)
  }

  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  onDocumentComplete(pages){
    this.setState({ 
      page: 1, 
      totalPage: pages 
    });
  }
 
  componentDidMount(){
    
    if(this.props.location.state){
      this.fetchSingle()
      if(this.props.location.pathname.match('/reviewer')){
        this.setState({
          header: 'Reviewer',
          urlToUse: '/reviewer'
        })
      }
      if(this.props.location.pathname.match('/session-guide')){
        this.setState({
          header: 'Session Guide',
          urlToUse: '/session-guide'
        })
      }
      if(this.props.location.pathname.match('/learning-resources')){
        this.setState({
          header: 'Learning Resources',
          urlToUse: '/learning-resources'
        })
      }
    }else{
      this.props.history.push('/')
    }
  }

  fetchSingle(){
    this.formMessage('Loading Content', 'loading', true, false)
    apiRequest('get', `/reviewer-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            this.formMessage('Content Loaded', 'success', true, false)
            if(res.data){
                let result = res.data.data
                let validator = result.validator

                //check if the current user has validated the reviewer already
                let disableUnva = 0
                let disableVal = 0
                let isValidatedByCurrentUser = validator.map((attr)=>{
                  if(attr.user._id === this.props.user.id && attr.reason.length > 0) {
                    disableUnva += 1
                  }else{
                    disableUnva = disableUnva
                  }
                  if(attr.user._id === this.props.user.id && attr.reason.length === 0){
                    disableVal += 1
                  }else{
                    disableVal = disableVal
                  }
                })

                this.setState({
                    learningStrand: (result.learningStrand ? result.learningStrand.name ? result.learningStrand.name : '' : '') ,
                    pdf: result.pdf ? result.pdf : null,
                    fileType: result.fileType ? result.fileType : null,
                    youtubeVideo: result.youtubeVideo ? result.youtubeVideo : null,
                    description: result.description,
                    uploader: (result.uploader ? result.uploader.personalInformation ? 
                              (result.uploader.personalInformation.firstName ? result.uploader.personalInformation.firstName : '') 
                              + ' ' + 
                              (result.uploader.personalInformation.middleName ? result.uploader.personalInformation.middleName.substring(0,1) : '')
                              + ' ' + 
                              (result.uploader.personalInformation.lastName ? result.uploader.personalInformation.lastName : '')
                              : '' : ''),
                    validation: result.validation,
                    validator: result.validator,

                    disableReview: disableVal > 0 ? true : false,
                    disableReviewUnvalidate: disableUnva > 0 ? true : false
                })



            }
            
        })    
        .catch((err)=>{
        
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })

  }
  handleChange(e){
    let name = e.target.name
    let value = e.target.value

    this.setState({
        [name]: value
    })
  }
  toggleModal(){
    if(this.state.modalActive){
      this.setState({
        modalActive: false
      })
    }else{
      this.setState({
        modalActive: true
      })
    }
  }

  toggleModalUnvalidate(){
    if(this.state.modalUnvalidate){
      this.setState({
        modalUnvalidate: false
      })
    }else{
      this.setState({
        modalUnvalidate: true
      })
    }
  }

  handleSubmit(e){
    if(this.state.stats){
      this.formMessage('Updating Data...', 'loading', true, true)
      let validator = this.state.validator
      validator = [...validator, { user: this.props.user.id }]
      let data = {
        validator: validator,
        validation: (validator.length >= 3 || this.props.role === 'Administrator' ? true : false)
      }
      apiRequest('put', `/reviewer-management/validate/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          if(res){
            axios.post(`${config}/balikaral/validation`, {
              user: this.props.user.id,
              type: this.state.header,
              action: "Validate",
              reviewer: this.props.location.state.id,
              reason: this.state.reason
            })
            .then(function (response) {
              console.log(response);
              this.formMessage('Data has been updated...', 'success', true, false)
              this.setState({
                  modalActive: false
              })
              this.fetchSingle()
            })
            .catch(function (error) {
              console.log(error)
            })
          }
        })
        .catch((err)=>{
    
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
    }else{
      this.formMessage('Updating Data...', 'loading', true, true)
      let validator = this.state.validator
      validator = [...validator, { user: this.props.user.id, reason: this.state.reason }]
      let data = {
        validator: validator,
        validation: false
      }
      apiRequest('put', `/reviewer-management/validate/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          axios.post(`${config}/balikaral/validation`, {
            user: this.props.user.id,
            type: this.state.header,
            action: "Unvalidated",
            reviewer: this.props.location.state.id,
            reason: this.state.reason
          })
          .then(function (response) {
            console.log(response);
            this.formMessage('Data has been updated...', 'success', true, false)
            this.setState({
                modalUnvalidate: false
            })
            this.fetchSingle()
          })
          .catch(function (error) {
            console.log(error)
          })
        })
        .catch((err)=>{
    
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
    }
  }

  render() { 
    console.log(this.state.pdf)
    return (
        <div>
        	<Grid fluid>
            <Grid.X>
              <Grid.Cell large={12}  medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container hide-on-large-x'>
                    <div className='title'>{this.state.header === 'Reviewer' ? 'Modyul (Module)' : this.state.header }</div>
                    <div className='title-action'>
                      <button disabled={this.state.disableReview} className='button primary small' onClick={this.toggleModal}>Validate {this.state.header}</button>
                      <button disabled={this.state.disableReviewUnvalidate} className='button primary small' onClick={this.toggleModalUnvalidate}>Unvalidate {this.state.header}</button>
                      <Link to={
                          (this.props.role === 'Administrator' ? '/admin/teachers' + this.state.urlToUse + '/list' : '') + 
                          (this.props.role === 'Teacher' ? '/teacher/management' + this.state.urlToUse + '/list' : '')
                        }>
                        <div className='button primary small'>List of {this.state.header}</div>
                      </Link>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                  <Grid.X className='reviewer-view'>
                      <Grid.Cell large={3} medium={6} small={12}>
                        <div className='context-montserrat'>Learning Strand: <span>{this.state.learningStrand}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={6} small={12}>
                        <div className='context-montserrat'>Teacher: <span>{this.state.uploader}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={6} small={12}>
                        <div className='context-montserrat'>Validation Status: <span>{this.state.validation ? 'Validated' : 'For Validation' }</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={6} small={12}>
                        <div className='context-montserrat'>Title: <span>{this.state.description}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={12} medium={6} small={12}>
                        <div className='context-montserrat'>Validators: 
                         
                          {
                            this.state.validator.length > 0 ?
                                this.state.validator.map((attr,index)=>{
                                  console.log(attr)
                                  return (
                                     <span key={index} style={{background: attr.reason ? "red" : "#4257b2"}} className='validator-name'>
                                     {  attr.user ? attr.user.personalInformation ? 
                                         (attr.user.personalInformation.firstName ? attr.user.personalInformation.firstName : '') 
                                         + ' ' + 
                                         (attr.user.personalInformation.middleName ? attr.user.personalInformation.middleName.substring(0,1) : '')
                                         + ' ' + 
                                         (attr.user.personalInformation.lastName ? attr.user.personalInformation.lastName : '')
                                     : '' : ''}
                                
                                    </span>
                                  )
                                })
                                :
                                <span className='no-validator'>No validators</span>
                                
                          }
                          
                        </div>
                      </Grid.Cell>
                     

                      {this.state.fileType === 'PDF' ? 
                        <Grid.Cell large={12} medium={12} small={12}>
                          <PdfViewer pdf={this.state.pdf}/>
                        </Grid.Cell>
                      : null}

                      {this.state.fileType === 'Powerpoint Presentation' ? 
                        <Grid.Cell large={12} medium={12} small={12}>
                          <div className='reviewer-file-container'>
                            <div>
                              <span>
                                <i className='la la-file-powerpoint-o'></i>
                              </span>
                              <div className='subtitle-montserrat'>Download this file to view the content</div>
                              <a href={`${config}/${this.state.pdf}`} download target='_blank'>
                                <div className='button primary'>Download</div>
                              </a>
                            </div>
                          </div>
                        </Grid.Cell>
                      : null}

                      {this.state.fileType === 'Microsoft Word Document' ? 
                        <Grid.Cell large={12} medium={12} small={12}>
                          <div className='reviewer-file-container'>
                            <div>
                              <span>
                                <i className='la la-file-word-o'></i>
                              </span>
                               <div className='subtitle-montserrat'>Download this file to view the content</div>
                              <a href={`${config}/${this.state.pdf}`} download target='_blank'>
                                <div className='button primary'>Download</div>
                              </a>
                            </div>
                          </div>
                        </Grid.Cell>
                      : null}
                       
                      



                      {this.state.fileType === 'Youtube Video' ? 
                        <Grid.Cell large={12} medium={12} small={12}>
                             <YouTube
                                videoId={this.state.youtubeVideo.trim()}
                                className='youtube-player'                
                                containerClassName='youtube-player-container'       
                                
                              />
                        </Grid.Cell>
                      : null}



                  </Grid.X>
                </div>
              </Grid.Cell>
            </Grid.X>
          </Grid>

          {this.state.modalActive ? 
            <div className='modal'>
              <div className='confirm-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleModal}></span>
                <div className='delete-title text-center'>Validate Reviewer {this.state.description} ?</div>
                <div className='context-montserrat text-center'>You will be recorded as a validator of this reviewer.</div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={() => {this.handleSubmit(); this.setState({stats: true});}}>YES</button>
                  <button type='button' className='button no small' onClick={this.toggleModal}>CANCEL</button>
                </div>
              </div> 
            </div>


          : null}

          { this.state.modalUnvalidate ? 
            <div className='modal'>
              <div className='confirm-modal'>
                <span className='close-button la la-times-circle' onClick={this.toggleModalUnvalidate}></span>
                <div className='delete-title text-center'>Validate Reviewer {this.state.description} ?</div>
                <div className='context-montserrat text-center'>You will be recorded as a validator of this reviewer.</div>
                <div className='select-container '>
                    <label> Reason for unvalidating this learning resources</label>
                    <select value={this.state.reason} onChange={ (x) => { this.setState({reason: x.target.value})}}
                    >
                      <option value="No right answer in the given choices">No right answer in the given choices</option>
                      <option value="Wrong use of sentences construction">Wrong use of sentences construction</option>
                      <option value="Correct answer is spelled incorrectly">Correct answer is spelled incorrectly</option>
                      <option value="Test questions is invalid">Test questions is invalid.</option>
                      <option value="Others">Others</option>
                    </select>
                </div>
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={() => {this.handleSubmit(); this.setState({stats: false});}}>YES</button>
                  <button type='button' className='button no small' onClick={this.toggleModalUnvalidate}>CANCEL</button>
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
    user: state.user,
    role: state.role
	}
}
const ViewReviewer = connect(mapStateToProps)(Layout)
export default ViewReviewer