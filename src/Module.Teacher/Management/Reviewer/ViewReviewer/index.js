import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import apiRequest from '../../../../_axios'

import Grid from '../../../../_component/Grid'
import PdfViewer from '../../../../_component/PdfViewer'
import FormMessage from '../../../../_component/Form/FormMessage'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        learningStrand: '',
        pdf: '',
        description: '',
        uploader: '',
        validation: '',
        validator: [],

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        disableReview: false,

        modalActive: false


      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.onDocumentComplete = this.onDocumentComplete.bind(this)

    this.toggleModal = this.toggleModal.bind(this)
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
    this.fetchSingle()
  }
  fetchSingle(){
    apiRequest('get', `/reviewer-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
                let validator = result.validator

                //check if the current user has validated the reviewer already
                let isValidatedByCurrentUser = validator.map((attr)=>{
                  return attr.user._id
                }).indexOf(this.props.user.id)


                this.setState({
                    learningStrand: (result.learningStrand ? result.learningStrand.name ? result.learningStrand.name : '' : '') ,
                    pdf: result.pdf,
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

                    disableReview: ( result.validation || isValidatedByCurrentUser > -1 >= 3 ? true : false )

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
  handleSubmit(e){
    this.formMessage('Updating Data...', 'loading', true, true)
    let validator = this.state.validator
    validator = [...validator, { user: this.props.user.id }]
    let data = {
      validator: validator,
      validation: (validator.length >= 3 ? true : false)
    }
    apiRequest('put', `/reviewer-management/validate/${this.props.location.state.id}`, data, this.props.token)
      .then((res)=>{
        
         this.formMessage('Data has been updated...', 'success', true, false)
         this.setState({
            modalActive: false
         })
         this.fetchSingle()
      })
      .catch((err)=>{
    
        this.formMessage('Error: ' + err.message, 'error', true, false)
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
                    <div className='title'>Reviewer</div>
                    <div className='title-action'>
                      <button disabled={this.state.disableReview} className='button primary small' onClick={this.toggleModal}>Validate Reviewer</button>

                      <Link to='/teacher/management/reviewer/list'>
                        <div className='button primary small'>List of Reviewer</div>
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
                        <div className='context-montserrat'>Title: <span>{this.state.pdf}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={12} medium={6} small={12}>
                        <div className='context-montserrat'>Validators: 
                         
                          {
                            this.state.validator.map((attr,index)=>{
                              return (
                                 <span key={index} className='validator-name'>
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
                          }
                          
                        </div>
                      </Grid.Cell>
                     
                      <Grid.Cell large={12} medium={12} small={12}>
                        <PdfViewer pdf={this.state.pdf}/>
                      </Grid.Cell>
                  </Grid.X>
                </div>
              </Grid.Cell>
            </Grid.X>
          </Grid>

          {this.state.modalActive ? 
            <div className='modal'>
              <div className='confirm-modal'>
                <span className='close-button la la-close' onClick={this.toggleModal}></span>
                <div className='delete-title text-center'>Validate Reviewer {this.state.pdf} ?</div>
                <div className='context-montserrat text-center'>You will be recorded as a validator of this reviewer.</div>
                <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                <div className='delete-button-group'>
                  <button type='button' className='button yes small' onClick={this.handleSubmit}>YES</button>
                  <button type='button' className='button no small' onClick={this.toggleModal}>CANCEL</button>
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
    user: state.user
	}
}
const ViewReviewer = connect(mapStateToProps)(Layout)
export default ViewReviewer