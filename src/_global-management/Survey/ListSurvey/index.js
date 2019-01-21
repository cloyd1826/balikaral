import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import Table from '../../../_component/Table'
import Pagination from '../../../_component/Pagination'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'

import moment from 'moment'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      survey: [],

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
    this.fetchLevel = this.fetchLevel.bind(this)
    this.formMessage = this.formMessage.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)

    this.changePage = this.changePage.bind(this)
  }
  changePage(page){
    this.setState({
      currentPage: page
    })
    this.fetchLevel(page)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })

      let page = this.state.currentPage
      this.fetchLevel(page)

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

  fetchLevel(page){
    apiRequest('get', `/survey-user/all?page=${page}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            survey: res.data.data,
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
    this.fetchLevel(1)
  }
  render() { 
    return (
        <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12}  medium={12} small={12}>
                <div className='element-container'>
                  <div className='title-text-container hide-on-large-x'>
                    <div className='title'>Survey of Users</div>
                    <div className='title-action'>
                    </div>
                  </div>
                  <FormMessage type={this.state.type} active={this.state.active} formMessage={this.formMessage}>{this.state.message}</FormMessage> 
                  <div className="table-container">
                  <Table hover nostripe>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date of Survey</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        
                        <Table.HeaderCell isNarrowed></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {
                        this.state.survey.map((attr, index) =>{
                          return (
                            <Table.Row key={index}>
                              <Table.Cell isNarrowed>{moment(attr.date).format('MMMM DD, YYYY - LTS')}</Table.Cell>
                              <Table.Cell>
                                {attr.user ? attr.user.personalInformation ? 
                                  attr.user.personalInformation.lastName && attr.user.personalInformation.firstName ? 
                                    attr.user.personalInformation.lastName + ' ' + attr.user.personalInformation.firstName
                                  : '' : '' : ''}
                                {attr.user ? attr.user.google ? attr.user.google.name ? attr.user.google.name : '' : '' : ''}
                                {attr.user ? attr.user.facebook ? attr.user.facebook.name ? attr.user.facebook.name : '' : '' : ''}

                              </Table.Cell>
                              
                              <Table.Cell isNarrowed>
                                  
                                 
                                <Link to={{ 
                                    pathname: '/admin/system/survey/view', 
                                    state: { id: attr._id } 
                                  }}>
                                  <span>
                                    <i className='la la-folder-open-o primary'></i>
                                  </span>
                                </Link>
                              
                              </Table.Cell>
                            </Table.Row>
                          )
                        })
                        
                      }
                      
                      
                    </Table.Body>
                    <Table.Footer>
                      <Table.Row>
                         <Table.HeaderCell>Date of Survey</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
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
const ListLevel = connect(mapStateToProps)(Layout)
export default ListLevel