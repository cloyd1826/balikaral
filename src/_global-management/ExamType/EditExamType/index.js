import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'

import Form from '../../../_component/Form/Form'
import FormMessage from '../../../_component/Form/FormMessage'
import Input from '../../../_component/Form/Input'
import Select from '../../../_component/Form/Select'
import Textarea from '../../../_component/Form/Textarea'
import Button from '../../../_component/Form/Button'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import Table from '../../../_component/Table'


import SelectLearningStrand from '../../../_special-form/SelectLearningStrand'
import SelectLevel from '../../../_special-form/SelectLevel'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        
        examType: '',
        examDescription: '',
        level: '',

        learningStrandQuestion: [],
        learningStrandList: [],
        learningStrandName: '',

        easyCount: 0,
        averageCount: 0,
        difficultCount: 0,

        difficultyEasy: '',
        difficultyAverage: '',
        difficultyDifficult: '',

        passingRate: '',
        totalHours: '',
       
        message: '',
        type: '',
        active: false,
        buttonDisabled: false
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.fetchSingle = this.fetchSingle.bind(this)
 
    this.formMessage = this.formMessage.bind(this)

    this.addLearningStrand = this.addLearningStrand.bind(this)
    this.removeLearningStrand = this.removeLearningStrand.bind(this)
    this.changeLearningStrand = this.changeLearningStrand.bind(this)

    this.fetchLearningStrand = this.fetchLearningStrand.bind(this)

    this.levelChange = this.levelChange.bind(this)
    this.changeQuestion = this.changeQuestion.bind(this)

    this.fetchDifficultyCount = this.fetchDifficultyCount.bind(this)

  }
  changeQuestion(e, max){
    let name = e.target.name
    let value = e.target.value
    let valueToChange = value
    
    if(value > max){
      valueToChange = max
    }
    if(value < 0){
      valueToChange = 0
    }
    this.setState({
      [name]: valueToChange
    })
  }
  levelChange(e){
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value,
      learningStrandQuestion: [],
      learningStrand: '',
    })
    this.fetchDifficultyCount(value, this.state.learningStrand)

  }
  addLearningStrand(){
    let learningStrandQuestion = this.state.learningStrandQuestion
    let data = {
      learningStrand: this.state.learningStrand,
      learningStrandName: this.state.learningStrandName,
      easy: this.state.difficultyEasy,
      average: this.state.difficultyAverage,
      difficult: this.state.difficultyDifficult,
      total: parseInt(this.state.difficultyEasy) + parseInt(this.state.difficultyAverage) + parseInt(this.state.difficultyDifficult)

    }
    let checkIfExist = learningStrandQuestion.map((attr)=>{
      return attr.learningStrand
    }).indexOf(this.state.learningStrand)
    if(checkIfExist === -1){
      learningStrandQuestion = [...learningStrandQuestion, data]
    }else{
      learningStrandQuestion = [...learningStrandQuestion.slice(0, checkIfExist), data, ...learningStrandQuestion.slice(checkIfExist + 1)]
    }
    this.setState({
      learningStrandQuestion: learningStrandQuestion,
      learningStrand: '',
      learningStrandName: '',
      difficultyEasy: '',
      difficultyAverage: '',
      difficultyDifficult: '',
    })
  }
  changeLearningStrand(e){
    let name = e.target.name
    let value = e.target.value
    let learningStrandList = this.state.learningStrandList
    let index = learningStrandList.map((attr)=>{
      return attr._id
    }).indexOf(e.target.value)
    let learningStrandName = learningStrandList[index].name
    this.setState({
      [name]: value,
      learningStrandName: learningStrandName,
      difficultyEasy: 0,
      difficultyAverage: 0,
      difficultyDifficult: 0,
    })

    this.fetchDifficultyCount(this.state.level, value)
  }
  removeLearningStrand(index){
    let learningStrandQuestion = this.state.learningStrandQuestion
    learningStrandQuestion = [...learningStrandQuestion.slice(0,index), ...learningStrandQuestion.slice(index + 1)]
    this.setState({
      learningStrandQuestion: learningStrandQuestion,
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

      this.fetchLearningStrand()
    }else{
      this.props.history.push('/')
    }
    
  }
  fetchLearningStrand(){
    apiRequest('get', `/learning-strand/all`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            learningStrandList: res.data.data
          })  
        }
        this.fetchSingle(res.data.data)
      })
      .catch((err)=>{
        
      })
    
  }
  fetchDifficultyCount(level, learningStrand){
    apiRequest('get', `/exam-management/difficulty-count?level=${level}&learningStrand=${learningStrand}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            easyCount: res.data.easy,
            averageCount: res.data.average,
            difficultCount: res.data.difficult,
          })  
        }
      })
      .catch((err)=>{
        
      })
  }
  fetchSingle(learningStrandList){
    apiRequest('get', `/exam-type-management/${this.props.location.state.id}`, false, this.props.token)
        .then((res)=>{
            if(res.data){
                let result = res.data.data
                let learningStrandQuestions =  result.learningStrandQuestions ?  result.learningStrandQuestions : []
                let newLearningStrandQuestion = []
                learningStrandQuestions.map((attr)=>{
                  let index = learningStrandList.map((ls)=>{
                    return ls._id
                  }).indexOf(attr.learningStrand)
                  console.log(attr)
                  let data = {...attr, learningStrandName: learningStrandList[index].name}
                  newLearningStrandQuestion = [...newLearningStrandQuestion, data]
                })

                this.setState({
                    examType: result.examType,
                    examDescription: result.examDescription,
                    difficultyEasy: result.easy,
                    difficultyAverage: result.average,
                    difficultyDifficult: result.difficult,

                    level: result.level ? result.level._id ? result.level._id : '' : '' ,
                    learningStrandQuestion: newLearningStrandQuestion,
                    totalHours: result.totalHours
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
    let total = 0
    this.state.learningStrandQuestion.map((attr)=>{
      total = total + parseInt(attr.total)
    })
    let data = {
      examType: this.state.examType,
      examDescription: this.state.examDescription,
      level: this.state.level,
      learningStrandQuestions: this.state.learningStrandQuestion,
      easy: this.state.difficultyEasy,
      average: this.state.difficultyAverage,
      difficult: this.state.difficultyDifficult,
      examTotal: total,
      totalHours: this.state.totalHours,
    }
    
    apiRequest('put', `/exam-type-management/update/${this.props.location.state.id}?userId=${this.props.user.id}`, data, this.props.token)
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
                                <div className='title'>Exam Type Management > Edit</div>
                                <div className='title-action'>
                                    <Link to='/admin/management/exam-type/list/'>
                                        <div className='button primary small'>List of Exam Types</div>
                                    </Link>
                                </div>
                            </div>
                            <Form onSubmit={this.handleSubmit}>                            
                           <Grid.X>
                              <Grid.Cell large={12} medium={12} small={12}>
                                <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage>
                              </Grid.Cell>

                              <Grid.Cell large={6} medium={12} small={12}>
                                <Select
                                  required
                                  label='Exam Type'
                                  name='examType'
                                  value={this.state.examType}
                                  onChange={this.handleChange}
                                >
                                  <option value='' disabled></option>
                                  <option value='Pre Test'>Pre Test</option>
                                  <option value='Post Test'>Post Test</option>
                                  <option value='Adaptive Test'>Adaptive Test</option>
                                </Select>
                              </Grid.Cell>
                              <Grid.Cell large={12} medium={12} small={12}>
                                <Textarea
                                  name='examDescription'
                                  placeholder='Exam Description'
                                  value={this.state.examDescription}
                                  onChange={this.handleChange}
                                />
                              </Grid.Cell>
                              <Grid.Cell large={5} medium={12} small={12}>
                                <SelectLevel 
                                  required 
                                  type='text' 
                                  label='Level' 
                                  name='level'
                                  value={this.state.level} 
                                  onChange={this.levelChange}/>
                              </Grid.Cell>

                              </Grid.X>
                      <Grid.X>
                       <Grid.Cell large={3} medium={12} small={12}>
                        <SelectLearningStrand 
                           
                          type='text' 
                          label='Learning Strand' 
                          name='learningStrand'
                          level={this.state.level}
                          value={this.state.learningStrand} 
                          onChange={this.changeLearningStrand}
                        />
                      </Grid.Cell>
                    <Grid.Cell large={3} medium={12} small={12}>
                        <Input
                          type='number'
                          min={0}
                          max={this.state.easyCount}
                          label={'Easy - (' + this.state.easyCount + ')'}
                          name='difficultyEasy'
                          value={this.state.difficultyEasy}
                          onChange={(e)=>{this.changeQuestion(e,this.state.easyCount)}}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={12} small={12}>
                        <Input
                          
                          type='number'
                          min={0}
                          max={this.state.averageCount}
                          label={'Average - (' + this.state.averageCount + ')'}
                          name='difficultyAverage'
                          value={this.state.difficultyAverage}
                          onChange={(e)=>{this.changeQuestion(e,this.state.averageCount)}}
                        />
                      </Grid.Cell>
                      <Grid.Cell large={3} medium={12} small={12}>
                        <Input
                          
                          type='number'
                          min={0}
                           max={this.state.difficultCount}
                          label={'difficult - (' + this.state.difficultCount + ')'}
                          name='difficultyDifficult'
                          value={this.state.difficultyDifficult}
                          onChange={(e)=>{this.changeQuestion(e,this.state.difficultCount)}}
                        />
                      </Grid.Cell>
                      <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                        <Button type='button' text='Add Learning Strand' className='secondary small' onClick={this.addLearningStrand} />
                      </Grid.Cell>
                       

                  </Grid.X>
                    <Grid.X>
                      <Grid.Cell large={12} medium={12} small={12}>
                      <div className="table-container">
                        <Table hover nostripe>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                              <Table.HeaderCell>Easy</Table.HeaderCell>
                              <Table.HeaderCell>Average</Table.HeaderCell>
                              <Table.HeaderCell>Difficult</Table.HeaderCell>
                              <Table.HeaderCell>Total</Table.HeaderCell>
                              <Table.HeaderCell isNarrowed></Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {
                              this.state.learningStrandQuestion.map((attr, index) =>{
                                return (
                                  <Table.Row key={index}>
                                    <Table.Cell>{attr.learningStrandName}</Table.Cell>
                                    <Table.Cell>{attr.easy}</Table.Cell>
                                    <Table.Cell>{attr.average}</Table.Cell>
                                    <Table.Cell>{attr.difficult}</Table.Cell>
                                    <Table.Cell>{attr.total}</Table.Cell>
                                    <Table.Cell isNarrowed>
                                        <span onClick={()=>{this.removeLearningStrand(index)}}>
                                          <i className='fa fa-trash cancel'></i>
                                        </span>
                                    </Table.Cell>
                                  </Table.Row>
                                )
                              })
                            }
                          </Table.Body>
                          <Table.Footer>
                            <Table.Row>
                              <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                              <Table.HeaderCell>Easy</Table.HeaderCell>
                              <Table.HeaderCell>Average</Table.HeaderCell>
                              <Table.HeaderCell>Difficult</Table.HeaderCell>
                              <Table.HeaderCell>Total</Table.HeaderCell>
                              <Table.HeaderCell isNarrowed></Table.HeaderCell>
                            </Table.Row>
                          </Table.Footer>
                        </Table>
                      </div>
                      </Grid.Cell>
                    </Grid.X>

                            <Grid.X>
                              
                              <Grid.Cell large={3} medium={12} small={12}>
                                <Input
                                  required
                                  type='number'
                                  min={0}
                                  label='Total Exam Time (in minutes)'
                                  name='totalHours'
                                  value={this.state.totalHours}
                                  onChange={this.handleChange}
                                />
                              </Grid.Cell>
                              <Grid.Cell className='form-button right' large={12} medium={12} small={12}>
                                <Button type='submit' disabled={this.buttonDisabled} text='Save' className='secondary small' />
                                <Link to='/admin/management/exam-type/list'>
                                 <Button disabled={this.state.buttonDisabled} type='button' text='Return' className='cancel small'/>
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
    role: state.role
  }
}
const EditExamType = connect(mapStateToProps)(Layout)
export default EditExamType