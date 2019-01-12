import React, {Component} from 'react'

import { Link, withRouter } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import ImageLoader from '../../../_component/ImageLoader'

import { connect } from 'react-redux'

import ManagementDelete from '../../../_component/ManagementDelete'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	isActive: false,
      link: ''
    }
    this.toggleAction = this.toggleAction.bind(this)
  }
  toggleAction(){
    this.setState({
      isActive: this.state.isActive ? false : true
    })
  }
  render() { 
    return (
        <Grid.Cell large={4} medium={6} small={12}>
          <div className='grid-reviewer-container'>
            <div className='reviewer-info'>
              <div className='learning-strand'>{this.props.data.learningStrand ? this.props.data.learningStrand.name ? this.props.data.learningStrand.name : '' : ''}</div>
              <div className='user'>
                <ImageLoader 
                  className='image' 
                  image={
                      this.props.data.uploader ? this.props.data.uploader.personalInformation ? this.props.data.uploader.personalInformation.image ? this.props.data.uploader.personalInformation.image : '' : '' : ''   
                    }
                />
                <div className='name'>
                  { this.props.data.uploader ? this.props.data.uploader.personalInformation ? 
                    (this.props.data.uploader.personalInformation.firstName ? this.props.data.uploader.personalInformation.firstName : '') 
                    + ' ' + 
                    (this.props.data.uploader.personalInformation.middleName ? (this.props.data.uploader.personalInformation.middleName.substring(0,1) + '. ') : '')
                    + ' ' + 
                    (this.props.data.uploader.personalInformation.lastName ? this.props.data.uploader.personalInformation.lastName : '')
                    : '' : ''}
                </div>
                <div className='role'>
                  {this.props.data.uploader ? this.props.data.uploader.local ? this.props.data.uploader.local.userType ? this.props.data.uploader.local.userType : '' : '' : ''}
                </div>

              </div>
            </div>

            <Link to={{ 
                    pathname: 
                      (this.props.role === 'Administrator' ? '/admin/teachers/reviewer/view' : '') + 
                      (this.props.role === 'Teacher' ? '/teacher/management/reviewer/view' : '') + 
                      (this.props.role === 'Learner' ?  (this.props.hadPreTest ? '/learner/reviewer/view' : '/learner-start/reviewer/view' )     : ''), 
                    state: { id: this.props.data._id } 
                  }}>
              <div className='reviewer-title'>{this.props.data.description}</div>
            </Link>

            <div className='reviewer-action'>
              <i className='la la-ellipsis-v' onClick={this.toggleAction} />

              {this.state.isActive ? 
                <div className='action-container'>

                 {this.props.match.params.type === 'all' || this.props.match.params.type === 'teachers'  ? 
                    <Link to={{ 
                      pathname: (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/reviewer/validate', 
                      state: { id: this.props.data._id } 
                    }}>
                      <div className='action'>
                        <span><i className='la la-tags primary'></i></span>
                        Validate
                      </div>
                    </Link>
                  : null }

                  { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ? 
                    <Link to={{ 
                      pathname: (this.props.role === 'Administrator' ? '/admin/teachers' : '') + (this.props.role === 'Teacher' ? '/teacher/management' : '') +  '/reviewer/edit', 
                      state: { id: this.props.data._id } 
                    }}>
                      <div className='action'>
                        <span><i className='fa fa-edit primary'></i></span>
                        Edit
                      </div>
                    </Link>
                 : null }

                 <Link to={{ 
                    pathname: 
                      (this.props.role === 'Administrator' ? '/admin/teachers/reviewer/view' : '') + 
                      (this.props.role === 'Teacher' ? '/teacher/management/reviewer/view' : '') + 
                      (this.props.role === 'Learner' ?  (this.props.hadPreTest ? '/learner/reviewer/view' : '/learner-start/reviewer/view' )     : ''), 
                    state: { id: this.props.data._id } 
                  }}>

                    <div className='action'>
                      <span><i className='la la-folder-open-o primary'></i></span>
                      View
                    </div>
                  </Link>

                   { this.props.match.params.type === 'self' || (this.props.match.params.type === 'all' && this.props.role === 'Administrator') ?
                    <div className='action' onClick={()=>{this.props.toggleDelete('/reviewer-management/delete/' + this.props.data._id)}}>
                      <span><i className='la la-trash cancel'></i></span>
                      Delete
                    </div>
                   : null }

                </div>
              : null}
            </div>
          </div>
          
        </Grid.Cell>
        
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
    user: state.user,
    role: state.role,
    hadPreTest: state.hadPreTest
	}
}
const LayoutReviewer = connect(mapStateToProps)(Layout)
const ListReviewer = withRouter(LayoutReviewer)
export default ListReviewer