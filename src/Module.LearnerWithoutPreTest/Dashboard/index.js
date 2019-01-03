import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import Grid from '../../_component/Grid'

import { connect } from 'react-redux'

import Profile from '../../_images/vol1.jpeg'

class Layout extends Component {
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
               
                 <Grid.Cell large={4} medium={6} small={12}>
                    <Link to='/learner-start/pre-test/create'>
                    <div className='dashboard-link' style={{background: '#912396'}}>
                      <span className='la la-list-ol'></span>
                      <div className='link-title'>Pre Test</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={4} medium={6} small={12}>
                  <Link to='/learner-start/reviewer/list/learner'>
                    <div className='dashboard-link' style={{background: '#0386a2'}}>
                      <span className='la la-file-pdf-o'></span>
                      <div className='link-title'>Talino</div>
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


const mapStateToProps = state => {
  return {
    user: state.user,
    role: state.role
  }
}

const Dashboard = connect(mapStateToProps)(Layout)

export default Dashboard
