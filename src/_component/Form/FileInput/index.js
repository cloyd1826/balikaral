import React, {Component} from 'react'

class FileInput extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		
		return(
			<div className={'input-container file-input' + (this.props.className ? this.props.className : '')}>
				<label>{this.props.label}</label>
				<div className='file-input-container'>
					<span className='file-button-icon'>
						<i className='la la-cloud-upload'></i>
						Choose a file ...
					</span>
					<span className='file-name'>{this.props.fileName ? this.props.fileName : 'No file chosen'}</span>
					<input 
						required={this.props.required}
						disabled={this.props.disabled}
						type='file'
						accept={this.props.accept}
						onChange={this.props.onChange ? this.props.onChange : '' }
						name={this.props.name}
						
						/>
				</div>
			</div>
		)
	}
}

export default FileInput