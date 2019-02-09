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
import SelectLevel from '../../../_special-form/SelectLevel'


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
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      middleName: this.state.middleName,
      userType: this.state.userType,
      gender: this.state.gender,
      birthday: this.state.birthday,
      civilStatus: this.state.civilStatus,
    }
    if(this.state.userType === 'Learner'){
      data = {...data, level: this.state.level, learningCenter: this.state.learningCenter}
    }
    
    apiRequest('post', `/signup?userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          this.formMessage('New User has been created', 'success', true, false)
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
                    <Grid.Cell large={12} medium={12} small={12}>
                        <div className='element-container'>
                            <div className='title-text-container hide-on-large-x'>
                                <div className='title'>User > Add</div>
                                <div className='title-action'>
                                    <Link to='/admin/user/list'>
                                        <div className='button primary small'>List of Users</div>
                                    </Link>
                                </div>
                            </div>
                             <Form onSubmit={this.handleSubmit}>
                            <Grid fluid>
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
                                    />
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={6} small={12}>
                                  <Input 
                                    label='Password' 
                                    type='password' 
                                    required
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
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
                                    <option value='Learner'>Learner</option>
                                    <option value='Teacher'>Teacher</option>
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
                                 <Grid.Cell large={4} medium={12} small={12}>
                                  <Select
                                    label='Gender'
                                    required
                                    name='gender'
                                    value={this.state.gender}
                                    onChange={this.handleChange}
                                    >
                                    <option value=''></option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                  </Select>
                                </Grid.Cell>
                                <Grid.Cell large={4} medium={12} small={12}>
                                  <Select
                                    label='Civil Status'
                                    name='civilStatus'
                                    value={this.state.civilStatus}
                                    onChange={this.handleChange}
                                    >
                                    <option value=''></option>
                                    <option value='Single'>Single</option>
                                    <option value='Married'>Married</option>
                                    <option value='Divorced'>Divorced</option>
                                    <option value='Widowed'>Widowed</option>
                                  </Select>
                                </Grid.Cell>
                                 <Grid.Cell large={4} medium={12} small={12}>
                                  <Input 
                                    type='date'
                                    label='Birthday'
                                    required
                                    name='birthday'
                                    value={this.state.birthday}
                                    onChange={this.handleChange}
                                     />
                                </Grid.Cell>
                              </Grid.X>
                              {this.state.userType === 'Learner' ? 
                                <Grid.X>
                                  <Grid.Cell large={4} medium={12} small={12}>
                                    <SelectLevel
                                      label='Level'
                                      required
                                      name='level'
                                      value={this.state.level}
                                      onChange={this.handleChange}
                                      />
                                  </Grid.Cell>
                                  <Grid.Cell large={4} medium={12} small={12}>
                                    <Input
                                      label='Learning Center'
                                      required
                                      name='learningCenter'
                                      value={this.state.learningCenter}
                                      onChange={this.handleChange}
                                      />
                                  </Grid.Cell>

                                </Grid.X>
                              : null}
                              <Grid.X>
                                 
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
    token: state.token,
    user: state.user
  }
}
const AddUser = connect(mapStateToProps)(Layout)
export default AddUser