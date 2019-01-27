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
                  <div className='main-link-title'>Kilalanin - Student's Profile Module</div>
                </Grid.Cell> 
                <Grid.Cell large={2} medium={6} small={12}>
                  <Link to='/teacher/learner-list'>
                    <div className='dashboard-link'>
                      <span className='la la-user'></span>
                      <div className='link-title'>Mga Learner</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={6} small={12}>
                  <Link to='/teacher/generated-exam/learner'>
                    <div className='dashboard-link'>
                      <span className='la la-list-ol'></span>
                      <div className='link-title'>Learner Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>
                
              </Grid.X>

              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Turuan - Lesson's Module</div>
                </Grid.Cell>
                 <Grid.Cell large={2} medium={6} small={12}>
                  <Link to='/teacher/management/reviewer/list'>
                    <div className='dashboard-link'>
                      <span className='la la-file-pdf-o'></span>
                      <div className='link-title'>Modyul (Module)</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/teacher/management/learning-resources/list/'>
                    <div className='dashboard-link' >
                      <span className='la la-file-movie-o'></span>
                      <div className='link-title'>Learning Resources</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={6} small={12}>
                  <Link to='/teacher/management/session-guide/list'>
                    <div className='dashboard-link'>
                      <span className='la la-file-archive-o'></span>
                      <div className='link-title'>Teaching Resources</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={6} small={12}>
                  <Link to='/teacher/management/exam/list'>
                    <div className='dashboard-link'>
                      <span className='la la-list-ul'></span>
                      <div className='link-title'>Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>
               
              </Grid.X>
               
              
              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Damayan - Student Support Module</div>
                </Grid.Cell>
                
                <Grid.Cell large={2} medium={6} small={12}>
                  <Link to={{
                  pathname: '/teacher/forum/dashboard',
                  state: {id: false }
                }}>
                    <div className='dashboard-link'>
                      <span className='la la-comment'></span>
                      <div className='link-title'>Forum</div>
                    </div>
                  </Link>
                </Grid.Cell>
              </Grid.X>

             

            </Grid>

          </div>


        </div>

    )
  }
}

export default Dashboard