import React, {Component} from 'react'

class Input extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		
		return(
			<div className={'input-container ' + (this.props.className ? this.props.className : '')}>
				<label>{this.props.label}
					<input 
						required={this.props.required}
						type={this.props.type ? this.props.type : 'text'} 
						placeholder={this.props.placeholder ? this.props.placeholder : ''}
						min={this.props.min ? this.props.min : ''}
						max={this.props.max ? this.props.max : ''}
						onChange={this.props.onChange ? this.props.onChange : '' }
						value={this.props.value}
						name={this.props.name}
						/>
				</label>
			</div>
		)
	}
}

export default Input