import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Textarea from '../../../_component/Form/Textarea'
import FileInput from '../../../_component/Form/FileInput'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectLevel from '../../../_special-form/SelectLevel'
import SelectSubject from '../../../_special-form/SelectSubject'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        learningStrand: '',
        level: '',
        learningStrandSub: '',
        pdf: '',
        youtubeVideo: '',
        description: '',

     
        message: '',
        type: '',
        active: false,
        buttonDisabled: false,

        header: '',
        urlToUse: ''
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)
    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.handleLearningStrandChange = this.handleLearningStrandChange.bind(this)
  }

  handleLevelChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrand: '',
      learningStrandSub: '',
    })
  }
  handleLearningStrandChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrandSub: '',
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
      if(this.props.location.pathname.match('/reviewer')){
        this.setState({
          header: 'Reviewer',
          urlToUse: '/reviewer'
        })
      }
      if(this.props.location.pathname.match('/session-guide')){
        this.setState({
          header: 'Session Guide',
          urlToUse: '/session-guide'
        })
      }
      if(this.props.location.pathname.match('/learning-resources')){
        this.setState({
          header: 'Learning Resources',
          urlToUse: '/learning-resources'
        })
      }
    }else{
      this.props.history.push('/')
    }
  }
   
  fetchSingle(){
    apiRequest('get', `/reviewer-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                let result = res.data.data
                this.setState({
                    learningStrand: (result.learningStrand ? result.learningStrand._id : '' : ''),
                    learningStrandSub: (result.learningStrandSub ? result.learningStrandSub._id : '' : ''),
                    level: (result.level ? result.level._id : '' : ''),
                    description: (result.description ? result.description : ''),
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
        learningStrand: this.state.learningStrand,
        level: this.state.level,
        learningStrandSub: this.state.learningStrandSub,
        description: this.state.description,
    }
    
    apiRequest('put', `/reviewer-management/update/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
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
                                <div className='title'>{this.state.header} Management > Edit</div>
                                <div className='title-action'>
                                    <Link 
                                      to={
                                        (this.props.role === 'Administrator' ? '/admin/teachers' + this.state.urlToUse + '/list' : '') + 
                                        (this.props.role === 'Teacher' ? '/teacher/management' + this.state.urlToUse + '/list' : '')
                                      }>
                                        <div className='button primary small'>List of {this.state.header}</div>
                                    </Link>
                                </div>
                            </div>
                            <Form 
                                onSubmit={this.handleSubmit}
                                >
                            <Grid.X>
                                <Grid.Cell large={12} medium={12} small={12}>
                                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                                 
                                </Grid.Cell>
                               <Grid.Cell large={4} medium={12} small={12}>
                                <SelectLevel 
                                  required 
                                  type='text' 
                                  label='Level' 
                                  name='level' 
                                  value={this.state.level} 
                                  onChange={this.handleLevelChange}/>
                              </Grid.Cell>


                              <Grid.Cell large={4} medium={12} small={12}>
                                <SelectLearningStrand 
                                  required 
                                  type='text' 
                                  label='Learning Strand' 
                                  name='learningStrand' 
                                  level={this.state.level}
                                  value={this.state.learningStrand} 
                                  onChange={this.handleLearningStrandChange}/>
                              </Grid.Cell>

                              <Grid.Cell large={4} medium={12} small={12}>
                                <SelectSubject 
                                  label='Modyul'
                                  name='learningStrandSub' 
                                  learningStrand={this.state.learningStrand}
                                  value={this.state.learningStrandSub} 
                                  onChange={this.handleChange}/>
                              </Grid.Cell>
                               <Grid.Cell large={12} medium={12} small={12}>
                                <Textarea
                                  label='Description' 
                                  placeholder='Description' 
                                  name='description' 
                                  value={this.state.description} 
                                  onChange={this.handleChange}/>
                              </Grid.Cell>
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link  to={
                                      (this.props.role === 'Administrator' ? '/admin/teachers' + this.state.urlToUse + '/list' : '') + 
                                      (this.props.role === 'Teacher' ? '/teacher/management' + this.state.urlToUse + '/list' : '')
                                    }>
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
    role: state.role,
    user: state.user
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel