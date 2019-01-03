import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import apiRequest from '../../../_axios'

import Grid from '../../../_component/Grid'
import PdfViewer from '../../../_component/PdfViewer'
import FormMessage from '../../../_component/Form/FormMessage'

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

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.onDocumentComplete = this.onDocumentComplete.bind(this)

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
          console.log(res)
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

                    disableReview: ( isValidatedByCurrentUser > -1 || this.props.user.id === result.uploader._id ? true : false )
                    // result.validation || 
                })



            }
            
        })    
        .catch((err)=>{
          console.log(err)
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
                     
                      <Link to={
                          (this.props.role === 'Administrator' ? '/admin/management/reviewer/list/all' : '')
                          + (this.props.role === 'Teacher' ? '/teacher/management/reviewer/list/teachers' : '')
                          + (this.props.role === 'Learner' ? (this.props.hadPreTest ?  '/learner/reviewer/list/learner' :  '/learner-start/reviewer/list/learner' ) : '')
                           }>
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
                        <div className='context-montserrat'>Title: <span>{this.state.pdf}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <PdfViewer pdf={this.state.pdf}/>
                      </Grid.Cell>
                  </Grid.X>
                </div>
              </Grid.Cell>
            </Grid.X>
          </Grid>

         
          


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