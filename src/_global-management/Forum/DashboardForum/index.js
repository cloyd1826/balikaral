import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import Pagination from '../../../_component/Pagination'
import Table from '../../../_component/Table'

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
                <div className='forum-dashboard element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Available Forums</div>
                    <div className='title-action'>

                    </div>
                  </div>
                  <div className="forum-list-container">
                    {this.state.forum.map((attr, index)=>{
                      return (
                        <div key={index}>
                          <Link to={{ 
                                pathname: (
                                  (this.props.role === 'Administrator' ? '/admin' : '') + 
                                  (this.props.role === 'Teacher' ? '/teacher' : '') +
                                  (this.props.role === 'Learner' ? '/learner' : '') +
                                  '/forum/discussions/list'), 
                                state: { id: attr._id } 
                                  }}>
                            <div className='forum-dashboard-container'>
                              <div className="table-container">
                              <Table hover nostripe>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>{attr.name}</Table.HeaderCell>
                                    <Table.HeaderCell>Posted by:</Table.HeaderCell>
                                    <Table.HeaderCell>Date Posted:</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell>
                                      <span className="forum-desc">Test Description</span><br/>
                                      <span className="forum-desc-strand">{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : '' }</span>
                                    </Table.Cell>
                                    <Table.Cell>Alcantara Cloyd</Table.Cell>
                                    <Table.Cell>01-13-2019</Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                              </Table>
                              </div>
                            </div>
                          </Link>
                        </div>
                        )
                    })}
                  </div>
                   <div className='forum-pagination'>
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
const ListLearningStrand = connect(mapStateToProps)(Layout)
export default ListLearningStrand