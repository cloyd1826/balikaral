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
            if(res.data){
                let result = res.data.data
                this.setState({

                    lastName: result.personalInformation.lastName,
                    firstName: result.personalInformation.firstName,
                    middleName: result.personalInformation.middleName,

                    houseNoStreet: result.personalInformation.houseNoStreet,
                    barangay: result.personalInformation.barangay,
                    city: result.personalInformation.city,
                    province: result.personalInformation.province
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
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middleName: this.state.middleName,
        houseNoStreet: this.state.houseNoStreet,
        barangay: this.state.barangay,
        city: this.state.city,
        province: this.state.province
    }
    apiRequest('put', `/user/update-personal-info/${this.props.location.state.id}`, data, this.props.token)
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
            <Form size='small' onSubmit={this.handleSubmit}>
                <Grid.X>
                  <Grid.Cell large={12} medium={6} small={12}>
                    <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage>
                  </Grid.Cell>
                </Grid.X>
                <Grid.X>
                  <Grid.Cell large={4} medium={6}  small={12}>
                    <Input 
                      label='First Name'
                      required
                      name='firstName'
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                  <Grid.Cell large={4} medium={6} small={12}>
                    <Input 
                      label='Middle Name' 
                      
                      name='middleName'
                      value={this.state.middleName}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                   <Grid.Cell large={4} medium={6} small={12}>
                    <Input 
                      label='Last Name'
                      required
                      name='lastName'
                      value={this.state.lastName}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='House No'
                      
                      name='houseNoStreet'
                      value={this.state.houseNoStreet}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='Baranggay'
                      
                      name='barangay'
                      value={this.state.barangay}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='City'
                      
                      name='city'
                      value={this.state.city}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='Province'
                      
                      name='province'
                      value={this.state.province}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   
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
const UpdateInformation = connect(mapStateToProps)(Layout)
export default UpdateInformation