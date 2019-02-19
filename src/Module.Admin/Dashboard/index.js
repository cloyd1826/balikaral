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
                  <div className='main-link-title'>Tagumpay ng Mag-aaral</div>
                </Grid.Cell>
                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/generated-exam/learner'>
                    <div className='dashboard-link' >
                      <span className='la la-list-ol'></span>
                      <div className='link-title'>Learner Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/learner-list'>
                    <div className='dashboard-link' >
                      <span className='la la-graduation-cap'></span>
                      <div className='link-title'>Kilalanin</div>
                    </div>
                  </Link>
                </Grid.Cell>
               
              </Grid.X>
              

              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Saya ng Naglilingkod</div>
                </Grid.Cell>



                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/teachers/reviewer/list/'>
                    <div className='dashboard-link' >
                      <span className='la la-file-pdf-o'></span>
                      <div className='link-title'>Modyul (Module)</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/teachers/learning-resources/list/'>
                    <div className='dashboard-link' >
                      <span className='la la-file-movie-o'></span>
                      <div className='link-title'>Learning Resources</div>
                    </div>
                  </Link>
                </Grid.Cell>

                 

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/teachers/session-guide/list/'>
                    <div className='dashboard-link' >
                      <span className='la  la-file-archive-o'></span>
                      <div className='link-title'>Session Guide</div>
                    </div>
                  </Link>
                </Grid.Cell>
               
                 <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/teachers/exam/list'>
                    <div className='dashboard-link' >
                      <span className='la la-list-ul'></span>
                      <div className='link-title'>Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>

              
              </Grid.X>

              


              <Grid.X>

                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Pandayan</div>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/level/List'>
                    <div className='dashboard-link' >
                      <span className='la la-sort-amount-asc'></span>
                      <div className='link-title'>Level</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/learning-strand/list'>
                    <div className='dashboard-link' >
                      <span className='la la-align-left'></span>
                      <div className='link-title'>Learning Strand</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/subject/list'>
                    <div className='dashboard-link' >
                      <span className='la la-align-center'></span>
                      <div className='link-title'>Leksiyon (Lesson)</div>
                    </div>
                  </Link>
                </Grid.Cell>
 
               

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/exam-type/list'>
                    <div className='dashboard-link' >
                      <span className='la  la-th-list'></span>
                      <div className='link-title'>Exam Type</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/forum/list/'>
                    <div className='dashboard-link' >
                      <span className='la la-comment'></span>
                      <div className='link-title'>Forum</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/survey-management/List'>
                    <div className='dashboard-link' >
                      <span className='la la-users'></span>
                      <div className='link-title'>Survey Management</div>
                    </div>
                  </Link>
                </Grid.Cell>
                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/management/site-instruction/List'>
                    <div className='dashboard-link' >
                      <span className='la la-info'></span>
                      <div className='link-title'>Site Instructions</div>
                    </div>
                  </Link>
                </Grid.Cell>

                 <Grid.Cell large={2} medium={6} small={12}>
                 <Link to='/admin/management/landing-page/list'>
                    <div className='dashboard-link' >
                      <span className='la  la-institution'></span>
                      <div className='link-title'>Landing Page</div>
                    </div>
                  </Link>
                </Grid.Cell>
              </Grid.X>
              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Damayan</div>
                </Grid.Cell>
                <Grid.Cell large={2} medium={6} small={12}>
                   
                  <Link
                    to={{
                      pathname: '/admin/forum/dashboard',
                      state: {id: false}
                    }}>
                    <div className='dashboard-link' >
                      <span className='la  la-comments'></span>
                      <div className='link-title'>Forum Discussions</div>
                    </div>
                  </Link>
                </Grid.Cell>
              </Grid.X>

              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>Galing ng Sistema</div>
                </Grid.Cell>


                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/system/exam-type'>
                    <div className='dashboard-link' >
                      <span className='la la-circle-o-notch'></span>
                      <div className='link-title'>Analytics ng Exam Type</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/system/generated-exam'>
                    <div className='dashboard-link' >
                      <span className='la la-tasks'></span>
                      <div className='link-title'>Analytics ng mga Exam</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/system/audit-trail'>
                    <div className='dashboard-link' >
                      <span className='la la-hourglass'></span>
                      <div className='link-title'>History</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/system/survey/list'>
                    <div className='dashboard-link' >
                      <span className='la la-folder-open-o'></span>
                      <div className='link-title'>User Survey</div>
                    </div>
                  </Link>
                </Grid.Cell>


                
               
              </Grid.X>

              <Grid.X>
                <Grid.Cell large={12} medium={12} small={12}>
                  <div className='main-link-title'>User</div>
                </Grid.Cell>


                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/user/list'>
                    <div className='dashboard-link' >
                      <span className='la la-user'></span>
                      <div className='link-title'>Mga User</div>
                    </div>
                  </Link>
                </Grid.Cell>

                <Grid.Cell large={2} medium={4} small={12}>
                  <Link to='/admin/user/add'>
                    <div className='dashboard-link' >
                      <span className='la la-user-plus'></span>
                      <div className='link-title'>Magdagdag ng User</div>
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