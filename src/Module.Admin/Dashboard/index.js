import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import Grid from '../../_component/Grid'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
        <div className='admin-dashboard'>


          <div className='dashboard-link-container'>
            <Grid fluid>

               
              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Management</div>
                </Grid.Cell>

                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/management/level/List'>
                    <div className='dashboard-link' style={{background: '#0386a2'}}>
                      <span className='la la-sort-amount-asc'></span>
                      <div className='link-title'>Level</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/management/learning-strand/list'>
                    <div className='dashboard-link' style={{background: '#2e81e1'}}>
                      <span className='la la-align-left'></span>
                      <div className='link-title'>Learning Strand</div>
                    </div>
                  </Link>
                </Grid.Cell>
 
                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/management/exam/list'>
                    <div className='dashboard-link' style={{background: '#912396'}}>
                      <span className='la la-list-ul'></span>
                      <div className='link-title'>Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>
              </Grid.X>


              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>User</div>
                </Grid.Cell>


                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/user/list'>
                    <div className='dashboard-link' style={{background: '#00a100'}}>
                      <span className='la la-user'></span>
                      <div className='link-title'>List of User</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/user/add'>
                    <div className='dashboard-link' style={{background: '#0a58c1'}}>
                      <span className='la la-user-plus'></span>
                      <div className='link-title'>Add User</div>
                    </div>
                  </Link>
                </Grid.Cell>

               
              </Grid.X>

              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Teacher</div>
                </Grid.Cell>


                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/admin/management/reviewer/list'>
                    <div className='dashboard-link' style={{background: '#912396'}}>
                      <span className='la la-file-pdf-o'></span>
                      <div className='link-title'>Reviewer</div>
                    </div>
                  </Link>
                </Grid.Cell>
               
              </Grid.X>

              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Learner</div>
                </Grid.Cell>
                <Grid.Cell large={3} medium={6} small={12}>
                  <div className='dashboard-link' style={{background: '#be1e4b'}}>
                    <span className='la la-user'></span>
                    <div className='link-title'>Learner Link</div>
                  </div>
                </Grid.Cell>
               
              </Grid.X>

            </Grid>

          </div>


        </div>

    )
  }
}

export default Dashboard