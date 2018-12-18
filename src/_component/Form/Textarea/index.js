import React, {Component} from 'react'

class Textarea extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return(
			<div className={'textarea-container ' + (this.props.className ? this.props.className : '')}>
				<label>{this.props.label} {this.props.required ? <span className='required'>*</span> : '' }
					<textarea  
						rows={this.props.rows ? this.props.rows : 3 }
						placeholder={this.props.placeholder ? this.props.placeholder : '' }
						onChange={this.props.onChange ? this.props.onChange : '' }
						value={this.props.value}
						name={this.props.name}
						required={this.props.required}
						/>
				</label>
			</div>
		)
	}
}

export default Textarea