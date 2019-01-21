import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'

import Form from '../../_component/Form/Form'
import FormMessage from '../../_component/Form/FormMessage'
import Input from '../../_component/Form/Input'
import Textarea from '../../_component/Form/Textarea'
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
    
    if(this.props.location.state){
      
      this.fetchSingle()
    }else{
      this.props.history.push('/')
    }
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
    apiRequest('put', `/user/update-personal-info/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          this.fetchSingle()
          this.formMessage('Learner Information has been updated', 'success', true, false)
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
                      label='Learning Center'
                      
                      name='learningCenter'
                      value={this.state.learningCenter}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                  <Grid.Cell large={4} medium={6}  small={12}>
                    <Input 
                      label='Grade o Level na inabot'
                      
                      name='gradeLevel'
                      value={this.state.gradeLevel}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                  <Grid.Cell large={4} medium={6}  small={12}>
                    <Input 
                      label='Rason kung bakit tumigil'
                      
                      name='reasongForStopping'
                      value={this.state.reasongForStopping}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                  <Grid.Cell large={4} medium={6}  small={12}>
                    <Input 
                      label='Pinagkaka-abalahan ngayon'
                      
                      name='lifeStatus'
                      value={this.state.lifeStatus}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>

                  <Grid.Cell large={12} medium={6}  small={12}>
                    <Textarea 
                      label='About sa iyong sarili'
                      rows={3}
                      name='about'
                      value={this.state.about}
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
const UpdateInformation = connect(mapStateToProps)(Layout)
export default UpdateInformation