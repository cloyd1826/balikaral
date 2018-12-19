import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import FileInput from '../../../_component/Form/FileInput'
import Select from '../../../_component/Form/Select'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'


import { connect } from 'react-redux'

import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'

import apiRequest from '../../../_axios'

import axios, { post } from 'axios'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	
      question: '',
      answer: '',
      difficulty: '',
      level: '',
      learningStrand: '',
      a: '',
      b: '',
      c: '',
      d: '',

      imageQuestionName: '',
      imageChoiceAName: '',
      imageChoiceBName: '',
      imageChoiceCName: '',
      imageChoiceDName: '',

      imageQuestion: '',
      imageChoiceA: '',
      imageChoiceB: '',
      imageChoiceC: '',
      imageChoiceD: '',



     
      message: '',
      type: '',
      active: false,
      buttonDisabled: false
      
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
      question: '',
      answer: '',
      difficulty: '',
      level: '',
      learningStrand: '',
      a: '',
      b: '',
      c: '',
      d: '',

      imageQuestionName: '',
      imageChoiceAName: '',
      imageChoiceBName: '',
      imageChoiceCName: '',
      imageChoiceDName: '',

      imageQuestion: '',
      imageChoiceA: '',
      imageChoiceB: '',
      imageChoiceC: '',
      imageChoiceD: '',

      uploader: '',
      validated: false
    })
  }

  handleFileChange(e, imageName){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      [name]: files[0],
      [imageName]: e.target.value.replace('C:\\fakepath\\', '')
    })
  }
  handleChange(e){
  	let name = e.target.name
  	let value = e.target.value

  	this.setState({
  		[name]: value
  	})
  }
  handleSubmit(e){
  	e.preventDefault()
    this.formMessage('Saving Data', 'loading', true, true)
  	this.postFile()
  		.then((res)=>{
         console.log(res)
          this.clearData()
          this.formMessage('Data has been saved', 'success', true, false)
      })	
  		.catch((err)=>{
          this.clearData() 
          this.formMessage('Error: ' + err.message, 'error', true, false)
  		})
  }
  postFile(){
    const url = `http://localhost:5000/balikaral/exam-management/`
    const formData = new FormData()
   
    formData.append('learningStrand', this.state.learningStrand)
    formData.append('level', this.state.level)
    formData.append('uploader', this.props.user.id)
    formData.append('validation', false )
    formData.append('questionDetails', this.state.question )
    formData.append('answer', this.state.answer )
    formData.append('difficulty', this.state.difficulty )
    formData.append('aDetails', this.state.a )
    formData.append('bDetails', this.state.b )
    formData.append('cDetails', this.state.c )
    formData.append('dDetails', this.state.d )

    if(this.state.imageQuestion != ''){
      formData.append('questionImage', this.state.imageQuestion )
    }
    if(this.state.imageChoiceA != ''){
      formData.append('aImage', this.state.imageChoiceA )
    }
    if(this.state.imageChoiceB != ''){
      formData.append('bImage', this.state.imageChoiceB )
    }
    if(this.state.imageChoiceC != ''){
      formData.append('cImage', this.state.imageChoiceC )
    }
    if(this.state.imageChoiceD != ''){
      formData.append('dImage', this.state.imageChoiceD )
    }


    const config = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
  }
  render() {
    console.log(this.state) 
    return (
        <div>
        	<Grid fluid>
        		<Grid.X>
        			<Grid.Cell large={12}>
        				<div className='element-container'>
        					<div className='title-text-container'>
        						<div className='title'>Exam Management > Add</div>
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

  	        					<Grid.Cell large={12} medium={12} small={12}>
  	        						<Textarea 
                          required 
                          type='text' 
                          label='Question' 
                          placeholder='Question' 
                          name='question' 
                          value={this.state.question} 
                          onChange={this.handleChange}/>
  	        					</Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Question'
                          name='imageQuestion'
                          fileName={this.state.imageQuestionName}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'imageQuestionName' )}/>
                      </Grid.Cell>
                    </Grid.X>
                    <Grid.X>
                      <Grid.Cell large={3} medium={12} small={12}>
                        <Select
                          required  
                          label='Answer'
                          name='answer' 
                          value={this.state.answer} 
                          onChange={this.handleChange}
                        >
                            <option value='' disabled></option>
                            <option value='A'>A</option>
                            <option value='B'>B</option>
                            <option value='C'>C</option>
                            <option value='D'>D</option>

                        </Select>
                      </Grid.Cell>

                      <Grid.Cell large={3} medium={12} small={12}>
                        
                        <Select
                          required 
                          type='text' 
                          label='Difficulty'
                          name='difficulty' 
                          value={this.state.difficulty} 
                          onChange={this.handleChange}
                          >
                          <option value='' disabled></option>
                          <option value='Easy'>Easy</option>
                          <option value='Medium'>Medium</option>
                          <option value='Hard'>Hard</option>
                        </Select>
                      </Grid.Cell>

                      <Grid.Cell large={3} medium={12} small={12}>
                        <SelectLevel 
                          required 
                          type='text' 
                          label='Level' 
                          name='level' 
                          value={this.state.level} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>


                      <Grid.Cell large={3} medium={12} small={12}>
                        <SelectLearningStrand 
                          required 
                          type='text' 
                          label='Learning Strand' 
                          name='learningStrand' 
                          value={this.state.learningStrand} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input  
                          type='text' 
                          label='A' 
                          placeholder='A' 
                          name='a' 
                          value={this.state.a} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Choice A'
                          name='imageChoiceA'
                          fileName={this.state.imageChoiceAName}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'imageChoiceAName' )}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input  
                          type='text' 
                          label='B' 
                          placeholder='B' 
                          name='b' 
                          value={this.state.b} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Choice B'
                          name='imageChoiceB'
                          fileName={this.state.imageChoiceBName}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'imageChoiceBName' )}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input  
                          type='text' 
                          label='C' 
                          placeholder='C' 
                          name='c' 
                          value={this.state.c} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Choice C'
                          name='imageChoiceC'
                          fileName={this.state.imageChoiceCName}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'imageChoiceCName' )}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <Input  
                          type='text' 
                          label='D' 
                          placeholder='D' 
                          name='d' 
                          value={this.state.d} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>
                      <Grid.Cell large={6} medium={12} small={12}>
                        <FileInput 
                          type='file'
                          label='Image for Choice D'
                          name='imageChoiceD'
                          fileName={this.state.imageChoiceDName}
                          accept="image/*"
                          refProps={ref => this.fileInput = ref}
                          onChange={(e)=> this.handleFileChange(e, 'imageChoiceDName' )}/>
                      </Grid.Cell>

  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '') }>
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
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel