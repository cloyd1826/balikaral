import React, {Component} from 'react'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

import FormMessage from '../Form/FormMessage'

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
   
    apiRequest('delete', this.props.link, false, this.props.token)
      .then((res)=>{
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
            <div className='delete-title text-center'>Do you want to delete {this.props.item}</div>
            <div className='context-montserrat text-center'>Once you delete the {this.props.item}, you wont be able to undo this action</div>
            <FormMessage type={this.state.type} active={this.state.active}>{this.state.message}</FormMessage> 
            <div className='delete-button-group'>
              <button type='button' className='button yes small' onClick={this.deleteRecord}>YES, DELETE {this.props.item}</button>
              <button type='button' className='button no small' onClick={this.props.close}>CANCEL, KEEP THE {this.props.item}</button>
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
const DeleteLevel = connect(mapStateToProps)(Layout)
export default DeleteLevel