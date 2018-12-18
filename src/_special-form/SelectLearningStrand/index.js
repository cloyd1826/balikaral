import React, {Component} from 'react'

import Select from '../../_component/Form/Select'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	learningStrand: []
    }
    this.fetchAll = this.fetchAll.bind(this)
  }
  fetchAll(){	
  	apiRequest('get', '/learning-strand/all', false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				learningStrand: res.data.data
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
      required={this.props.required}
			label='Learning Strand'
		>
			<option value=''></option>
        {this.state.learningStrand.map((attr,index)=> {
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
const SelectLearningStrand = connect(mapStateToProps)(Layout)

export default SelectLearningStrand