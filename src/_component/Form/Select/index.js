import React, {Component} from 'react'

class Select extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		let { children } = this.props
		return(
			<div className={'select-container ' + (this.props.className ? this.props.className : '')}>
				<label>{this.props.label}</label>
					<select  
						onChange={this.props.onChange ? this.props.onChange : '' }
						value={this.props.value}
						name={this.props.name}
						required={this.props.required}
					>
						{children}
					</select>
				

			</div>
		)
	}
}

export default Select