import React, {Component} from 'react'

class Button extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		
		return(
			
				<button 
					type={this.props.type ? this.props.type : 'button'}
					className={'button ' + (this.props.className ? this.props.className : '')}
					disabled={this.props.disabled}
					>
					{this.props.text}
				</button>
			
			
		)
	}
}

export default Button