import React, {Component} from 'react'

import PDF from 'react-pdf-js'


class PdfErrorHandle extends Component {
	constructor(props){
		super(props)
		this.state = {
			hasError: false
		}
	}
	componentDidCatch(error, info){
		console.log('error', error, 'info', info)
		this.setState({
			hasError: true
		})
	}
	render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children
  }
}

class PdfViewer extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    	pdf: '',
    	hasPdf: false,

    	currentPage: 1,
    	totalPage: 1,
    }
    this.onDocumentComplete = this.onDocumentComplete.bind(this)

    this.changePage = this.changePage.bind(this)
  }
  onDocumentComplete(pages){
    this.setState({ 
    	currentPage: 1,
    	totalPage: pages 
    })
  }
  changePage(page){
  
  		this.setState({
  			currentPage: page
  		})
  	
  	
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
  	console.log(nextProps)
  	let pdf = nextProps.pdf
  	this.setState({
  		pdf: pdf,
  		hasPdf: true
  	})
  }
  render() { 
  	const RenderPagination = () => {
		const pageNumbers = [];
	    for (let i = 1; i <= this.state.totalPage; i++) {
	        pageNumbers.push(i);
	    }
        let lastPage = this.state.totalPage

        if(this.state.totalPage <= 10){
        	return pageNumbers.map((number)=>{
        		return (
        			<li key={number}><div onClick={(e)=>{this.changePage(number)}} className={this.state.currentPage === number ? 'current' : 'pagination-button'} >{number}</div></li>
        		)
        	})
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
                    	<li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.lastPage ? this.state.lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>
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
                        
                    		<li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.lastPage ? this.state.lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

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
                            	
                        		<li onClick={(e)=>{this.changePage((this.state.currentPage === this.state.lastPage ? this.state.lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

                         </ul>
	         		      </nav>
                    )
                }
        }
       
  	}
    return (
        <div className='pdf-viewer'>
	       
				
				
					{this.state.hasPdf ?
						<div>
							<div className='pdf-action'>
								<i className='la la-eye' />
								<i className='la la-download' />
							</div>
							<PDF
								file={`http://localhost:5000/${this.state.pdf}`}
								onDocumentComplete={this.onDocumentComplete}
								page={this.state.currentPage}
							/>
							<RenderPagination />
						</div>
						: 
						<span className='pdf-loader'>
							<span className='loading-text'>
								<i className='la la-spinner'></i>
								<div className='context-questrial'>Loading Content ...</div>
							</span>
						</span>
					}
				
				

        </div>
    )
  }
}
export default PdfViewer