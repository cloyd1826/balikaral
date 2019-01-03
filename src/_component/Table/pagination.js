class TablePagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            nextPage: null,
            pageCount: 1,
            perPage: 10,
            previousPage: null,
            totalPage: 1,
        }
    }
    componentDidMount() {
        let currentPage = this.props.currentPage
        let nextPage = this.props.nextPage
        let pageCount = this.props.pageCount
        let perPage = this.props.perPage
        let previousPage = this.props.previousPage
        let totalPage = this.props.totalPage
        this.setState({
            currentPage: currentPage,
            nextPage: nextPage,
            pageCount: pageCount,
            perPage: perPage,
            previousPage: previousPage,
            totalPage: totalPage,
        })
    }
    componentWillReceiveProps(nextProps) {
        let currentPage = nextProps.currentPage
        let nextPage = nextProps.nextPage
        let pageCount = nextProps.pageCount
        let perPage = nextProps.perPage
        let previousPage = nextProps.previousPage
        let totalPage = nextProps.totalPage
        this.setState({
            currentPage: currentPage,
            nextPage: nextPage,
            pageCount: pageCount,
            perPage: perPage,
            previousPage: previousPage,
            totalPage: totalPage,
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
                        <li><div key={1} onClick={(e) => { this.props.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                        <li><div key={2} onClick={(e) => { this.props.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                        <li><div key={3} onClick={(e) => { this.props.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>
                        <li><div key={4} onClick={(e) => { this.props.changePage(4) }} className={this.state.currentPage === 4 ? 'current' : 'pagination-button'}>{4}</div></li>
                        <li><div key={5} onClick={(e) => { this.props.changePage(5) }} className={this.state.currentPage === 5 ? 'current' : 'pagination-button'}>{5}</div></li>
                        <li className="ellipsis"></li>
                        <li><div key={lastPage - 4} onClick={(e) => { this.props.changePage(lastPage - 4) }} className={this.state.currentPage === (lastPage - 4) ? 'current' : 'pagination-button'}>{lastPage - 4}</div></li>
                        <li><div key={lastPage - 3} onClick={(e) => { this.props.changePage(lastPage - 3) }} className={this.state.currentPage === (lastPage - 3) ? 'current' : 'pagination-button'}>{lastPage - 3}</div></li>
                        <li><div key={lastPage - 2} onClick={(e) => { this.props.changePage(lastPage - 2) }} className={this.state.currentPage === (lastPage - 2) ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                        <li><div key={lastPage - 1} onClick={(e) => { this.props.changePage(lastPage - 1) }} className={this.state.currentPage === (lastPage - 1) ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                        <li><div key={lastPage} onClick={(e) => { this.props.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                        <li onClick={(e)=>{this.changePage((this.state.currentPage === lastPage ? lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>
                    </ul>
                    </nav>
                )
            } else if (this.state.currentPage > 4 && this.state.currentPage <= this.state.totalPage - 4) {
                    return (
                      <nav>
                        <ul className="pagination">
                            <li onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}} className="pagination-previous"><i className='la la-angle-double-left' /></li>

                            <li><div key={1} onClick={(e) => { this.props.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                            <li><div key={2} onClick={(e) => { this.props.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                            <li><div key={3} onClick={(e) => { this.props.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>

                            <li><div className="ellipsis">&hellip;</div></li>

                            <li><div key={this.state.currentPage - 1} onClick={(e) => { this.props.changePage(this.state.currentPage - 1) }} className={this.state.currentPage === this.state.currentPage - 1 ? 'current' : 'pagination-button'}>{this.state.currentPage - 1}</div></li>
                            <li><div key={this.state.currentPage} onClick={(e) => { this.props.changePage(this.state.currentPage) }} className='current'>{this.state.currentPage}</div></li>
                            <li><div key={this.state.currentPage + 1} onClick={(e) => { this.props.changePage(this.state.currentPage + 1) }} className={this.state.currentPage === this.state.currentPage + 1 ? 'current' : 'pagination-button'}>{this.state.currentPage + 1}</div></li>
                            
                            <li><div className="pagination-ellipsis">&hellip;</div></li>
                            <li><div key={lastPage - 2} onClick={(e) => { this.props.changePage(lastPage - 2) }} className={this.state.currentPage === lastPage - 2 ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                            <li><div key={lastPage - 1} onClick={(e) => { this.props.changePage(lastPage - 1) }} className={this.state.currentPage === lastPage - 1 ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                            <li><div key={lastPage} onClick={(e) => { this.props.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                        
                            <li onClick={(e)=>{this.changePage((this.state.currentPage === lastPage ? lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

                        </ul>
                    </nav>
                    )
                }else if (this.state.currentPage >= this.state.totalPage - 3) {
                    return (
                     <nav>
                            <ul className="pagination">
                                <li onClick={(e)=>{this.changePage((this.state.currentPage !== 1 ? this.state.currentPage - 1 : 1 ))}} className="pagination-previous"><i className='la la-angle-double-left' /></li>

                               <li> <div key={1} onClick={(e) => { this.props.changePage(1) }} className={this.state.currentPage === 1 ? 'current' : 'pagination-button'}>{1}</div></li>
                               <li> <div key={2} onClick={(e) => { this.props.changePage(2) }} className={this.state.currentPage === 2 ? 'current' : 'pagination-button'}>{2}</div></li>
                               <li> <div key={3} onClick={(e) => { this.props.changePage(3) }} className={this.state.currentPage === 3 ? 'current' : 'pagination-button'}>{3}</div></li>
                               <li> <div key={4} onClick={(e) => { this.props.changePage(4) }} className={this.state.currentPage === 4 ? 'current' : 'pagination-button'}>{4}</div></li>
                               <li> <div key={5} onClick={(e) => { this.props.changePage(5) }} className={this.state.currentPage === 5 ? 'current' : 'pagination-button'}>{5}</div></li>
                               <li> <div className="pagination-ellipsis">&hellip;</div></li>
                               <li> <div key={lastPage - 4} onClick={(e) => { this.props.changePage(lastPage - 4) }} className={this.state.currentPage === lastPage - 4  ? 'current' : 'pagination-button'}>{lastPage - 4}</div></li>
                               <li> <div key={lastPage - 3} onClick={(e) => { this.props.changePage(lastPage - 3) }} className={this.state.currentPage === lastPage - 3 ? 'current' : 'pagination-button'}>{lastPage - 3}</div></li>
                               <li> <div key={lastPage - 2} onClick={(e) => { this.props.changePage(lastPage - 2) }} className={this.state.currentPage === lastPage - 2 ? 'current' : 'pagination-button'}>{lastPage - 2}</div></li>
                               <li> <div key={lastPage - 1} onClick={(e) => { this.props.changePage(lastPage - 1) }} className={this.state.currentPage === lastPage - 1 ? 'current' : 'pagination-button'}>{lastPage - 1}</div></li>
                               <li> <div key={lastPage} onClick={(e) => { this.props.changePage(lastPage) }} className={this.state.currentPage === lastPage ? 'current' : 'pagination-button'}>{lastPage}</div></li>
                                
                                <li onClick={(e)=>{this.changePage((this.state.currentPage === lastPage ? lastPage : this.state.currentPage + 1 ))}} className="pagination-next"><i className='la la-angle-double-right' /></li>

                         </ul>
                          </nav>
                    )
                }
            }
       
        }
        return (
         <RenderPageNumbers />      
        )
    }
}