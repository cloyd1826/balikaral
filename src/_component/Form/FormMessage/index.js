import React, {Component} from 'react'

class FormMessage extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.close = this.close.bind(this)
	}
	close(){
		this.props.formMessage('','',false,false)
	}
	render(){
		let { children } = this.props
		
		if(this.props.active){
			return(
				<div className={'form-message ' + (this.props.type ? this.props.type : '')}>
					<i className={'la ' + 
						(this.props.type==='success' ? 'la-check' : '') +
						(this.props.type==='warning' ? 'la-info-circle' : '') +
						(this.props.type==='error' ? 'la-exclamation-triangle' : '') +
						(this.props.type==='loading' ? 'la-spinner' : '')
						} />
					{children}
					{this.props.type === 'loading' ? '' : <span className='close la la-times' onClick={this.close}></span> }
					
				</div>
			)
		}else{
			return null
		}	
	}
}

export default FormMessage