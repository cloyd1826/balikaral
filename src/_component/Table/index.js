import React, { Component } from 'react'

class Table extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    let tableClass = (this.props.scroll ? 'scroll' : '') + ' ' +  (this.props.nostripe ? 'unstriped' : '') + ' ' + (this.props.hover ? 'hover' : '') + ' ' +  (this.props.className ? this.props.className : '')
    return (
      <table className={tableClass}>
          {  children }
      </table>
    );
  }
}

class TableHeader extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    return (
      <thead className={this.props.className ? this.props.className : ''}>
          {  children }
      </thead>
    );
  }
}

class TableBody extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    return (
      <tbody className={(this.props.className ? this.props.className : '' )}>
          {  children.length === 0 ? 
            <tr>
              <td className='table-body-no-data' colSpan={16}>
                No data to display
              </td>
            </tr>
          : children }
      </tbody>
    );
  }
}

class TableFooter extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    return (
      <tfoot className={this.props.className ? this.props.className : ''}>
          {  children }
      </tfoot>
    );
  }
}

class TableRow extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    return (
      <tr className={this.props.className ? this.props.className : ''}>
          {  children }
      </tr>
    );
  }
}
class TableHeaderCell extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        let { children } = this.props
        let colSpan = this.props.colSpan ? this.props.colSpan : ''
        let rowSpan = this.props.rowSpan ? this.props.rowSpan : ''
        return (
            <th className={this.props.className ? this.props.className : '' } rowSpan={rowSpan} colSpan={colSpan}>
                {children}
            </th>
        )
    }
}

class TableCell extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    let colSpan = this.props.colSpan ? '1' : this.props.colSpan
    let rowSpan = this.props.rowSpan ? '1' : this.props.rowSpan
    let narrowed = this.props.isNarrowed ? ' is-narrowed' : ''
    let cellClass = narrowed + (this.props.className ? this.props.className : '')
    return (
      <td className={cellClass} rowSpan={rowSpan} colSpan={colSpan}>
          {  children }
      </td>
    );
  }
}


Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.Row = TableRow
Table.HeaderCell = TableHeaderCell
Table.Cell = TableCell

export default Table
