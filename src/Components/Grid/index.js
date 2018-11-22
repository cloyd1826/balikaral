import React, { Component } from 'react'

class Grid extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    let gridClass = 'grid-container ' + (this.props.fluid ? ' fluid ' : ' ') + (this.props.full ? ' full ' : '' ) + (this.props.className ? this.props.className : '')
    return (
      <div className={gridClass}>
          {  children }
      </div>
    );
  }
}
class GridX extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    let gridClass = 'grid-x ' + (this.props.margin ? ' grid-margin-x ' : ' ') + (this.props.padding ? ' grid-padding-x ' : '' ) + (this.props.className ? this.props.className : '')
    return (
      <div className={gridClass}>
        { children }
      </div>
    )
  }
} 
class GridCell extends Component { 
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    let { children } = this.props
    let large = 'large-' + this.props.large
    let medium = 'medium-' + this.props.medium
    let small = 'small-' + this.props.small
    let className = this.props.className ? this.props.className : ''
    let gridClass = className + ' ' + large + ' ' + medium + ' ' + small
    return (
      <div className={gridClass}>
        { children }
      </div>
    )
  }
}


Grid.X = GridX
Grid.Cell = GridCell

export default Grid
