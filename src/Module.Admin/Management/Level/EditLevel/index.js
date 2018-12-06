import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import Button from '../../../../_component/Form/Button'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        name: '',
        description: '',

     
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
    apiRequest('get', `/level/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                this.setState({
                    name: res.data.data.name,
                    description: res.data.data.description,
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
        description: this.state.description
    }
    
    apiRequest('put', `/level/update/${this.props.location.state.id}`, data, this.props.token)
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
                            <div className='title-text-container'>
                                <div className='title'>Level Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/level/list'>
                                        <div className='button primary small'>List of Levels</div>
                                    </Link>
                                </div>
                            </div>
                            <Form 
                                onSubmit={this.handleSubmit}
                                >
                            <Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                        <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage>
                       
                      </Grid.Cell>
                                <Grid.Cell large={6} medium={12} small={12}>
                                    <Input 
                                      required 
                                      type='text' 
                                      label='Name' 
                                      placeholder='Name' 
                                      name='name' 
                                      value={this.state.name} 
                                      onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell large={6} medium={12} small={12}>
                                    <Input 
                                        type='text'
                                        label='Description' 
                                        placeholder='Description' 
                                        name='description' 
                                        value={this.state.description} 
                                        onChange={this.handleChange}/>
                                </Grid.Cell>
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/management/level/list'>
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
    token: state.token
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel