import React, {Component} from 'react'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

import FormMessage from '../../../../_component/Form/FormMessage'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      message: '',
      type: '',
      active: false
    }
    this.deleteRecord = this.deleteRecord.bind(this)
    this.formMessage = this.formMessage.bind(this)
  }
  formMessage(message, type, active){
    this.setState({
      message: message,
      type: type,
      active: active
    })
  }
  deleteRecord(){
    let data = this.props.data
    data = { ...data, active: true }
    apiRequest('put', `/landing-page/set-active/${data._id}`, data, this.props.token)
      .then((res)=>{
        this.props.fetch(this.props.currentPage)
        this.props.close()

      })
      .catch((err)=>{
        this.formMessage('Error: ' + err.message, 'error', true, false)
      })
  }
  render() {
    if(this.props.active) {
      return (
        <div className='modal'>
          <div className='delete-modal'>
            

            <span className='close-button la la-close' onClick={this.props.close}></span>
            <div className='delete-title text-center'>Set this as the active Landing Page</div>
            <div className='context-montserrat text-center'>You can always change the active data for the landing page</div>
            <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage> 
            <div className='delete-button-group'>
              <button type='button' className='button yes small' onClick={this.deleteRecord}>YES, SET AS LANDING PAGE</button>
              <button type='button' className='button no small' onClick={this.props.close}>CANCEL, KEEP THE CURRENT LANDING PAGE</button>
            </div>
          </div> 
        </div>
      )
    }else{
      return null
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}
const SetActive = connect(mapStateToProps)(Layout)
export default SetActive