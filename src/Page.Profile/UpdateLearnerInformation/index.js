import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'

import Form from '../../_component/Form/Form'
import FormMessage from '../../_component/Form/FormMessage'
import Input from '../../_component/Form/Input'
import Select from '../../_component/Form/Select'
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
        buttonDisabled: false,

        lastGradeLevelCompleted: '',
        reasonDropOut: '',
        attendedAlsLessonBefore: '',
        completedProgram: '', 

        yearsInAls: '',
        registeredExaminee: '',
        occupation: '',
      
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
                if(result.method === 'local'){
                  this.setState({
                    lastName: (result.personalInformation.lastName ? result.personalInformation.lastName : ''),
                    firstName: (result.personalInformation.firstName ? result.personalInformation.firstName : ''),
                    middleName: (result.personalInformation.middleName ? result.personalInformation.middleName : ''),
                    houseNoStreet: result.personalInformation ? result.personalInformation.houseNoStreet ? result.personalInformation.houseNoStreet : '' : '' ,
                    barangay: result.personalInformation ? result.personalInformation.barangay ? result.personalInformation.barangay : '' : '',
                    city: result.personalInformation ? result.personalInformation.city ? result.personalInformation.city : '' : '',
                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 
                    province: result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '', 
                    gender: result.personalInformation ?  result.personalInformation.gender ?  result.personalInformation.gender : '' : '',
                    image: (result.personalInformation ? result.personalInformation.image ? result.personalInformation.image : '' : ''),
                  })
                }
                this.setState({
                    learningCenter: result.personalInformation ?  result.personalInformation.learningCenter ?  result.personalInformation.learningCenter : '' : '',
                    gradeLevel: result.personalInformation ?  result.personalInformation.gradeLevel ?  result.personalInformation.gradeLevel : '' : '',
                    reasongForStopping: result.personalInformation ?  result.personalInformation.reasongForStopping ?  result.personalInformation.reasongForStopping : '' : '',
                    lifeStatus: result.personalInformation ?  result.personalInformation.lifeStatus ?  result.personalInformation.lifeStatus : '' : '',
                    about: result.personalInformation ?  result.personalInformation.about ?  result.personalInformation.about : '' : '',
                    method: result.method,
                    lastGradeLevelCompleted: result.personalInformation ?  result.personalInformation.lastGradeLevelCompleted ?  result.personalInformation.lastGradeLevelCompleted : '' : '',
                    reasonDropOut: result.personalInformation ?  result.personalInformation.reasonDropOut ?  result.personalInformation.reasonDropOut : '' : '',
                    attendedAlsLessonBefore: result.personalInformation ?  result.personalInformation.attendedAlsLessonBefore ?  result.personalInformation.attendedAlsLessonBefore : '' : '',
                    completedProgram: result.personalInformation ?  result.personalInformation.completedProgram ?  result.personalInformation.completedProgram : '' : '',
                
                    yearsInAls: result.personalInformation ?  result.personalInformation.yearsInAls ?  result.personalInformation.yearsInAls : '' : '',
                    registeredExaminee: result.personalInformation ?  result.personalInformation.registeredExaminee ?  result.personalInformation.registeredExaminee : '' : '',
                    occupation: result.personalInformation ?  result.personalInformation.occupation ?  result.personalInformation.occupation : '' : '',
                    
                 
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
        learningCenter: this.state.learningCenter,
        gradeLevel: this.state.gradeLevel,
        reasongForStopping: this.state.reasongForStopping === 'Other' ? this.state.otherReasonForStopping : this.state.reasongForStopping, 
        lifeStatus: this.state.lifeStatus, 
        about: this.state.about,
        lastGradeLevelCompleted: this.state.lastGradeLevelCompleted,
        reasonDropOut: this.state.reasonDropOut,
        attendedAlsLessonBefore: this.state.attendedAlsLessonBefore, 
        completedProgram: this.state.completedProgram,

        yearsInAls: this.state.yearsInAls,
        registeredExaminee: this.state.registeredExaminee,
        occupation: this.state.occupation,
    }
    if(this.state.method === 'local'){
      data = { ...data, 
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        middleName: this.state.middleName,
        houseNoStreet: this.state.houseNoStreet,
        barangay: this.state.barangay,
        city: this.state.city,
        province: this.state.province,
        gender: this.state.gender, 
        image: this.state.image, 
      }
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
                  <Grid.Cell large={6} medium={6}  small={12}>
                    <Input 
                      label='Learning Center'
                      
                      name='learningCenter'
                      value={this.state.learningCenter}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={6}  small={12}>
                   
                      <Select 
                        label='Last Grade Level Completed'
                        name='gradeLevel'
                        value={this.state.gradeLevel}
                        onChange={this.handleChange}>
                        <option value='' disabled></option>
                        <option value='K'>K</option>
                        <option value='G-1'>G-1</option>
                        <option value='G-2'>G-2</option>
                        <option value='G-3'>G-3</option>
                        <option value='G-4'>G-4</option>
                        <option value='G-5'>G-5</option>
                        <option value='G-6'>G-6</option>
                        <option value='G-7'>G-7</option>
                        <option value='G-8'>G-8</option>
                        <option value='G-9'>G-9</option>
                        <option value='G-10'>G-10</option>
                        <option value='G-11'>G-11</option>
                        <option value='G-12'>G-12</option>
                        
                      </Select>

                  </Grid.Cell>
                   <Grid.Cell large={6} medium={6}  small={12}>
                    <Select
                        label='Occupation Status'
                        name='occupation'
                        value={this.state.occupation}
                        onChange={this.handleChange}
                      >
                        <option value=''></option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                       
                      </Select>
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={6}  small={12}>
                   
                      <Select
                        label='Rason kung bakit tumigil'
                        name='reasongForStopping'
                        value={this.state.reasongForStopping}
                        onChange={this.handleChange}
                      >
                        <option value='' disabled></option>
                        <option value='No School in Barangay'>No School in Barangay</option>
                        <option value='School too far from home'>School too far from home</option>
                        <option value='Needed to help family'>Needed to help family</option>
                        <option value='Unable to pay miscellaneous and other expenses'>Unable to pay miscellaneous and other expenses</option>
                        <option value='Other'>Other</option>
                      </Select>
                     

                  </Grid.Cell>

                  {this.state.reasongForStopping === 'Other' ? 
                    <Grid.Cell large={6} medium={6}  small={12}>
                       <Input 
                          label='Other Reason:' 
                          name='otherReasonForStopping'
                          value={this.state.otherReasonForStopping}
                          onChange={this.handleChange} />
                    </Grid.Cell> 
                    : null}
                        <Grid.Cell large={6} medium={6}  small={12}>
                    <Select
                        label='Are you a registered examinee ?'
                        name='registeredExaminee'
                        value={this.state.registeredExaminee}
                        onChange={this.handleChange}
                      >
                        <option value=''></option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                       
                      </Select>
                  </Grid.Cell>
                 
                  <Grid.Cell large={6} medium={6}  small={12}>
                    <Select
                        label='Have you attended ALS learning lesson before ?'
                        name='attendedAlsLessonBefore'
                        value={this.state.attendedAlsLessonBefore}
                        onChange={this.handleChange}
                      >
                        <option value='' disabled></option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                       
                      </Select>
                  </Grid.Cell>
              
                 {this.state.attendedAlsLessonBefore === 'Yes' ?  

                 [
                  <Grid.Cell large={6} medium={6}  small={12}>
                     <Input
                         label='Years in ALS'
                         name='yearsInAls'
                         value={this.state.yearsInAls}
                         onChange={this.handleChange}
                       />
                   </Grid.Cell> ,

                  <Grid.Cell large={6} medium={6}  small={12}>
                    <Select
                        label='Have you completed the program ?'
                        name='completedProgram'
                        value={this.state.completedProgram}
                        onChange={this.handleChange}
                      >
                        <option value=''></option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                       
                      </Select>
                  </Grid.Cell>
                 ]
                   : null }

                  <Grid.Cell large={12} medium={6}  small={12}>
                    <Textarea 
                      label='Current Life Status'
                      
                      name='lifeStatus'
                      value={this.state.lifeStatus}
                      onChange={this.handleChange}
                      />
                  </Grid.Cell>

                  <Grid.Cell large={12} medium={6}  small={12}>
                    <Textarea 
                      label='Describe yourself'
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