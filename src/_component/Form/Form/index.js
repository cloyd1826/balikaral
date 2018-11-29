import React, {Component} from 'react'

class Form extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		let { children } = this.props
		return(
			<div className='form-container'>
				<form onSubmit={this.props.onSubmit} className={this.props.size}>
					{ children }
				</form>
			</div>
		)
	}
}

export default Form