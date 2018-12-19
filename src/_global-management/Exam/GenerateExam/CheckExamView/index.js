import React, {Component} from 'react'

import { connect } from 'react-redux'


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
  
          <div className={'ex-container ' +  (this.state.answered ? 'answered' : '')}>
            <div className='question'>{(this.props.index + 1) + '. ' +  (this.props.question.question ? this.props.question.question.details ? this.props.question.question.details : '' : '')}</div>
              {this.props.question.question ? this.props.question.question.images ?  
                  <div className='question-image' style={{backgroundImage: 'url(http://localhost:5000/' + this.props.question.question.images + ')'}}></div>
                : '' : ''}

        

          </div>
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