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
      level: '',
      learningStrand: '',
      a: '',
      b: '',
      c: '',
      d: '',

     
      message: '',
      type: '',
      active: false,
      buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
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
      question: '',
      answer: '',
      level: '',
      learningStrand: '',
      a: '',
      b: '',
      c: '',
      d: '',
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
  	let data = {
      level: this.state.level,
      learningStrand: this.state.learningStrand,
      question: {
        details: this.state.question,
        answer: this.state.answer,
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
          }
        }
      }
  	}

  	apiRequest('post', '/exam-management', data, this.props.token)
  		.then((res)=>{
          this.clearData()
          this.formMessage('Data has been saved', 'success', true, false)
      })	
  		.catch((err)=>{
          this.clearData() 
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
        						<div className='title'>Exam Management > Add</div>
        						<div className='title-action'>
        							<Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list'}>
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
                      <Grid.Cell large={12} medium={12} small={12}>
                        <Textarea 
                          required 
                          type='text' 
                          label='Answer' 
                          placeholder='Answer' 
                          name='answer' 
                          value={this.state.answer} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>

                      <Grid.Cell large={6} medium={12} small={12}>
                        <SelectLevel 
                          required 
                          type='text' 
                          label='Level' 
                          name='level' 
                          value={this.state.level} 
                          onChange={this.handleChange}/>
                      </Grid.Cell>


                      <Grid.Cell large={6} medium={12} small={12}>
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
  	        						<Button type='submit' text='Save' className='secondary small' />
                        <Link to={(this.props.role === 'Administrator' ? '/admin' : '') + (this.props.role === 'Teacher' ? '/teacher' : '') +  '/management/exam/list'}>
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
    role: state.role
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel