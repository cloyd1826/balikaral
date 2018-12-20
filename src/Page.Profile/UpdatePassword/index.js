import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'

import Form from '../../_component/Form/Form'
import FormMessage from '../../_component/Form/FormMessage'
import Input from '../../_component/Form/Input'
import Select from '../../_component/Form/Select'
import Button from '../../_component/Form/Button'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        middleName: '',

        houseNoStreet: '',
        barangay: '',
        city: '',
        province: '',
        zipcode:  '',
        userType:  '',
        disabled: false,
     
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
    apiRequest('get', `/user/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                let result = res.data.data
                this.setState({
                    email: result.local.email,
                    disabled: result.local.disabled,
                    userType:  result.local.userType,
                    password: result.local.password
                })
            }
        })    
        .catch((err)=>{
          this.formMessage('Error: ' + err.message, 'error', true, false)
        })
  }
  clearData(){
    this.setState({
      name: '',
      description: '',
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
        email: this.state.email,
        userType: this.state.userType,
        disabled: this.statedisabled,
        password: this.state.password
    }
    apiRequest('put', `/user/update-account-info/${this.props.location.state.id}`, data, this.props.token)
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
          <Form onSubmit={this.handleSubmit}>
              <Grid.X>
                <Grid.Cell large={12} medium={6} small={12}>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                </Grid.Cell>
              </Grid.X>
              <Grid.X>
                <Grid.Cell large={6} medium={12} small={12}>
                  <Input 
                    label='Email' 
                    type='email' 
                    required
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                </Grid.Cell>
                <Grid.Cell large={6} medium={12} small={12}>
                  <Input 
                    label='Password' 
                    type='password' 
                    required
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </Grid.Cell>
              </Grid.X>
              {this.props.role === 'Administrator' ? 
                <Grid.X>
                  <Grid.Cell large={4} medium={12} small={12}>
                    <Select
                      label='User Type'
                      required
                      name='userType'
                      value={this.state.userType}
                      onChange={this.handleChange}
                      >
                      <option value='' disabled></option>
                      <option value='Administrator'>Administrator</option>
                      <option value='Learner'>Learner</option>
                      <option value='Teacher'>Teacher</option>
                    </Select>
                  </Grid.Cell>
                  <Grid.Cell large={4} medium={12 } small={12}>
                    <Select
                      label='Access'
                      required
                      name='disabled'
                      value={this.state.disabled}
                      onChange={this.handleChange}
                      >
                      <option value='' disabled></option>
                      <option value={false}>Has Access</option>
                      <option value={true}>Disabled Access</option>
                    </Select>
                  </Grid.Cell>
                </Grid.X>
              : null }
              
              <Grid.X>
                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                </Grid.Cell>
              </Grid.X>
          </Form>
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
const EditUser = connect(mapStateToProps)(Layout)
export default EditUser