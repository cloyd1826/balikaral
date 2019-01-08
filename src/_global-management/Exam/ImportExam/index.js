import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import config from '../../../_config'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import FileInput from '../../../_component/Form/FileInput'
import Button from '../../../_component/Form/Button'

import axios, { post } from 'axios'

import { connect } from 'react-redux'

import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectSubject from '../../../_special-form/SelectSubject'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	
      csv: '',
      csvName: '',

      
      level: '',
      learningStrand: '',
      learningStrandSub: '',

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

      level: '',
      learningStrand: '',
      learningStrandSub: '',

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
      csv: files[0],
      csvName: e.target.value.replace('C:\\fakepath\\', '')
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
    const url = `${config}/balikaral/exam-management/csv/`
    const formData = new FormData()
    formData.append('csv', this.state.csv)
    formData.append('level', this.state.level)
    formData.append('validation', (this.props.role === 'Administrator' ? true : false))
    formData.append('uploader', (this.props.user.id))
    formData.append('learningStrand', this.state.learningStrand)

    if(this.props.role === 'Administrator'){
      formData.append('validator', this.props.user.id )
    }
    if(this.state.learningStrandSub != ''){
      formData.append('learningStrandSub', this.state.learningStrandSub)
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
        					<div className='title-text-container'>
        						<div className='title'>Exam Management > Import</div>
        						<div className='title-action'>
        							<Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
        								<div className='button primary small'>List of Exams</div>
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
                       <Grid.Cell large={4} medium={12} small={12}>
                        <SelectLevel 
                          required 
                          type='text' 
                          label='Level' 
                          name='level' 
                          value={this.state.level} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>


                      <Grid.Cell large={4} medium={12} small={12}>
                        <SelectLearningStrand 
                          required 
                          type='text' 
                          level={this.state.level}
                          label='Learning Strand' 
                          name='learningStrand' 
                          value={this.state.learningStrand} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <SelectSubject

                          type='text' 
                          learningStrand={this.state.learningStrand}
                          label='Modyul' 
                          name='learningStrandSub' 
                          value={this.state.learningStrandSub} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
  	        					<Grid.Cell large={12} medium={12} small={12}>
  	        						<FileInput 
                          type='file'
                          label='CSV' 
                          required
                          name='csv'
                          fileName={this.state.csvName}
                          ref={ref => this.fileInput = ref}
                          onChange={this.handleFileChange}/>
  	        					</Grid.Cell>
  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
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
    role: state.role,
    user: state.user
  }
}
const ImportExam = connect(mapStateToProps)(Layout)
export default ImportExam