import React , { Component } from 'react'
import './_styles/main.css' 
import './_line-awesome/css/line-awesome.css' 
import './_line-awesome/css/line-awesome-font-awesome.css' 

import Routes from './Routes'

class App extends Component {
	render() {
		console.log(process.env.REACT_APP_APP_ID)
	    return (
	      <div >
   			<Routes />
	      </div>
	    );
	  }
} 

export default App
