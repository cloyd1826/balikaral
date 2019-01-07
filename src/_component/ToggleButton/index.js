import React, { Component } from 'react'

class ToggleButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false,
        }
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        if (this.state.isSelected) {
            this.setState({
                isSelected: false,
            })
        } else {
            this.setState({
                isSelected: true
            })
        }
        this.props.setSelected()
    }
    componentDidMount(){
        let isSelected = this.props.isSelected
        if(isSelected){
            this.setState({
                isSelected: isSelected
            }) 
        }
        
    }
    componentWillReceiveProps(nextProps){
        let isSelected = nextProps.isSelected
        if(isSelected){
            this.setState({
                isSelected: isSelected
            })  
        }
        
    }
    render() {
        return (
            <span onClick={this.toggle}>
                {this.state.isSelected ? <i className='la la-toggle-on'></i> : <i className='la la-toggle-off'></i>}
            </span>
        )
    }
}

export default ToggleButton