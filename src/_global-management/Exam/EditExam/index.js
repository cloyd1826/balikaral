import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ImageLoader from '../../../_component/ImageLoader'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import FileInput from '../../../_component/Form/FileInput'
import Select from '../../../_component/Form/Select'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import config from '../../../_config'

import { connect } from 'react-redux'

import axios, { put } from 'axios'

import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectSubject from '../../../_special-form/SelectSubject'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        question: '',
        answer: '',
        difficulty: '',
        level: '',
        learningStrand: '',
        learningStrandSub: '',
        a: '',
        b: '',
        c: '',
        d: '',

        aImage: '',
        bImage: '',
        cImage: '',
        dImage: '',
        questionImage: '',

        uploader: '',
        validation: '',
        validator: [],
     
        imageQuestion: '',
        imageChoiceA: '',
        imageChoiceB: '',
        imageChoiceC: '',
        imageChoiceD: '',

        questionImage: '',
        aImage: '',
        bImage: '',
        cImage: '',
        dImage: '',

        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        preview: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.previewExam = this.previewExam.bind(this)

    this.putFile = this.putFile.bind(this)


  this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleLearningStrandChange = this.handleLearningStrandChange.bind(this)
  }
  handleLevelChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrand: '',
      learningStrandSub: '',
    })
  }
  handleLearningStrandChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrandSub: '',
    })
  }
  previewExam(){
    if(this.state.preview){
      this.setState({
        preview: false
      })
    }else{
      this.setState({
        preview: true
      })
    }
  }
  formMessage(message, type, active, button){
    this.setState({
      message: message,
      type: type,
      active: active,
      buttonDisabled: button
    })
  }
  
  componentDidMount(){
    if(this.props.location.state){
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
  }
  fetchSingle(){
    apiRequest('get', `/exam-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
                this.setState({
                    questionImage: (result.question ? result.question.images ? result.question.images : '' : ''),
                    question: (result.question ? result.question.details ? result.question.details : '' : ''),
                    answer: (result.question ? result.question.answer ? result.question.answer : '' : ''),
                    difficulty: (result.question ? result.question.difficulty ? result.question.difficulty : '' : ''),
                    level: (result.level ? result.level._id ? result.level._id : '' : ''),
                    learningStrand: (result.learningStrand ? result.learningStrand._id ? result.learningStrand._id : '' : ''),
                    learningStrandSub: (result.learningStrandSub ? result.learningStrandSub._id ? result.learningStrandSub._id : '' : ''),

                    a: (result.question ? result.question.choices ? result.question.choices.a ? result.question.choices.a.details ? result.question.choices.a.details : '' : '' : '' : '' ),
                    b: (result.question ? result.question.choices ? result.question.choices.b ? result.question.choices.b.details ? result.question.choices.b.details : '' : '' : '' : '' ),
                    c: (result.question ? result.question.choices ? result.question.choices.c ? result.question.choices.c.details ? result.question.choices.c.details : '' : '' : '' : '' ),
                    d: (result.question ? result.question.choices ? result.question.choices.d ? result.question.choices.d.details ? result.question.choices.d.details : '' : '' : '' : '' ),
                   
                    aImage: (result.question ? result.question.choices ? result.question.choices.a ? result.question.choices.a.image ? result.question.choices.a.image : '' : '' : '' : '' ),
                    bImage: (result.question ? result.question.choices ? result.question.choices.b ? result.question.choices.b.image ? result.question.choices.b.image : '' : '' : '' : '' ),
                    cImage: (result.question ? result.question.choices ? result.question.choices.c ? result.question.choices.c.image ? result.question.choices.c.image : '' : '' : '' : '' ),
                    dImage: (result.question ? result.question.choices ? result.question.choices.d ? result.question.choices.d.image ? result.question.choices.d.image : '' : '' : '' : '' ),

                    uploader: (result.uploader ? result.uploader.personalInformation ? 
                              (result.uploader.personalInformation.firstName ? result.uploader.personalInformation.firstName : '') 
                              + ' ' + 
                              (result.uploader.personalInformation.middleName ? result.uploader.personalInformation.middleName.substring(0,1) : '')
                              + ' ' + 
                              (result.uploader.personalInformation.lastName ? result.uploader.personalInformation.lastName : '')
                              : '' : ''),
                    validation: result.validation,
                    validator: (result.validator ? result.validator : [] ),
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
  handleFileChange(e, imageName){
    let name = e.target.name
    let value = e.target.value
    let files = e.target.files

    this.setState({
      [name]: files[0],
      [imageName]: e.target.value.replace('C:\\fakepath\\', '')
    })
  }
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Updating Data...', 'loading', true, true)
    this.putFile()
        .then((res)=>{
          this.formMessage('Data has been updated', 'success', true, false)
          this.fetchSingle()
      })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  putFile(){
    const url = `${config}/balikaral/exam-management/update/${this.props.location.state.id}`
    const formData = new FormData()
   
    formData.append('learningStrand', this.state.learningStrand)
    formData.append('level', this.state.level)
    formData.append('uploader', this.props.user.id)
    formData.append('validation', this.state.validation )
    formData.append('questionDetails', this.state.question )
    formData.append('answer', this.state.answer )
    formData.append('difficulty', this.state.difficulty )

    formData.append('aDetails', this.state.a )
    formData.append('bDetails', this.state.b )
    formData.append('cDetails', this.state.c )
    formData.append('dDetails', this.state.d )

    if(this.state.imageQuestion != ''){
      formData.append('questionImage', this.state.imageQuestion )
    }else{
      formData.append('questionImageText', this.state.questionImage )
    }
    if(this.state.learningStrandSub != ''){
       formData.append('learningStrandSub', this.state.learningStrandSub)
    }
    if(this.state.imageChoiceA  != ''){
      formData.append('aImage', this.state.imageChoiceA )
    }else{
      formData.append('aImageText', this.state.aImage )
    }

    if(this.state.imageChoiceB != ''){
      formData.append('bImage', this.state.imageChoiceB )
    }else{
      formData.append('bImageText', this.state.bImage )
    }

    if(this.state.imageChoiceC != ''){
      formData.append('cImage', this.state.imageChoiceC )
    }else{
      formData.append('cImageText', this.state.cImage )
    }

    if(this.state.imageChoiceD != ''){
      formData.append('dImage', this.state.imageChoiceD )
    }else{
      formData.append('dImageText', this.state.dImage )
    }


    const configPut = {
        headers: {
            Authorization: `${this.props.token}`,
            'content-type': 'multipart/form-data'
        }
    }
    return put(url, formData, configPut)
  }
  render() { 
    return (
        <div>
            <Grid fluid>
                <Grid.X>
                    <Grid.Cell large={12}  medium={12} small={12}>
                        <div className='element-container'>
                            <div className='title-text-container hide-on-large'>
                                <div className='title'>Exam Management > Edit</div>
                                <div className='title-action'>
                                    <div onClick={this.previewExam} className='button primary small'>{this.state.preview ? 'Edit' : 'Preview'} Exam</div>
                                    <Link to={ (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
                                        <div className='button primary small'>List of Exams</div>
                                    </Link>
                                </div>
                            </div>

                            {!this.state.preview ?
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
                                    label='Question Image'
                                    name='imageQuestion'
                                    fileName={this.state.questionImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'questionImage' )}/>
                                </Grid.Cell>
                              </Grid.X>
                              <Grid.X>
                               

                                <Grid.Cell large={3} medium={12} small={12}>
                                  <SelectLevel 
                                    required 
                                    type='text' 
                                    label='Level' 
                                    name='level' 
                                    value={this.state.level} 
                                    onChange={this.handleLevelChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={3} medium={12} small={12}>
                                  <SelectLearningStrand 
                                    required 
                                    level={this.state.level}
                                    label='Learning Strand' 
                                    name='learningStrand' 
                                    value={this.state.learningStrand} 
                                    onChange={this.handleLearningStrandChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={3} medium={12} small={12}>
                                  <SelectSubject 
                                     
                                    learningStrand={this.state.learningStrand}
                                    name='learningStrandSub' 
                                    value={this.state.learningStrandSub} 
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
                                    fileName={this.state.aImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'aImage' )}/>
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
                                    fileName={this.state.bImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'bImage' )}/>
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
                                    fileName={this.state.cImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'cImage' )}/>
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
                                    fileName={this.state.dImage}
                                    accept="image/*"
                                    refProps={ref => this.fileInput = ref}
                                    onChange={(e)=> this.handleFileChange(e, 'dImage' )}/>
                                </Grid.Cell>

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
                                    <option value='Average'>Average</option>
                                    <option value='Difficult'>Difficult</option>
                                  </Select>
                                </Grid.Cell>

                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to={(this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/exam/list/' + ( this.props.role === 'Administrator' ? 'all' : '') + (this.props.role === 'Teacher' ? 'teachers' : '')}>
                                        <Button type='button' text='Return' className='cancel small'/>
                                    </Link>
                                </Grid.Cell>
                            </Grid.X>
                            </Form>

                             : 

                            <Grid.X>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <div className='question-card'>
                                    <div className='question'>{this.state.question}</div>
                                    {
                                      this.state.questionImage != '' ?
                                      
                                      <ImageLoader
                                        className='question-image'
                                        image={this.state.questionImage}
                                        />

                                      : null }                                  
                                    <div className='answer-container'>

                                        <div className='answer-box'>
                                          <div className='answer-text'>
                                            <span className={'letter ' + (this.state.answer === 'A' ? 'correct' : '')}>A.</span>
                                            <span className='answer'>
                                               {
                                                this.state.aImage != '' ?
                                                <ImageLoader 
                                                  className='answer-image'
                                                  image={this.state.aImage}
                                                />
                                                
                                                : null }
                                              {this.state.a}
                                            </span>
                                          </div>
                                          
                                        </div>
                                        <div className='answer-box'>
                                          <div className='answer-text'>
                                            <span className={'letter ' + (this.state.answer === 'B' ? 'correct' : '')}>B.</span>
                                            <span className='answer'>
                                              {
                                                this.state.bImage != '' ?
                                                <ImageLoader 
                                                  className='answer-image'
                                                  image={this.state.bImage}
                                                />
                                                
                                                : null }
                                              {this.state.b}
                                            </span>
                                          </div>
                                         
                                        </div>
                                        <div className='answer-box'>
                                          <div className='answer-text'>
                                            <span className={'letter ' + (this.state.answer === 'C' ? 'correct' : '')}>C.</span>
                                            <span className='answer'>
                                             {
                                                this.state.cImage != '' ?
                                                 <ImageLoader 
                                                  className='answer-image'
                                                  image={this.state.cImage}
                                                  />
                                                : null }
                                              {this.state.c}
                                            </span>
                                          </div>
                                        </div>
                                        <div className='answer-box'>
                                          <div className='answer-text'>
                                            <span className={'letter ' + (this.state.answer === 'D' ? 'correct' : '')}>D.</span>
                                            <span className='answer'>
                                              {
                                                this.state.dImage != '' ?
                                                 <ImageLoader 
                                                    className='answer-image'
                                                    image={this.state.dImage}
                                                  />
                                                : null }
                                              {this.state.d}
                                            </span>
                                          </div>
                                        </div>

                                    </div>
                                    <div className='difficulty'>Difficulty: {this.state.difficulty}</div>
                                  </div>
                                </Grid.Cell>
                            </Grid.X>
                          }
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