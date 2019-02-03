import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../_component/Grid'
import ImageLoader from '../../_component/ImageLoader'
import Pagination from '../../_component/Pagination'

import apiRequest from '../../_axios'
import config from '../../_config'

import { connect } from 'react-redux'
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
        <div className='rev-cont'>
          <Grid fluid>
          	<Grid.X>
          		<Grid.Cell  large={12} medium={12} small={12}>
          			<div className='subtitle-montserrat bold home-title-text'>Mga Reviewer</div>
          		</Grid.Cell>
          	</Grid.X>
            <Grid.X>
            	{this.state.reviewer.map((attr, index)=>{
            		return(
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
            		)
            	})}
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