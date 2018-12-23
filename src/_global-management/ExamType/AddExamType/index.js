import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Select from '../../../_component/Form/Select'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
      examType: '',
      examDescription: '',
      learningStrand: '',
      difficultyEasy: '',
      difficultyMedium: '',
      difficultyHard: '',
      passingRate: '',
      totalHours: '',
     
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
        examType: '',
        examDescription: '',
        learningStrand: '',
        difficultyEasy: '',
        difficultyMedium: '',
        difficultyHard: '',
        passingRate: '',
        totalHours: ''
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
    let total = parseInt(this.state.difficultyEasy) + parseInt(this.state.difficultyEasy) + parseInt(this.state.difficultyEasy)
  	let data = {
      examType: this.state.examType,
      examDescription: this.state.examDescription,
      learningStrand: this.state.learningStrand,
      difficulty: {
        easy: parseInt(this.state.difficultyEasy),
        medium: parseInt(this.state.difficultyMedium), 
        hard: parseInt(this.state.difficultyHard)
      },
      examTotal: total,
      passingRate: parseInt(this.state.passingRate),
      totalHours: this.state.totalHours,
  	}
  	apiRequest('post', '/exam-type-management', data, this.props.token)
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
        						<div className='title'>Exam Type Management > Add</div>
        						<div className='title-action'>
        							<Link to='/admin/management/exam-type/list'>
        								<div className='button primary small'>List of Exam Type</div>
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
                        <Select
                          required
                          label='Exam Type'
                          name='examType'
                          value={this.state.examType}
                          onChange={this.handleChange}
                        >
                          <option value='' disabled></option>
                          <option value='Pre Test'>Pre Test</option>
                          <option value='Post Test'>Post Test</option>
                          <option value='Adaptive Test'>Adaptive Test</option>
                        </Select>
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
                        <Textarea
                          name='examDescription'
                          placeholder='Exam Description'
                          value={this.state.examDescription}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <Input
                          required
                          type='number'
                          min={0}
                          label='No Of Easy Questions'
                          name='difficultyEasy'
                          value={this.state.difficultyEasy}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <Input
                          required
                          type='number'
                          min={0}
                          label='No Of Medium Questions'
                          name='difficultyMedium'
                          value={this.state.difficultyMedium}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <Input
                          required
                          type='number'
                          min={0}
                          label='No Of Hard Questions'
                          name='difficultyHard'
                          value={this.state.difficultyHard}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <Input
                          required
                          type='number'
                          min={0}
                          label='Passing Rate'
                          name='passingRate'
                          value={this.state.passingRate}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={4} medium={12} small={12}>
                        <Input
                          required
                          type='number'
                          min={0}
                          label='Total Exam Time (in minutes)'
                          name='totalHours'
                          value={this.state.totalHours}
                          onChange={this.handleChange}
                        />
                      </Grid.Cell>


  	        					<Grid.Cell className='form-button right' large={12} medium={12} small={12}>
  	        						<Button type='submit' disabled={this.buttonDisabled} text='Save' className='secondary small' />
                        <Link to='/admin/management/exam-type/list'>
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