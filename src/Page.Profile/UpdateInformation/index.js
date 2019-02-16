import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'

import Form from '../../_component/Form/Form'
import FormMessage from '../../_component/Form/FormMessage'
import Input from '../../_component/Form/Input'
import Select from '../../_component/Form/Select'
import Button from '../../_component/Form/Button'

import apiRequest from '../../_axios'
import SelectLearningStrand from '../../_special-form/SelectLearningStrand'

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
        civilStatus: '',
        birthday: '',

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

        learningStrand: [],
        subjectExpertise: [],
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.addLearningStrand = this.addLearningStrand.bind(this)
    this.removeLearningStrand = this.removeLearningStrand.bind(this)
    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)
  }
  addLearningStrand(e){
    let subjectExpertise = this.state.subjectExpertise
    let learningStrand = this.state.learningStrand
    console.log(learningStrand)
    let index = learningStrand.map((attr)=>{
      return attr._id
    }).indexOf(e.target.value)

    let newSubject = { learningStrand: learningStrand[index] }

    subjectExpertise = [...subjectExpertise, newSubject]
    console.log(subjectExpertise)
    this.setState({
      subjectExpertise: subjectExpertise,
      [e.target.name]: e.target.value
    })
  }
  removeLearningStrand(i){
    let subjectExpertise = this.state.subjectExpertise

    subjectExpertise = [...subjectExpertise.slice(0,i), ...subjectExpertise.slice(i + 1)]

    this.setState({
      subjectExpertise: subjectExpertise
    })
  }
  fetchLearningStrand(){
    apiRequest('get', `/learning-strand/fetchAllWithoutPagination`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            learningStrand: res.data.data
          })  
        }
      })
      .catch((err)=>{
        
      })
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
      this.fetchLearningStrand()
    }else{
      this.props.history.push('/')
    }
    
  }
  fetchSingle(){
    apiRequest('get', `/user/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
          console.log(res)
            if(res.data){
                let result = res.data.data
                this.setState({
                  email: (result.local ? result.local.email ? result.local.email : '' : '') + (result.google ? result.google.email ? result.google.email : '' : '') + (result.facebook ? result.facebook.email ? result.facebook.email : '' : '')  ,
                  disabled: result.local ? result.local.disabled ? result.local.disabled : '' : '',

                  lastName: (result.personalInformation ? result.personalInformation.lastName ? result.personalInformation.lastName : '' : ''),
                  firstName: (result.personalInformation ? result.personalInformation.firstName ? result.personalInformation.firstName : '' : ''),
                  middleName: (result.personalInformation ? result.personalInformation.middleName ? result.personalInformation.middleName : '' : ''),

                  houseNoStreet: result.personalInformation ? result.personalInformation ? result.personalInformation.houseNoStreet ? result.personalInformation.houseNoStreet : '' : '' : '',
                  barangay: result.personalInformation ? result.personalInformation ? result.personalInformation.barangay ? result.personalInformation.barangay : '' : '' : '',
                  city: result.personalInformation ? result.personalInformation ? result.personalInformation.city ? result.personalInformation.city : '' : '' : '',
                  province: result.personalInformation ? result.personalInformation ?  result.personalInformation.province ?  result.personalInformation.province : '' : '' : '', 
                  birthday: result.personalInformation ? result.personalInformation ?  result.personalInformation.birthday ?  result.personalInformation.birthday : '' : '' : '', 

                  civilStatus: result.personalInformation ? result.personalInformation ?  result.personalInformation.civilStatus ?  result.personalInformation.civilStatus : '' : '' : '', 

                  learningCenter: result.personalInformation ? result.personalInformation ?  result.personalInformation.learningCenter ?  result.personalInformation.learningCenter : '' : '' : '',
                  gradeLevel: result.personalInformation ? result.personalInformation ?  result.personalInformation.gradeLevel ?  result.personalInformation.gradeLevel : '' : '' : '',
                  reasongForStopping: result.personalInformation ? result.personalInformation ?  result.personalInformation.reasongForStopping ?  result.personalInformation.reasongForStopping : '' : '' : '',
                  lifeStatus: result.personalInformation ? result.personalInformation ?  result.personalInformation.lifeStatus ?  result.personalInformation.lifeStatus : '' : '' : '',
                  
                  gender: result.personalInformation ? result.personalInformation ?  result.personalInformation.gender ?  result.personalInformation.gender : '' : '' : '',

                  about: result.personalInformation ? result.personalInformation ?  result.personalInformation.about ?  result.personalInformation.about : '' : '' : '',

                  lastGradeLevelCompleted: result.personalInformation ?  result.personalInformation.lastGradeLevelCompleted ?  result.personalInformation.lastGradeLevelCompleted : '' : '',
                  reasonDropOut: result.personalInformation ?  result.personalInformation.reasonDropOut ?  result.personalInformation.reasonDropOut : '' : '',
                  attendedAlsLessonBefore: result.personalInformation ?  result.personalInformation.attendedAlsLessonBefore ?  result.personalInformation.attendedAlsLessonBefore : '' : '',
                  completedProgram: result.personalInformation ?  result.personalInformation.completedProgram ?  result.personalInformation.completedProgram : '' : '',

                  yearsInAls: result.personalInformation ?  result.personalInformation.yearsInAls ?  result.personalInformation.yearsInAls : '' : '',
                  registeredExaminee: result.personalInformation ?  result.personalInformation.registeredExaminee ?  result.personalInformation.registeredExaminee : '' : '',
                  occupation: result.personalInformation ?  result.personalInformation.occupation ?  result.personalInformation.occupation : '' : '',
                  
                  letPasser: result.personalInformation ?  result.personalInformation.letPasser ?  result.personalInformation.letPasser : '' : '',
                  noOfYearsTeaching: result.personalInformation ?  result.personalInformation.noOfYearsTeaching ?  result.personalInformation.noOfYearsTeaching : '' : '',
                  noOfYearsAsAlsTeacher: result.personalInformation ?  result.personalInformation.noOfYearsAsAlsTeacher ?  result.personalInformation.noOfYearsAsAlsTeacher : '' : '',
                  subjectExpertise: result.personalInformation ?  result.personalInformation.subjectExpertise ?  result.personalInformation.subjectExpertise : '' : '',

                  userType:  (result.local ? result.local.userType ? result.local.userType : '' : '') + (result.google ? result.google.userType ? result.google.userType : '' : '') + (result.facebook ? result.facebook.userType ? result.facebook.userType : '' : ''),
                  image: (result.personalInformation ? result.personalInformation ? result.personalInformation.image ? result.personalInformation.image : '' : '' : '')
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

        civilStatus: this.state.civilStatus,
        birthday: this.state.birthday,

        learningCenter: this.state.learningCenter,
        gradeLevel: this.state.gradeLevel,
        reasongForStopping: this.state.reasongForStopping, 
        lifeStatus: this.state.lifeStatus, 
        
        gender: this.state.gender, 

        about: this.state.about, 

        image: this.state.image, 

        lastGradeLevelCompleted: this.state.lastGradeLevelCompleted,
        reasonDropOut: this.state.reasonDropOut,
        attendedAlsLessonBefore: this.state.attendedAlsLessonBefore, 
        completedProgram: this.state.completedProgram,

        letPasser: this.state.letPasser,
        noOfYearsTeaching: this.state.noOfYearsTeaching,
        noOfYearsAsAlsTeacher: this.state.noOfYearsAsAlsTeacher,

    }
    if(this.state.subjectExpertise.length > 0){
      let subjectExpertise = []
      let ssubjectExpertise = this.state.subjectExpertise
      ssubjectExpertise.map((attr)=>{
        subjectExpertise = [...subjectExpertise, { learningStrand: (attr.learningStrand ? attr.learningStrand._id : null ) }]
      })
      data = {...data, subjectExpertise}
    }
    console.log(data)
    apiRequest('put', `/user/update-personal-info/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
        .then((res)=>{
          this.fetchSingle()
          this.formMessage('Personal Information has been updated', 'success', true, false)
          if(this.props.location.state.id === this.props.user.id){
            console.log(res)
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
              role: this.props.role,
              hadPreTest: this.props.hadPreTest,
              type: 'local'

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
                    <Input 
                      label='Birthday'
                      type='date'
                      name='birthday'
                      value={this.state.birthday}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
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
                  <Grid.Cell large={4} medium={6} small={12}>
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


                  <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='Province'
                      
                      name='province'
                      value={this.state.province}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>

                  </Grid.X>

                  {this.props.role !== 'Learner' ?
                  <Grid.X>


                  <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='Are you a LET Passer ?'
                      
                      name='letPasser'
                      value={this.state.letPasser}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                  <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='No of years in teaching'
                      
                      name='noOfYearsTeaching'
                      value={this.state.noOfYearsTeaching}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                  <Grid.Cell large={3} medium={6} small={12}>
                    <Input 
                      label='No of Years as ALS Teacher'
                      
                      name='noOfYearsAsAlsTeacher'
                      value={this.state.noOfYearsAsAlsTeacher}
                      onChange={this.handleChange}
                       />
                  </Grid.Cell>
                   <Grid.Cell large={6} medium={12} small={12}>
                    <SelectLearningStrand 
                      type='text' 
                      label='Subject of Expertise' 
                      value={this.state.subjectExpertiseSelect} 
                      name='subjectExpertiseSelect'
                      onChange={this.addLearningStrand}/>
                  </Grid.Cell>
                  <Grid.Cell large={6} medium={12} small={12} className='validator-container'>           
                    {this.state.subjectExpertise.map((attr,index)=>{
                      
                      return (
                         <span key={index} className='validator-name' onClick={()=>{this.removeLearningStrand(index)}}>

                         {  attr.learningStrand ? attr.learningStrand.name  : ''}
                      <i className='la la-close' />
                        </span>
                      )})}
                  </Grid.Cell>

                  </Grid.X>

                   : null}
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
    role: state.role,
    user: state.user,
    hadPreTest: state.hadPreTest
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