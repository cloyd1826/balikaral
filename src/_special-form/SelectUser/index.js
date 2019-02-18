import React, {Component} from 'react'

import Select from '../../_component/Form/Select'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	user: []
    }
		this.fetchAll = this.fetchAll.bind(this)
		this.nameChecker = this.nameChecker.bind(this)
  }
  fetchAll(){	
  	apiRequest('get', `/user/fetch-all?notType=Learner`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				user: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        
  		})
	}
	
	nameChecker(attr) {
		if(attr.method == "local"){
			return attr.personalInformation.firstName + " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName 
		}
		if(attr.method == "facebook"){
			if(attr.personalInformation.firstName){
				return attr.personalInformation.firstName+ " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName
			}else{
				return attr.facebook.email
			}
		}
		if(attr.method == "google"){
			if(attr.personalInformation.firstName){
				return attr.personalInformation.firstName+ " " + attr.personalInformation.middleName + " " + attr.personalInformation.lastName
			}else{
				return attr.google.email
			}
		}
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
			label={this.props.label}
      		required={this.props.required}
      
		>
			<option value=''></option>
        {this.state.user.map((attr,index)=> {
          return (
							<option key={index} value={attr._id}>
									{this.nameChecker(attr)}
              </option>
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