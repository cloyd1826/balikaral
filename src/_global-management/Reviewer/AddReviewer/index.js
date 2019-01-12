import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Select from '../../../_component/Form/Select'
import FileInput from '../../../_component/Form/FileInput'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import config from '../../../_config'

import { connect } from 'react-redux'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'

import axios, { post } from 'axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	learningStrand: '',
      pdf: '',
      description: '',
      pdfName: '',
     
      youtubeVideo: '',
      typeReviewer: '',

      message: '',
      type: '',
      active: false,
      buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

 
    this.clearData = this.clearData.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.postFile = this.postFile.bind(this)
    this.changeTypeReviewer = this.changeTypeReviewer.bind(this)
  }
  changeTypeReviewer(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      youtubeVideo: '',
      pdf: '',
      pdfName: ''
    })
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  clearData(){
    this.setState({
      learningStrand: '',
      pdf: '',
      description: '',
      pdfName: '',
      typeReviewer: '',
      youtubeVideo: '',
    })
  }


  handleChange(e){
  	let name = e.target.name
  	let value = e.target.value

  	this.setState({
  		[name]: value
  	})
  }
  handleFileChange(e){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      pdf: files[0],
      pdfName: e.target.value.replace('C:\\fakepath\\', '')
    })
  }

  handleSubmit(e){
  	e.preventDefault()
    this.formMessage('Saving Data', 'loading', true, true)
  	this.postFile()
  		.then((res)=>{
          this.clearData()
          this.formMessage('Data has been saved', 'success', true, false)
          console.log(res)
      })	
  		.catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
          
  		})
  }
  postFile(){
    const url = `${config}/balikaral/reviewer-management/`
    const formData = new FormData()
    
    formData.append('learningStrand', this.state.learningStrand)
    formData.append('description', this.state.description)
    formData.append('uploader', this.props.user.id )
    formData.append('validation', (this.props.role === 'Administrator' ? true : false ) )

    if(this.state.pdfName !== ''){
      formData.append('pdf', this.state.pdf)
    }
    if(this.state.youtubeVideo !== ''){
      formData.append('youtubeVideo', this.state.youtubeVideo)
    }
    if(this.props.role === 'Administrator'){
      formData.append('validator', this.props.user.id )
    }

    const configPost = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, configPost)
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container hide-on-large'>
        						<div className='title'>Reviewer Management > Add</div>
        						<div className='title-action'>
        							<Link to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/reviewer/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
        								<div className='button primary small'>List of Reviewer</div>
        							</Link>
        						</div>
        					</div>
        					<Form 
                    onSubmit={this.handleSubmit}
                    >
  	        				<Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                      </Grid.Cell>
  	        					<Grid.Cell large={6} medium={12} small={12}>
                        <SelectLearningStrand 
                          label='Learning Strand'  
                          name='learningStrand' 
                          required
                          value={this.state.learningStrand} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                       <Grid.Cell large={6} medium={12} small={12}>
                        <Input 
                          type='text'
                          label='Description' 
                          placeholder='Description' 
                          name='description' 
                          value={this.state.description} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <Select
                          label='Type of Reviewer' 
                          placeholder='Type of Reviewer' 
                          name='typeReviewer' 
                          value={this.state.typeReviewer} 
                          onChange={this.changeTypeReviewer}>
                          <option value=''></option>                          
                          <option value='pdf'>PDF</option>                          
                          <option value='yt-video'>Youtube Video</option>                          
                        </Select>
                      </Grid.Cell>    

                      {this.state.typeReviewer === 'pdf' ? 
    	        					<Grid.Cell large={6} medium={12} small={12}>
    	        						<FileInput 
    	        							type='file'
    	        							label='PDF' 
                            required
    	        							name='pdf'
                            fileName={this.state.pdfName}
                            accept="application/pdf"
                            ref={ref => this.fileInput = ref}
    	        							onChange={this.handleFileChange}/>
    	        					</Grid.Cell>
                      : null}
                      {this.state.typeReviewer === 'yt-video' ?
                        <Grid.Cell large={6} medium={12} small={12}>
                          <Input 
                            type='text'
                            label='Youtube Video ID' 
                            placeholder='Youtube Video ID' 
                            name='youtubeVideo' 
                            value={this.state.youtubeVideo} 
                            onChange={this.handleChange}/>
                           
                              
                            
                        </Grid.Cell>
                      : null}
                      {this.state.typeReviewer === 'yt-video' ?
                        <Grid.Cell large={12} medium={12} small={12}>
                         <div className='form-message success'>
                            <i className='la la-info-circle' />
                            The Youtube Video ID is the alphanumeric code that is unique for each video in YouTube.
                            Search for this pattern in the selected video on YouTube and copy to the Youtube Video ID Input. <br/>
                            <br/>
                            Youtube Link: https://www.youtube.com/watch?v=<strong>QC7Ll9ROkZg</strong> <br/>
                            Youtube Video ID: <strong>QC7Ll9ROkZg</strong>
                          </div>
                        </Grid.Cell>
                      : null }





                     
  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') + '/reviewer/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
  	        						 <Button disabled={this.state.buttonDisabled} type='button' text='Return' className='cancel small'/>
                        </Link>
  	        					</Grid.Cell>
  	        				</Grid.X>
	        				</Form>
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
const AddReviewer = connect(mapStateToProps)(Layout)
export default AddReviewer