import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import App from './App'

class BalikAral extends Component {
	render() {
	    return (
	      <div>
	       	<HashRouter>
	       		<App />
	       	</HashRouter>
	      </div>
	    );
	  }
}


ReactDOM.render(<BalikAral />, document.getElementById('root'));
serviceWorker.unregister();
