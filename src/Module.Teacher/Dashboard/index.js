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
                  <Link to='/teacher/management/exam/list'>
                    <div className='dashboard-link' style={{background: '#00a100'}}>
                      <span className='la la-list-ul'></span>
                      <div className='link-title'>Exam</div>
                      <div className='link-number'>00</div>
                    </div>
                  </Link>
                </Grid.Cell>
              </Grid.X>


             
              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Teacher</div>
                </Grid.Cell>


                <Grid.Cell large={3} medium={6} small={12}>
                  <div className='dashboard-link' style={{background: '#2d8aef'}}>
                    <span className='la la-user'></span>
                    <div className='link-title'>Teacher Link</div>
                  </div>
                </Grid.Cell>
               
              </Grid.X>

              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Learner</div>
                </Grid.Cell>


                <Grid.Cell large={3} medium={6} small={12}>
                  <div className='dashboard-link' style={{background: '#5736b1'}}>
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