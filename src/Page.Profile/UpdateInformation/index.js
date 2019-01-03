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

import { bindActionCreators } from 'redux'
import { logInUser } from '../../_redux/actions/user'
import config from '../../_config'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        firstName: '',
        lastName: '',
        middleName: '',
        houseNoStreet: '',
        barangay: '',
        city: '',
        province: '',

        learningCenter: '',
        gradeLevel: '',
        reasongForStopping: '', 
        lifeStatus: '', 
        
        gender: '', 

        about: '', 

        image: '', 
     
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
                    
                    lastName: (result.personalInformation.lastName ? result.personalInformation.lastName : ''),
                    firstName: (result.personalInformation.firstName ? result.personalInformation.firstName : ''),
                    middleName: (result.personalInformation.middleName ? result.personalInformation.middleName : ''),

                    houseNoStreet: result.personalInformation ? result.personalInformation.houseNoStreet ? result.personalInformation.houseNoStreet : '' : '' ,
                    barangay: result.personalInformation ? result.personalInformation.barangay ? result.personalInformation.barangay : '' : '',
                    city: result.personalInformation ? result.personalInformation.city ? result.personalInformation.city : '' : '',
                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 

                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 

                    learningCenter: result.personalInformation ?  result.personalInformation.learningCenter ?  result.personalInformation.learningCenter : '' : '',
                    gradeLevel: result.personalInformation ?  result.personalInformation.gradeLevel ?  result.personalInformation.gradeLevel : '' : '',
                    reasongForStopping: result.personalInformation ?  result.personalInformation.reasongForStopping ?  result.personalInformation.reasongForStopping : '' : '',
                    lifeStatus: result.personalInformation ?  result.personalInformation.lifeStatus ?  result.personalInformation.lifeStatus : '' : '',
                    
                    gender: result.personalInformation ?  result.personalInformation.gender ?  result.personalInformation.gender : '' : '',

                    about: result.personalInformation ?  result.personalInformation.about ?  result.personalInformation.about : '' : '',
                    image: (result.personalInformation ? result.personalInformation.image ? result.personalInformation.image : '' : '')
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
        province: this.state.province,

        learningCenter: this.state.learningCenter,
        gradeLevel: this.state.gradeLevel,
        reasongForStopping: this.state.reasongForStopping, 
        lifeStatus: this.state.lifeStatus, 
        
        gender: this.state.gender, 

        about: this.state.about, 

        image: this.state.image, 

    }
    apiRequest('put', `/user/update-personal-info/${this.props.location.state.id}`, data, this.props.token)
        .then((res)=>{
          this.fetchSingle()
          this.formMessage('Personal Information has been updated', 'success', true, false)
          if(this.props.location.state.id === this.props.user.id){
            let result = res.data
            let userData = {
              user: {
                id: result.data ? result.data._id ? result.data._id : '' : '',
                email: result.data.local ? result.data.local.email ? result.data.local.email : '' : '',
                firstName: result.data.personalInformation ? result.data.personalInformation.firstName ? result.data.personalInformation.firstName : '' : '' ,
                middleName: result.data.personalInformation ? result.data.personalInformation.middleName ? result.data.personalInformation.middleName : '' :'' ,
                lastName: result.data.personalInformation ? result.data.personalInformation.lastName ? result.data.personalInformation.lastName : '' :'' ,
                image: result.data.personalInformation ? result.data.personalInformation.image ? result.data.personalInformation.image : '' : '',
              },
              token: this.props.token,
              isLoggedIn: true,
              role: result.data.local ? result.data.local.userType ? result.data.local.userType : '' : ''
            }
            this.props.actions.logIn(userData)
          }
          
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
                </Grid.X>
                <Grid.X>
                  <Grid.Cell large={4} medium={6} small={12}>
                    <Select 
                      label='Gender'
                      name='gender'
                      value={this.state.gender}
                      onChange={this.handleChange}
                    >
                      <option value=''></option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Select>
                  </Grid.Cell>
                </Grid.X>
                <Grid.X>
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
    role: state.role,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
     actions:{
       logIn: bindActionCreators(logInUser, dispatch)
    }
  }
}
const UpdateInformation = connect(mapStateToProps,mapDispatchToProps)(Layout)
export default UpdateInformation