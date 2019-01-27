import React, {Component} from 'react'

import Select from '../../_component/Form/Select'

import apiRequest from '../../_axios'

import { connect } from 'react-redux'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {  
    	subject: []
    }
    this.fetchAll = this.fetchAll.bind(this)
  }
  fetchAll(learningStrand){	
  	apiRequest('get', `/learning-strand-sub/all?learningStrand=${learningStrand}`, false, this.props.token)
  		.then((res)=>{
  			if(res.data){
  				this.setState({
	  				subject: res.data.data
	  			})	
	  		}
  		})
  		.catch((err)=>{
        
  		})
  }
  componentDidMount(){
  	this.fetchAll('')
  }
  componentWillReceiveProps(nextProps){
  	this.setState({
  		subject: []
  	})
    this.fetchAll(nextProps.learningStrand)
  }
  render() { 
    return (
		<Select
			onChange={this.props.onChange ? this.props.onChange : '' }
			value={this.props.value}
			name={this.props.name}
      required={this.props.required}
			label={'Lesson'}
		>
			<option value=''></option>
        {this.state.subject.map((attr,index)=> {
          return (
              <option key={index} value={attr._id}>{attr.lessonName}</option>
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
const SelectSubject = connect(mapStateToProps)(Layout)

export default SelectSubject