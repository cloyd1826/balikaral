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
                  <Link to='/learner/management/level/List'>
                    <div className='dashboard-link' style={{background: '#0386a2'}}>
                      <span className='la la-sort-amount-asc'></span>
                      <div className='link-title'>Reviewers</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={3} medium={6} small={12}>
                  <Link to='/learner/management/exam/import'>
                    <div className='dashboard-link' style={{background: '#912396'}}>
                      <span className='la la-list-ul'></span>
                      <div className='link-title'>Take Exam</div>
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