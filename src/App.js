import React , { Component } from 'react'
import './Styles/main.css' 

import Routes from './Routes'

import { withRouter } from 'react-router-dom'
 
class Layout extends Component {
	render() {
	    return (
	      <div >
   			<Routes />
	      </div>
	    );
	  }
}
const App = withRouter(Layout)
export default App
