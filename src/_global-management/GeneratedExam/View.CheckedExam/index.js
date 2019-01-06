import React, {Component} from 'react'

import { connect } from 'react-redux'

import config from '../../../_config'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
     	answered: false,
     	answer: ''
    }
  	this.updateAnswer = this.updateAnswer.bind(this)
  }
  updateAnswer(answer, id){
  	this.setState({
  		answered: true,
  		answer: answer
  	})
  	this.props.setAnswer(answer, id)
  }
  componentDidMount(){
   	if(this.props.answer != ''){
   		this.setState({
   			answered: true,
   			answer: this.props.answer
   		})
   	}
  }
  render() { 
 
    return (
  
          <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    role: state.role,
    user: state.user
  }
}
const CheckExamView = connect(mapStateToProps)(Layout)
export default CheckExamView  