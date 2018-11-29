import React, {Component} from 'react'

import Select from '../../../../_component/Form/Select'

import apiRequest from '../../../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	level: []
    }
    this.fetchAll = this.fetchAll.bind(this)
  }
  fetchAll(){	
  	apiRequest('get', '/level/all', false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				level: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        
  		})
  }
  componentDidMount(){
  	this.fetchAll()
  }
  render() { 
    return (
		<Select
			onChange={this.props.onChange ? this.props.onChange : '' }
			value={this.props.value}
			name={this.props.name}
			label='Level'
		>
			<option value='' disabled></option>
        {this.state.level.map((attr,index)=> {
          return (
              <option key={index} value={attr._id}>{attr.name}</option>
            )
        })}
        	
		</Select>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}
const SelectLevel = connect(mapStateToProps)(Layout)

export default SelectLevel