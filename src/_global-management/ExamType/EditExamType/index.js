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



import SelectLevel from '../../../_special-form/SelectLevel'
import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        
        examType: '',
        examDescription: '',
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
    apiRequest('get', `/exam-type-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
                this.setState({
                    examType: result.examType,
                    examDescription: result.examDescription,
                    difficultyEasy: result.difficulty ? result.difficulty.easy ? result.difficulty.easy : '' : '',
                    difficultyMedium: result.difficulty ? result.difficulty.medium ? result.difficulty.medium : '' : '',
                    difficultyHard: result.difficulty ? result.difficulty.hard ? result.difficulty.hard : '' : '',
                    passingRate: result.passingRate,
                    totalHours: result.totalHours
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
    let total = parseInt(this.state.difficultyEasy) + parseInt(this.state.difficultyEasy) + parseInt(this.state.difficultyEasy)
    let data = {
      examType: this.state.examType,
      examDescription: this.state.examDescription,
      difficulty: {
        easy: parseInt(this.state.difficultyEasy),
        medium: parseInt(this.state.difficultyMedium), 
        hard: parseInt(this.state.difficultyHard)
      },
      examTotal: total,
      passingRate: parseInt(this.state.passingRate),
      totalHours: this.state.totalHours
    }
    
    apiRequest('put', `/exam-type-management/update/${this.props.location.state.id}`, data, this.props.token)
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
                                <div className='title'>Exam Type Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/exam-type/list/'>
                                        <div className='button primary small'>List of Exam Types</div>
                                    </Link>
                                </div>
                            </div>
                            <Form onSubmit={this.handleSubmit}>                            
                            <Grid.X>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                                 
                                </Grid.Cell>
                                <Grid.Cell large={12} medium={12} small={12}>
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
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/management/exam-type/list/'>
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
const EditExamType = connect(mapStateToProps)(Layout)
export default EditExamType