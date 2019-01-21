import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import FormMessage from '../../../_component/Form/FormMessage'
import Pagination from '../../../_component/Pagination'


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

      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,

      deleteActive: false,
      link: ''
    }
    this.fetchSubject = this.fetchSubject.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)

  }
  changePage(page){
   
    this.setState({
      currentPage: page
    })
    this.fetchSubject(page)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      let page = this.state.currentPage
   
      this.fetchSubject(page)
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

  fetchSubject(page){
    
    apiRequest('get', `/management-forum/all?page=${page}`, false, this.props.token)
      .then((res)=>{

        if(res.data){
          this.setState({
            forum: res.data.data,
            currentPage: res.data.currentPage,
            nextPage: res.data.nextPage,
            pageCount: res.data.pageCount,
            perPage: res.data.perPage,
            previousPage: res.data.previousPage,
            totalCount: res.data.totalCount,

          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    this.fetchSubject(1)
  }
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container hide-on-large-x'>
                    <div className='title'>Forum Management</div>
                    <div className='title-action'>
                      <Link to='/admin/management/forum/add'>
                        <div className='button primary small'>Add New Forum</div>
                      </Link>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className="table-container">
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
                  <div className='table-pagination'>
                      <Pagination
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          nextPage={this.state.nextPage}
                          pageCount={this.state.pageCount}
                          perPage={this.state.perPage}
                          previousPage={this.state.previousPage}
                          totalCount={this.state.totalCount}

                      />
                  </div>
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