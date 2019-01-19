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

import Table from '../../../_component/Table'


import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectLevel from '../../../_special-form/SelectLevel'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        name: '',
        description: '',
        learningStrand: '',

       
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
    if(this.props.location.state){
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
    
  }
  fetchSingle(){
    apiRequest('get', `/management-forum/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
      
                this.setState({
                     name: result.name,
                    description: result.description,
                    learningStrand: result.learningStrand ? result.learningStrand._id ? result.learningStrand._id : '' : ''  ,

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
      name: this.state.name,
      description: this.state.description,
      learningStrand: this.state.learningStrand,
    }
    
    apiRequest('put', `/management-forum/update/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
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
                    <Grid.Cell large={12}  medium={12} small={12}>
                        <div className='element-container'>
                            <div className='title-text-container hide-on-large-x'>
                                <div className='title'>Forum Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/forum/list/'>
                                        <div className='button primary small'>List of Forum</div>
                                    </Link>
                                </div>
                            </div>
                            <Form onSubmit={this.handleSubmit}>                            
                           <Grid.X>
                              <Grid.Cell large={12} medium={12} small={12}>
                                <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                              </Grid.Cell>

                              
                              <Grid.Cell large={12} medium={12} small={12}>
                                <Input
                                  label='Forum Name'
                                  name='name'
                                  required
                                  placeholder='Forum Name'
                                  value={this.state.name}
                                  onChange={this.handleChange}
                                />
                              </Grid.Cell>
                              <Grid.Cell large={12} medium={12} small={12}>
                                <Input
                                  label='Description'
                                  name='description'
                                  placeholder='Description'
                                  value={this.state.description}
                                  onChange={this.handleChange}
                                />
                              </Grid.Cell>
                              <Grid.Cell large={3} medium={12} small={12}>
                                <SelectLearningStrand 
                                  required 
                                  label='LearningStrand' 
                                  name='learningStrand'
                                  value={this.state.learningStrand} 
                                  onChange={this.handleChange}/>
                              </Grid.Cell>
                              <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                <Button type='submit' disabled={this.state.buttonDisabled} text='Save' className='secondary small' />
                                <Link to='/admin/management/forum/list'>
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
const EditExamType = connect(mapStateToProps)(Layout)
export default EditExamType