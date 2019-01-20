import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../../_component/Grid'
import Table from '../../../../_component/Table'

import Form from '../../../../_component/Form/Form'
import FormMessage from '../../../../_component/Form/FormMessage'
import Input from '../../../../_component/Form/Input'
import Textarea from '../../../../_component/Form/Textarea'
import Button from '../../../../_component/Form/Button'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        criteria: '',
        descriptions: [],
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

    this.addDescription = this.addDescription.bind(this)
    this.editDescription = this.editDescription.bind(this)
    this.deleteDescription = this.deleteDescription.bind(this)
  }
  addDescription(){
    let descriptions = this.state.descriptions
    if(this.state.edit){
      descriptions = [ ...descriptions.slice(0,this.state.index), {description: this.state.description}, ...descriptions.slice(this.state.index + 1 ) ]
    }else{
      descriptions = [ ...descriptions, {description: this.state.description}]
      
    }
    this.setState({
      descriptions: descriptions,
      description: '',
      edit: false,
      index: 0
    })
  }
  editDescription(description, index){
    let descriptions = this.state.descriptions
    this.setState({
      edit: true,
      index: index,
      description: description
    })
  }
  deleteDescription(index){
    let descriptions = this.state.descriptions
    descriptions = [...descriptions.slice(0,index), ...descriptions.slice(index + 1) ]
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
    apiRequest('get', `/survey-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            
            if(res.data){
                this.setState({
                    criteria: res.data.data.criteria,
                    descriptions: res.data.data.descriptions,
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
        criteria: this.state.criteria,
        descriptions: this.state.descriptions
    }
    
    apiRequest('put', `/survey-management/update/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
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
                        <div className='element-container '>
                            <div className='title-text-container  hide-on-large-x'>
                                <div className='title'>Survey Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/survey-management/list'>
                                        <div className='button primary small'>List of Surveys</div>
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
                                       <Grid.Cell large={6} medium={12} small={12}>
                                <Input 
                                  required 
                                  type='text' 
                                  label='Criteria' 
                                  placeholder='Criteria' 
                                  name='criteria' 
                                  value={this.state.criteria} 
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
                                <Button onClick={this.addDescription} type='button' text='Add Description' className='secondary small' />
                              </Grid.Cell>
                              <Grid.Cell large={12} medium={12} small={12} className='table-container'>
                                <Table hover nostripe>
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell>Description</Table.HeaderCell>
                                      <Table.HeaderCell isNarrowed></Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Header>
                                  <Table.Body>
                                  {this.state.descriptions.map((attr, index)=>{
                                    return (
                                        <Table.Row key={index}>
                                          <Table.Cell>{attr.description}</Table.Cell>
                                          <Table.Cell isNarrowed>
                                            
                                            <span onClick={()=>{this.editDescription(attr.description, index)}}>
                                              <i className='la la-edit primary'></i>
                                            </span>

                                            <span onClick={()=>{this.deleteDescription(index)}}>
                                              <i className='la la-trash cancel'></i>
                                            </span>
                                          </Table.Cell>
                                        </Table.Row>
                                      )
                                    })
                                  }
                                  </Table.Body>
                                  <Table.Footer>
                                    <Table.Row>
                                      <Table.HeaderCell>Description</Table.HeaderCell>
                                      <Table.HeaderCell isNarrowed></Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Footer>

                                </Table>

                              </Grid.Cell>
                                <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                    <Button disabled={this.state.buttonDisabled} type='submit' text='Save' className='secondary small' />
                                    <Link to='/admin/management/survey-management/list'>
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
    user: state.user
  }
}
const AddLevel = connect(mapStateToProps)(Layout)
export default AddLevel