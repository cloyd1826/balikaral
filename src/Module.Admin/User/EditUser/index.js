import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Select from '../../../_component/Form/Select'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

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

                    lastName: result.personalInformation.lastName,
                    firstName: result.personalInformation.firstName,
                    middleName: result.personalInformation.middleName,

                    houseNoStreet: result.personalInformation.houseNoStreet,
                    barangay: result.personalInformation.barangay,
                    city: result.personalInformation.city,
                    province: result.personalInformation.province,
                    zipcode:  result.personalInformation.zipcode,
                    userType:  result.local.userType,
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
      local: {
        email: this.state.email,
        userType: this.state.userType,
        disabled: this.statedisabled
      },
      personalInformation: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middleName: this.state.middleName,
        houseNoStreet: this.state.houseNoStreet,
        barangay: this.state.barangay,
        city: this.state.city,
        province: this.state.province,
        zipcode: this.state.zipcode ,
      },
    }
    apiRequest('put', `/user/update/${this.props.location.state.id}`, data, this.props.token)
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
                                <div className='title'>User > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/user/list'>
                                        <div className='button primary small'>List of Users</div>
                                    </Link>
                                </div>
                            </div>
                             <Form onSubmit={this.handleSubmit}>
                            <Grid>
                              <Grid.X>
                                <Grid.Cell large={12} medium={6} small={12}>
                                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                                </Grid.Cell>
                              </Grid.X>
                              <Grid.X>
                                <Grid.Cell large={4} medium={6} small={12}>
                                  <Input 
                                    label='Email' 
                                    type='email' 
                                    required
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    disabled
                                    />
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={6} small={12}>
                                  <Select
                                    label='User Type'
                                    required
                                    name='userType'
                                    value={this.state.userType}
                                    onChange={this.handleChange}
                                    >
                                    <option value='' disabled></option>
                                    <option value='Administrator'>Administrator</option>
                                    <option value='Student'>Student</option>
                                    <option value='Teacher'>Teacher</option>
                                  </Select>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={6} small={12}>
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
                                 <Grid.Cell large={3} medium={6} small={12}>
                                  <Input 
                                    label='Zip Code'
                                    
                                    name='zipcode'
                                    value={this.state.zipcode}
                                    onChange={this.handleChange}
                                     />
                                </Grid.Cell>
                                 
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/user/list'>
                                        <Button type='button' text='Return' className='cancel small'/>
                                    </Link>
                                </Grid.Cell>
                              </Grid.X>
                            </Grid>

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
    token: state.token
  }
}
const EditUser = connect(mapStateToProps)(Layout)
export default EditUser