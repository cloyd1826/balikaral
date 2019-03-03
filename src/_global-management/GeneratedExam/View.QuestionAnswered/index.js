import React, {Component} from 'react'

import { connect } from 'react-redux'

import config from '../../../_config'
import apiRequest from '../../../_axios'
import mergeByKey from 'array-merge-by-key'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	checking: false
    }
    this.setGrid = this.setGrid.bind(this)
    // this.fetchReviewer = this.fetchReviewer.bind(this)
    this.fetchAxios = this.fetchAxios.bind(this)
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

  async fetchAxios(id){
    const data = await apiRequest('get', `/reviewer-management/${id}`, false, this.props.token)
    return data.data.data.description
  }

  render() {  
    let passedLearningStrand = this.props.percentagePerLearningStrand.filter((attr)=>{
      return attr.percentage >= 90
    })
    let failedLearningStrand = this.props.percentagePerLearningStrand.filter((attr)=>{
      return attr.percentage < 90
    })
    return (
          <div className='question-answered-container'>

          {this.props.checking ? 
          <div className='summary-learning-strand'>
            <div className='summary-title'>Ito ang resulta ng exam: </div>
            
            {passedLearningStrand.length > 0 ?
               <div className='summary-text'>
                  Matataas ang mga nakuha mo sa:
                 
                    {passedLearningStrand.map((attr, index)=>{
                      return <div  key={index} className='learning-strand'>{attr.learningStrandName}</div>
                    })}
                 
               </div>
            : null}
            {failedLearningStrand.length > 0 ?
             <div className='summary-text'>
                Kailangan mo pang pag-aralan maigi ang:
                  
                  {failedLearningStrand.map((attr, index)=>{
                    return  <div key={index} className='learning-strand'>{attr.learningStrandName}
                      <ul>
                        {
                          // this.fetchReviewer(this.props.finalReviewer)
                          this.props.finalReviewer.map( (x,i) => {
                            return (attr.learningStrand === x.learningStrand ? (
                            
                            <li style={{lineHeight: "45px"}}><span style={{color:"white",backgroundColor:"blue",borderRadius:"3px",padding:"6px",margin:"2px"}}>{i === 0 ? "Highest Priority" : i === 5 ? "Lowest Priority" : "Medium Priority"}</span><span style={{height: "21px",width: "21px", backgroundColor: "red",color:"white", borderRadius: "50%",fontSize:10,position:"absolute",marginTop:"-5px",marginLeft:"-12px",display: "inline-block",textAlign:"center"}}><a style={{marginTop:"-11px",fontSize:12,position:"absolute",marginLeft:"-3px"}}>{x.total}</a></span>{x.description}</li>) : "")
                          }) 
                        }
                      </ul>
                    </div>
                  })}
                
             </div>
            : null}
          </div>  
          : null}
            {this.props.checking ? 
          <div className='percentage-per-ls-container'>
            {this.props.percentagePerLearningStrand.map((attr,index)=>{
              return (
                <div key={index} className='percentage-per-ls'>
                    <div className='learning-strand'><span>Learning Strand:</span> {attr.learningStrandName}</div>
                    <div className='score'><span>Score:</span> {attr.score + '/' + attr.totalQuestion}</div>
                    <div className='score-bar'>
                      <div className='correct' style={{width: attr.percentage + '%'}}>{attr.percentage + '%'}</div>
                      <div className='wrong' style={{width: (100 - attr.percentage) + '%'}}></div>
                    </div>
                </div>
              )
            })}
          </div>
          : null}



        	{this.props.exam.map((attr, index)=>{
        		return(
	        		
        			<div key={index} className={'question-answered ' + (attr.answer !== '' ? 'answered' : '') } onClick={()=>{this.setGrid(index + 1)}}>
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