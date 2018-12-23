import React, {Component} from 'react'

import { connect } from 'react-redux'

import config from '../../../_config'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	checking: false
    }
    this.setGrid = this.setGrid.bind(this)
  }
  setGrid(currentPage){
  	if(!this.state.checking){
  		this.props.setGrid(currentPage)
  	}
  }
  componentDidMount(){
  	this.setState({
  		checking: this.props.checking
  	})
  }
  componentWillReceiveProps(nextProps){
  	this.setState({
  		checking: nextProps.checking
  	})
  }

  render() {  
    return (
          <div className='question-answered-container'>
        	{this.props.exam.map((attr, index)=>{
        		return(
	        		
        			<div className={'question-answered ' + (attr.answer !== '' ? 'answered' : '') } onClick={()=>{this.setGrid(index + 1)}}>
        				<div className='number'>{index + 1}</div>
        				<div className={'question ' + (attr.correctAnswer ? attr.correctAnswer === attr.answer ? 'correct' : 'wrong' : '')}>
        					{attr.question ? attr.question.question ? attr.question.question.details ? attr.question.question.details : '' : '' : ''}
        					{ attr.correctAnswer && this.state.checking ? 
		    					<div className='answer-box'>
		    						<div className='answered-list'>
			        					<div className={'letter ' + (attr.correctAnswer === 'A' ? 'correct' : '') + (attr.answer === 'A' && attr.correctAnswer !== 'A' ? 'active' : '')}>A.</div>
			        					<div className='answer'>
			        						{attr.question ? attr.question.question ? attr.question.question.choices ? attr.question.question.choices.a ? attr.question.question.choices.a ? attr.question.question.choices.a.details  : '' : '' : '' : '' : '' }
			        					</div>
			        				</div>
			        				<div className='answered-list'>
			        					<div className={'letter ' + (attr.correctAnswer === 'B' ? 'correct' : '') + (attr.answer === 'B' && attr.correctAnswer !== 'B' ? 'active' : '')}>B.</div>
			        					<div className='answer'>
			        						{attr.question ? attr.question.question ? attr.question.question.choices ? attr.question.question.choices.b ? attr.question.question.choices.b ? attr.question.question.choices.b.details  : '' : '' : '' : '' : '' }
			        					</div>
			        				</div>
			        				<div className='answered-list'>
			        					<div className={'letter ' + (attr.correctAnswer === 'C' ? 'correct' : '') + (attr.answer === 'C' && attr.correctAnswer !== 'C' ? 'active' : '')}>C.</div>
			        					<div className='answer'>
			        						{attr.question ? attr.question.question ? attr.question.question.choices ? attr.question.question.choices.c ? attr.question.question.choices.c ? attr.question.question.choices.c.details  : '' : '' : '' : '' : '' }
			        					</div>
			        				</div>
			        				<div className='answered-list'>
			        					<div className={'letter ' + (attr.correctAnswer === 'D' ? 'correct' : '') + (attr.answer === 'D' && attr.correctAnswer !== 'D' ? 'active' : '')}>D.</div>
			        					<div className='answer'>
			        						{attr.question ? attr.question.question ? attr.question.question.choices ? attr.question.question.choices.d ? attr.question.question.choices.d ? attr.question.question.choices.d.details  : '' : '' : '' : '' : '' }
			        					</div>
			        				</div>
		    					</div>
	    					: null }
        				</div>
        			</div>
        		)
        	})}

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
const QuestionAnswered = connect(mapStateToProps)(Layout)
export default QuestionAnswered  