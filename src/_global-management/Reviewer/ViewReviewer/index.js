import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import apiRequest from '../../../_axios'

import config from '../../../_config'


import Grid from '../../../_component/Grid'
import PdfViewer from '../../../_component/PdfViewer'
import FormMessage from '../../../_component/Form/FormMessage'

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

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        disableReview: false,

        modalActive: false,
        youtubeVideo: null,



      
    }

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)
    this.nameChecker = this.nameChecker.bind(this)

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

  nameChecker(attr) {
    console.log(attr)
    // if(attr.method == "local"){
		// 	return attr.personalInformation.firstName + " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName 
		// }
		// if(attr.method == "facebook"){
		// 	if(attr.personalInformation.firstName){
		// 		return attr.personalInformation.firstName+ " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName
		// 	}else{
		// 		return attr.facebook.email
		// 	}
		// }
		// if(attr.method == "google"){
		// 	if(attr.personalInformation.firstName){
		// 		return attr.personalInformation.firstName+ " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName
		// 	}else{
		// 		return attr.google.email
		// 	}
		// }
  }
  
  fetchSingle(){
    this.formMessage('Loading Content', 'loading', true, false)

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
                    youtubeVideo: result.youtubeVideo ? result.youtubeVideo : null,
                    fileType: result.fileType ? result.fileType : null,
                    
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

                    // disableReview: ( isValidatedByCurrentUser > -1 || this.props.user.id === result.uploader._id ? true : false )
                    // result.validation || 
                })
            this.formMessage('Content Loaded', 'success', true, false)




            }
            
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
                  <div className='title-text-container hide-on-large-x'>
                    <div className='title'>{this.state.header === 'Reviewer' ? 'Modyul (Module)' : this.state.header }</div>
                    <div className='title-action'>
                     
                      <Link to={
                          (this.props.role === 'Administrator' ? '/admin/teachers' + this.state.urlToUse + '/list' : '') + 
                          (this.props.role === 'Teacher' ? '/teacher/management' + this.state.urlToUse + '/list' : '') +
                          (this.props.role === 'Learner' && this.props.hadPreTest ? '/learner/resources' + this.state.urlToUse + '/list' : '') + 
                          (this.props.role === 'Learner' && !this.props.hadPreTest ? '/learner-start/resources' + this.state.urlToUse + '/list' : '') 
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
                        <div className='context-montserrat'>Title: <span>{this.state.description}</span></div>
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={6} small={12}>
                        <div className='context-montserrat'>Validator: { " " }
                        {this.state.validator.map(function(value){
                          function checker(val){
                            return val.user.personalInformation.firstName + " " + val.user.personalInformation.middleName+ " "+ val.user.personalInformation.lastName 
                          }
                          return <span>{checker(value)}</span>
                        } 
                        
                        )}</div>
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
const ViewReviewer = connect(mapStateToProps)(Layout)
export default ViewReviewer