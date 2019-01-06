import React, {Component} from 'react'

import { connect } from 'react-redux'

import config from '../../../_config'
import ImageLoader from '../../../_components/ImageLoader'

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
    if(!this.props.checking){
      this.setState({
        answered: true,
        answer: answer
      })
      this.props.setAnswer(answer, id)
    }
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
  
          <div className={'ex-container ' +  (this.state.answered ? 'answered' : '') + (this.props.checking ? (this.props.answer === this.props.correctAnswer ? ' correct' : ' wrong') : '')}>
            <div className='question'>{(this.props.index + 1) + '. ' +  (this.props.question.question ? this.props.question.question.details ? this.props.question.question.details : '' : '')}</div>
              {this.props.question.question ? this.props.question.question.images ?  
                  <ImageLoader className='question-image' image={this.props.question.question.images} />

                : '' : ''}

            <div className='answer'>

              {
                this.props.checking && this.props.answer !== this.props.correctAnswer ? 

                  <div className='answer-box correct-answer' >
                    <span>Correct Answer. </span>
                    <div className='text'>
                    {this.props.correctAnswer}
                    </div>
                  </div>

              : null }


              <div 
              	className={'answer-box ' + (this.state.answer === 'A' ? 'active' : '')} 
              	onClick={()=>{this.updateAnswer('A', (this.props.question ? this.props.question._id ? this.props.question._id : '' : '') ) }} 
              	>
                <span>A. </span>
                <div className='text'>
                {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.a ? this.props.question.question.choices.a.image ? 
                  
                  <ImageLoader className='question-image' image={this.props.question.question.choices.a.image} />
                  
                  : '' : '' : '' : '' )}
                  {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.a ? this.props.question.question.choices.a.details ? this.props.question.question.choices.a.details : '' : '' : '' : '' )}
                </div>
              </div>
            
              <div 
              	className={'answer-box ' + (this.state.answer === 'B' ? 'active' : '')} 
              	onClick={()=>{this.updateAnswer('B', (this.props.question ? this.props.question._id ? this.props.question._id : '' : ''))}} 
              	>
                <span>B. </span>
                <div className='text'>
                {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.b ? this.props.question.question.choices.b.image ? 
                
                  <ImageLoader className='question-image' image={this.props.question.question.choices.b.image} />
                  
                  : '' : '' : '' : '' )}
                  {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.b ? this.props.question.question.choices.b.details ? this.props.question.question.choices.b.details : '' : '' : '' : '' )}
                </div>
              </div>
            
              <div 
              	className={'answer-box ' + (this.state.answer === 'C' ? 'active' : '')} 
              	onClick={()=>{this.updateAnswer('C', (this.props.question ? this.props.question._id ? this.props.question._id : '' : ''))}} 
              	>
                <span>C. </span>
                <div className='text'>
                {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.c ? this.props.question.question.choices.c.image ? 
                  
                  <ImageLoader className='question-image' image={this.props.question.question.choices.c.image} />
                  
                  : '' : '' : '' : '' )}
                  {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.c ? this.props.question.question.choices.c.details ? this.props.question.question.choices.c.details : '' : '' : '' : '' )}
                </div>
              </div>
            
              <div 
              	className={'answer-box ' + (this.state.answer === 'D' ? 'active' : '')} 
              	onClick={()=>{this.updateAnswer('D', (this.props.question ? this.props.question._id ? this.props.question._id : '' : ''))}} 
              	>
                <span>D. </span>
                <div className='text'>
                {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.d ? this.props.question.question.choices.d.image ? 
                 
                  <ImageLoader className='question-image' image={this.props.question.question.choices.d.image} />
                  
                  : '' : '' : '' : '' )}
                  {(this.props.question.question ? this.props.question.question.choices ? this.props.question.question.choices.d ? this.props.question.question.choices.d.details ? this.props.question.question.choices.d.details : '' : '' : '' : '' )}
                </div>
              </div>
            </div>

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
const ListExamView = connect(mapStateToProps)(Layout)
export default ListExamView  