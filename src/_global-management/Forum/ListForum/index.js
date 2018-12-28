import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import ManagementDelete from '../../../_component/ManagementDelete'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      forum: [],

      message: '',
      type: '',
      active: false,

      deleteActive: false,
      link: ''
    }
    this.fetchSubject = this.fetchSubject.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      this.fetchSubject()
    }else{
      this.setState({
        deleteActive: true,
        link: link
      })
    }
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchSubject(){
    
    apiRequest('get', '/management-forum/all', false, this.props.token)
      .then((res)=>{
        console.log(res.data.data)
        if(res.data){
          this.setState({
            forum: res.data.data
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    this.fetchSubject()
  }
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Forum Management</div>
                    <div className='title-action'>
                      <Link to='/admin/management/forum/add'>
                        <div className='button primary small'>Add New Forum</div>
                      </Link>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <Table hover nostripe>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Lesson</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {
                        this.state.forum.map((attr, index) =>{
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                <Link 
                                  to={{ 
                                pathname: '/admin/management/forum/edit', 
                                state: { id: attr._id } 
                                  }}>
                                  {attr.name}
                                </Link>
                              </Table.Cell>
                              
                              <Table.Cell>{attr.description}</Table.Cell>
                              <Table.Cell>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : ''}</Table.Cell>
                              <Table.Cell isNarrowed>
                                <Link to={{ 
                                  pathname: '/admin/management/forum/edit', 
                                  state: { id: attr._id } 
                                }}>
                                  <span>
                                    <i className='fa fa-edit primary'></i>
                                  </span>
                                </Link>
                              
                                <span onClick={()=>{this.toggleDelete('/management-forum/delete/' + attr._id)}}>
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
                        <Table.HeaderCell>Lesson</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Learning Strand</Table.HeaderCell>
                        
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                </Table>
                </div>
              </Grid.Cell>
            </Grid.X>
          </Grid>


          <ManagementDelete item='Forum' close={this.toggleDelete} active={this.state.deleteActive} link={this.state.link} />

        </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}
const ListLearningStrand = connect(mapStateToProps)(Layout)
export default ListLearningStrand