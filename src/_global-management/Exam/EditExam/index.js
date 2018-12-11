import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'



import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'


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

        uploader: '',
        validation: '',
        validator: [],
     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
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
  
  componentDidMount(){
    this.fetchSingle()
  }
  fetchSingle(){
    apiRequest('get', `/exam-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            console.log(res.data.data)
            if(res.data){
                let result = res.data.data
                this.setState({
                    question: result.question.details,
                    answer: result.question.answer,
                    difficulty: result.question.difficulty,
                    a: result.question.choices.a.details,
                    b: result.question.choices.b.details,
                    c: result.question.choices.c.details,
                    d: result.question.choices.d.details,

                    level: result.level._id,
                    learningStrand: result.learningStrand._id,

                    uploader: result.uploader,
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
  handleSubmit(e){
    e.preventDefault()
    this.formMessage('Updating Data...', 'loading', true, true)
   let data = {
      level: this.state.level,
      learningStrand: this.state.learningStrand,
      uploader: this.state.uploader,
      validation: this.state.validation,
      validator: this.state.validator,
      question: {
        details: this.state.question,
        answer: this.state.answer,
        difficulty: this.state.difficulty,
        choices: {
          a: {
            type: '',
            details: this.state.a,
          },
          b: {
            type: '',
            details: this.state.b,
          },
          c: {
            type: '',
            details: this.state.c,
          },
          d: {
            type: '',
            details: this.state.d,
          },
        }
      }
    }
    
    apiRequest('put', `/exam-management/update/${this.props.location.state.id}`, data, this.props.token)
        .then((res)=>{
          this.formMessage('Data has been updated', 'success', true, false)
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
                    <Grid.Cell large={12}>
                        <div className='element-container'>
                            <div className='title-text-container'>
                                <div className='title'>Exam Management > Edit</div>
                                <div className='title-action'>
                                    <Link to={ (this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list'}>
                                        <div className='button primary small'>List of Exams</div>
                                    </Link>
                                </div>
                            </div>
                            <Form 
                                onSubmit={this.handleSubmit}
                                >
                            <Grid.X>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage>
                                 
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
                                <Grid.Cell large={3} medium={12} small={12}>
                                  <Input 
                                    required 
                                    type='text' 
                                    label='Answer' 
                                    placeholder='Answer' 
                                    name='answer' 
                                    value={this.state.answer} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>

                                <Grid.Cell large={3} medium={12} small={12}>
                                  <Input 
                                    required 
                                    type='text' 
                                    label='Difficulty' 
                                    placeholder='Difficulty' 
                                    name='difficulty' 
                                    value={this.state.difficulty} 
                                    onChange={this.handleChange}/>
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

                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Input  
                                    type='text' 
                                    label='A' 
                                    placeholder='A' 
                                    name='a' 
                                    value={this.state.a} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>

                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Input  
                                    type='text' 
                                    label='B' 
                                    placeholder='B' 
                                    name='b' 
                                    value={this.state.b} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>

                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Input  
                                    type='text' 
                                    label='C' 
                                    placeholder='C' 
                                    name='c' 
                                    value={this.state.c} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>

                                <Grid.Cell large={12} medium={12} small={12}>
                                  <Input  
                                    type='text' 
                                    label='D' 
                                    placeholder='D' 
                                    name='d' 
                                    value={this.state.d} 
                                    onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list'}>
                                        <Button type='button' text='Return' className='cancel small'/>
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
    role: state.role
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel