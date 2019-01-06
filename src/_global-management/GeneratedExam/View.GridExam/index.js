import React, {Component} from 'react'

import { connect } from 'react-redux'

import config from '../../../_config'

import Grid from '../../../_component/Grid'
import ImageLoader from '../../../_component/ImageLoader'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      totalPage: 0,
      currentPage: 0,
      question: {},
      answer: '',

      isAnswered: false



    }
    this.changePage = this.changePage.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
  }
  setAnswer(answer){
    let currentPage = this.state.currentPage
    this.props.setAnswer(answer, currentPage-1)
  }
  changePage(page){
      this.props.changePage(page)
  }
  componentDidMount(){
    this.setState({
      totalPage: this.props.totalPage, 
      currentPage: this.props.currentPage,
      question: this.props.question,
      answer: this.props.answer,
      isAnswered: this.props.answer !== '' ? true :  false 
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      totalPage: nextProps.totalPage, 
      currentPage: nextProps.currentPage,
      question: nextProps.question,
      answer: nextProps.answer,
      isAnswered: nextProps.answer !== '' ? true :  false 
    })
   
  }
  render() { 
   
    let  question  = this.state.question ? this.state.question.question ? this.state.question.question : {} : {} 
    let answer = this.state.answer ? this.state.answer : ''
  
    const RenderPagination = () => {
    const pageNumbers = [];
      for (let i = 1; i <= this.state.totalPage; i++) {
          pageNumbers.push(i);
      }
        let lastPage = this.state.totalPage

        if(this.state.totalPage <= 10){
          return (
          <div className='pagination'>
            {
              pageNumbers.map((number)=>{
              return (
                <li key={number}><div onClick={(e)=>{this.changePage(number)}} className={this.state.currentPage === number ? 'current' : 'pagination-button'} >{number}</div></li>
              )
              })
            }
          </div>
          )
        }else{
          if(this.state.currentPage <= 4){
         return (
                <nav>
                <ul className="pagination">
                  <li onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}} className="pagination-previous"><i className='la la-angle-double-left' /></li>
                        <li><div key={1} onClick={(e) => { this.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                        <li><div key={2} onClick={(e) => { this.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                        <li><div key={3} onClick={(e) => { this.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>
                        <li><div key={4} onClick={(e) => { this.changePage(4) }} className={this.state.currentPage === 4 ? 'current' : 'pagination-button'}>{4}</div></li>
                        <li><div key={5} onClick={(e) => { this.changePage(5) }} className={this.state.currentPage === 5 ? 'current' : 'pagination-button'}>{5}</div></li>
                        <li className="ellipsis"></li>
                        <li><div key={lastPage - 4} onClick={(e) => { this.changePage(lastPage - 4) }} className={this.state.currentPage === (lastPage - 4) ? 'current' : 'pagination-button'}>{lastPage - 4}</div></li>
                        <li><div key={lastPage - 3} onClick={(e) => { this.changePage(lastPage - 3) }} className={this.state.currentPage === (lastPage - 3) ? 'current' : 'pagination-button'}>{lastPage - 3}</div></li>
                        <li><div key={lastPage - 2} onClick={(e) => { this.changePage(lastPage - 2) }} className={this.state.currentPage === (lastPage - 2) ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                        <li><div key={lastPage - 1} onClick={(e) => { this.changePage(lastPage - 1) }} className={this.state.currentPage === (lastPage - 1) ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                        <li><div key={lastPage} onClick={(e) => { this.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                      <li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.totalPage ? this.state.totalPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>
                    </ul>
            </nav>
                )
          } else if (this.state.currentPage > 4 && this.state.currentPage <= this.state.totalPage - 4) {
                    return (
                      <nav>
                  <ul className="pagination">
                    <li onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}} className="pagination-previous"><i className='la la-angle-double-left' /></li>

                            <li><div key={1} onClick={(e) => { this.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                            <li><div key={2} onClick={(e) => { this.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                            <li><div key={3} onClick={(e) => { this.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>

                            <li><div className="ellipsis">&hellip;</div></li>

                            <li><div key={this.state.currentPage - 1} onClick={(e) => { this.changePage(this.state.currentPage - 1) }} className={this.state.currentPage === this.state.currentPage - 1 ? 'current' : 'pagination-button'}>{this.state.currentPage - 1}</div></li>
                            <li><div key={this.state.currentPage} onClick={(e) => { this.changePage(this.state.currentPage) }} className='current'>{this.state.currentPage}</div></li>
                            <li><div key={this.state.currentPage + 1} onClick={(e) => { this.changePage(this.state.currentPage + 1) }} className={this.state.currentPage === this.state.currentPage + 1 ? 'current' : 'pagination-button'}>{this.state.currentPage + 1}</div></li>
                            
                            <li><div className="pagination-ellipsis">&hellip;</div></li>
                            <li><div key={lastPage - 2} onClick={(e) => { this.changePage(lastPage - 2) }} className={this.state.currentPage === lastPage - 2 ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                            <li><div key={lastPage - 1} onClick={(e) => { this.changePage(lastPage - 1) }} className={this.state.currentPage === lastPage - 1 ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                            <li><div key={lastPage} onClick={(e) => { this.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                        
                        <li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.totalPage ? this.state.totalPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

                        </ul>
              </nav>
                    )
                }else if (this.state.currentPage >= this.state.totalPage - 3) {
                    return (
                     <nav>
                      <ul className="pagination">
                        <li onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}} className="pagination-previous"><i className='la la-angle-double-left' /></li>

                               <li> <div key={1} onClick={(e) => { this.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                               <li> <div key={2} onClick={(e) => { this.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                               <li> <div key={3} onClick={(e) => { this.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>
                               <li> <div key={4} onClick={(e) => { this.changePage(4) }} className={this.state.currentPage === 4 ? 'current' : 'pagination-button'}>{4}</div></li>
                               <li> <div key={5} onClick={(e) => { this.changePage(5) }} className={this.state.currentPage === 5 ? 'current' : 'pagination-button'}>{5}</div></li>
                               <li> <div className="pagination-ellipsis">&hellip;</div></li>
                               <li> <div key={lastPage - 4} onClick={(e) => { this.changePage(lastPage - 4) }} className={this.state.currentPage === lastPage - 4  ? 'current' : 'pagination-button'}>{lastPage - 4}</div></li>
                               <li> <div key={lastPage - 3} onClick={(e) => { this.changePage(lastPage - 3) }} className={this.state.currentPage === lastPage - 3 ? 'current' : 'pagination-button'}>{lastPage - 3}</div></li>
                               <li> <div key={lastPage - 2} onClick={(e) => { this.changePage(lastPage - 2) }} className={this.state.currentPage === lastPage - 2 ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                               <li> <div key={lastPage - 1} onClick={(e) => { this.changePage(lastPage - 1) }} className={this.state.currentPage === lastPage - 1 ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                               <li> <div key={lastPage} onClick={(e) => { this.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                              
                            <li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.totalPage ? this.state.totalPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

                         </ul>
                    </nav>
                    )
                }
        }
       
    }

    return (
          <div className={'grid-exam-container ' + (this.state.isAnswered ? 'answered' : '')}>
              <div className='prev-icon' onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}}>
                <i className='la la-chevron-circle-left' />
              </div>
              <div className='next-icon' onClick={(e)=>{this.changePage((this.state.currentPage === this.state.totalPage ? this.state.totalPage : this.state.currentPage + 1 ))}}>
                <i className='la la-chevron-circle-right' />
              </div>
                <div className='grid-exam'>
                  <div className='grid-question-details'>
                    <span>
                      {question.details ? question.details : ''}
                    </span>
                  </div>
                  { question.images ? 
                      <div className='grid-question-image' style={{backgroundImage: `url(${config}/` + question.images + ')'}}></div>
                  : ''}  
                  <div className='grid-answer'>
                    
                    <div className={'answer-text ' + (this.state.answer === 'A' ? 'active' : '' )} onClick={()=>{this.setAnswer('A')}}>
                      <span className='letter'>A.</span>
                      <span className='answer'>
                          {question.choices ? question.choices.a ? question.choices.a.image ? question.choices.a.image != '' ?  
                            <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.a.image + ')'}}></div>
                          : '' : '' : '' : '' }
                        { question.choices ? question.choices.a ? question.choices.a.details ? question.choices.a.details : '' : '' : '' }
                      </span>
                    </div>

                    <div className={'answer-text ' + (this.state.answer === 'B' ? 'active' : '' )}  onClick={()=>{this.setAnswer('B')}}>
                      <span className='letter'>B.</span>
                      <span className='answer'>
                          {question.choices ? question.choices.b ? question.choices.b.image ? question.choices.b.image != '' ?  
                            <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.b.image + ')'}}></div>
                          : '' : '' : '' : '' }
                        { question.choices ? question.choices.b ? question.choices.b.details ? question.choices.b.details : '' : '' : '' }
                      </span>
                    </div>


                    <div className={'answer-text ' + (this.state.answer === 'C' ? 'active' : '' )}  onClick={()=>{this.setAnswer('C')}}>
                      <span className='letter'>C.</span>
                      <span className='answer'>
                          {question.choices ? question.choices.c ? question.choices.c.image ? question.choices.c.image != '' ?  
                            <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.c.image + ')'}}></div>
                          : '' : '' : '' : '' }
                        { question.choices ? question.choices.c ? question.choices.c.details ? question.choices.c.details : '' : '' : '' }
                      </span>
                    </div>

                    <div className={'answer-text ' + (this.state.answer === 'D' ? 'active' : '' )}  onClick={()=>{this.setAnswer('D')}}>
                      <span className='letter'>D.</span>
                      <span className='answer'>
                          {question.choices ? question.choices.d ? question.choices.d.image ? question.choices.d.image != '' ?  
                            <div className='answer-image' style={{backgroundImage: `url(${config}/` + question.choices.d.image + ')'}}></div>
                          : '' : '' : '' : '' }
                        { question.choices ? question.choices.d ? question.choices.d.details ? question.choices.d.details : '' : '' : '' }
                      </span>
                    </div>
                  </div>    
                </div>
                <div className='grid-pagination'>
                  <RenderPagination />
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
const GridExamView = connect(mapStateToProps)(Layout)
export default GridExamView  