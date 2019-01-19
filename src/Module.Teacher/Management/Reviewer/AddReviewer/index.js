import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import FileInput from '../../../../_component/Form/FileInput'
import Button from '../../../../_component/Form/Button'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import SelectLearningStrand from '../../../../_special-form/SelectLearningStrand'

import axios, { post } from 'axios'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	learningStrand: '',
      pdf: '',
      description: '',
      pdfName: '',
     
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
      pdfName: ''
    })
    this.fileInput.value = ''
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
        
      })	
  		.catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
         
  		})
  }
  postFile(){
    const url = `https://balikaralapi.eastus.cloudapp.azure.com:5000/balikaral/reviewer-management/`
    const formData = new FormData()
    formData.append('pdf', this.state.pdf)
    formData.append('learningStrand', this.state.learningStrand)
    formData.append('description', this.state.description)
    formData.append('uploader', this.props.user.id )
    formData.append('validation', false )
    const config = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
  }
  render() { 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}  medium={12} small={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Reviewer Management > Add</div>
        						<div className='title-action'>
        							<Link to='/teacher/management/reviewer/list'>
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
                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input 
                          type='text'
                          label='Description' 
                          placeholder='Description' 
                          name='description' 
                          value={this.state.description} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to='/teacher/management/reviewer/list'>
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
    user: state.user
  }
}
const AddReviewer = connect(mapStateToProps)(Layout)
export default AddReviewer