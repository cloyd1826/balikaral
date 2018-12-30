import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Grid from '../../../_component/Grid'
import FormMessage from '../../../_component/Form/FormMessage'

import apiRequest from '../../../_axios'

import { connect } from 'react-redux'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      forum: [],

      message: '',
      type: '',
      active: false,

      deleteActive: false,
      link: ''
    }
    this.fetchSubject = this.fetchSubject.bind(this)
    this.formMessage = this.formMessage.bind(this)

    this.toggleDelete = this.toggleDelete.bind(this)
  }
  toggleDelete(link){
    if(this.state.deleteActive){
      this.setState({
        deleteActive: false,
        link: ''
      })
      this.fetchSubject()
    }else{
      this.setState({
        deleteActive: true,
        link: link
      })
    }
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }

  fetchSubject(){
    
    apiRequest('get', '/management-forum/all', false, this.props.token)
      .then((res)=>{
        console.log(res.data.data)
        if(res.data){
          this.setState({
            forum: res.data.data
          })  
        }
      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  componentDidMount(){
    this.fetchSubject()
  }
  render() { 
    return (
      <div>
          <Grid fluid>
            <Grid.X>
              <Grid.Cell large={12} medium={12} small={12}>
                <div className='forum-dashboard element-container'>
                  <div className='title-text-container'>
                    <div className='title'>Available Forums</div>
                    <div className='title-action'>

                    </div>
                  </div>
                  {this.state.forum.map((attr, index)=>{
                    return (
                      <div key={index}>
                        <Link to={{ 
                              pathname: (
                                (this.props.role === 'Administrator' ? '/admin' : '') + 
                                (this.props.role === 'Teacher' ? '/teacher' : '') +
                                (this.props.role === 'Learner' ? '/learner' : '') +
                                 '/forum/discussions/list'), 
                              state: { id: attr._id } 
                                }}>
                          <div className='forum-dashboard-container'>
                            <div className='forum-name'>{attr.name}</div>
                            <div className='forum-strand'>{attr.learningStrand ? attr.learningStrand.name ? attr.learningStrand.name : '' : '' }</div>
                            <div className='forum-description'>{attr.description}</div>
                          </div>
                        </Link>
                      </div>
                      )
                  })}
                    
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
    role: state.role
  }
}
const ListLearningStrand = connect(mapStateToProps)(Layout)
export default ListLearningStrand