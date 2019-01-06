import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import Grid from '../../_component/Grid'

import { connect } from 'react-redux'


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
                    <Link to='/learner/exam/available'>
                    <div className='dashboard-link' style={{background: '#912396'}}>
                      <span className='la la-list-ol'></span>
                      <div className='link-title'>Tapang</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={4} medium={6} small={12}>
                  <Link to='/learner/reviewer/list/learner'>
                    <div className='dashboard-link' style={{background: '#0386a2'}}>
                      <span className='la la-file-pdf-o'></span>
                      <div className='link-title'>Talino</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={4} medium={6} small={12}>
                  <Link to='/learner/exam/learning-strand'>
                    <div className='dashboard-link' style={{background: '#00a100'}}>
                      <span className='la la-copy'></span>
                      <div className='link-title'>Tiyaga</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={4} medium={6} small={12}>
                  <Link to='/learner/forum/dashboard'>
                    <div className='dashboard-link' style={{background: '#be1e4b'}}>
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


const mapStateToProps = state => {
  return {
    user: state.user,
    role: state.role
  }
}

const Dashboard = connect(mapStateToProps)(Layout)

export default Dashboard
