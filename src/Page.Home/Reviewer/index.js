import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'
import ImageLoader from '../../_component/ImageLoader'
import Pagination from '../../_component/Pagination'

import apiRequest from '../../_axios'
import config from '../../_config'

import { connect } from 'react-redux'

import Masonry from 'react-masonry-component';

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      reviewer: [],
      currentPage: 1,
      nextPage: null,
      pageCount: 0,
      perPage: 10,
      previousPage: null,
      totalCount: 1,
    }
    this.fetchLevel = this.fetchLevel.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  changePage(page){
    this.setState({
      currentPage: page
    })
    this.fetchLevel(page)
  }
  fetchLevel(page){
    apiRequest('get', `/reviewer-management/all?validation=true&fileUsage=Reviewer&page=${page}`, false, this.props.token)
      .then((res)=>{
        if(res.data){
          this.setState({
            reviewer: res.data.data,
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
      })
  }
  componentDidMount(){
    this.fetchLevel(1)
  }
  render() { 
    return (

      

        <div className='subject-container rev-cont'>
          <Grid fluid>
          	<Grid.X>
          		<Grid.Cell  large={12} medium={12} small={12}>
          			<div className='subtitle-montserrat bold home-title-text text-center'>Mga Reviewer</div>
          		</Grid.Cell>
          	</Grid.X>
            <Grid.X>
              <Masonry className="learning-strand-container large-12">
                  {this.state.reviewer.map((attr, index)=>{
                return(
                    <div className="learning-strand-item" key={index}>
                        <a href={attr.fileType !== 'Youtube Video' ? `${config}/${attr.pdf}` : `https://www.youtube.com/watch?v=${attr.youtubeVideo}`} target='_blank'>
                         <p className='ls-title'>{attr.description}</p>
                        </a>
                         <div className='user'>
                            <ImageLoader 
                              className='image' 
                              image={
                                  attr.uploader ? attr.uploader.personalInformation ? attr.uploader.personalInformation.image ? attr.uploader.personalInformation.image : '' : '' : ''   
                                }
                            />
                            <div className='name'>
                              { attr.uploader ? attr.uploader.personalInformation ? 
                                (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                                + ' ' + 
                                (attr.uploader.personalInformation.middleName ? (attr.uploader.personalInformation.middleName.substring(0,1) + '. ') : '')
                                + ' ' + 
                                (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                               
                                : '' : ''}
                            </div>
                           


                          </div>
                        
                    </div>

                )
              })}
                   
                   

                
                </Masonry>






            			
            </Grid.X>
            <Grid.X>
             <Grid.Cell large={12}  medium={12} small={12}>
                <div className='center-pagination'>
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
    user: state.user,
    role: state.role,
    hadPreTest: state.hadPreTest,
    level: state.level
  }
}
const ListReviewer = connect(mapStateToProps)(Layout)
export default ListReviewer


/*
<Grid.Cell key={index} large={4} medium={6} small={12}>
                  <div className='grid-reviewer-container border-solid'>
                    <div className='reviewer-info'>
                      <div className='learning-strand'>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : ''}</div>
                      <div className='user'>
                        <ImageLoader 
                          className='image' 
                          image={
                              attr.uploader ? attr.uploader.personalInformation ? attr.uploader.personalInformation.image ? attr.uploader.personalInformation.image : '' : '' : ''   
                            }
                        />
                        <div className='name'>
                          { attr.uploader ? attr.uploader.personalInformation ? 
                            (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                            + ' ' + 
                            (attr.uploader.personalInformation.middleName ? (attr.uploader.personalInformation.middleName.substring(0,1) + '. ') : '')
                            + ' ' + 
                            (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                           
                            : '' : ''}
                        </div>
                       


                      </div>

                    </div>
                    <a href={attr.fileType !== 'Youtube Video' ? `${config}/${attr.pdf}` : `https://www.youtube.com/watch?v=${attr.youtubeVideo}`} target='_blank'>
                     <div className='reviewer-title'>{attr.description}</div>
                    </a>
                  </div>
                </Grid.Cell>


<div className='subject-container'>
        <div className='grid-container fluid'>
          <div className='grid-x'>
            <div className='large-12'>
              <div className='subtitle-montserrat bold home-title-text text-center'>Mga Learning Strand</div>
            </div>
          </div>
          <div className='grid-x justify-center'>
          <Masonry className="learning-strand-container large-10">
            <div className="learning-strand-item">
                <p className='ls-title'>Test Name Exam / Reviewer Longer Name</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
            <div className="learning-strand-item">
                <img src={placeholderimg} className="ls-img" />
                <p className='ls-title'>Test Name Exam / Reviewer</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
            <div className="learning-strand-item">
                <img src={otherImg} className="ls-img" />
                <p className='ls-title'>Test Name Exam</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
          {this.state.learningStrand.map((attr, index)=>{
            return (
                <div key={index} className="learning-strand-item">
                    <p className='ls-title'>{attr.name}</p>
                    <span className='ls-reviewer'><i className="la la-book"></i>{attr.reviewer.length} Reviewers</span>
                </div>
              )
            })}
            </Masonry>
          </div>
        </div>
      </div>

      <span className='ls-reviewer'><i className="la la-book"></i>
                           { attr.uploader ? attr.uploader.personalInformation ? 
                            (attr.uploader.personalInformation.firstName ? attr.uploader.personalInformation.firstName : '') 
                            + ' ' + 
                            (attr.uploader.personalInformation.middleName ? (attr.uploader.personalInformation.middleName.substring(0,1) + '. ') : '')
                            + ' ' + 
                            (attr.uploader.personalInformation.lastName ? attr.uploader.personalInformation.lastName : '')
                           
                            : '' : ''}

                        </span>
*/