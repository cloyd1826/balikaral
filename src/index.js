import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'


import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import App from './App'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import userReducer from './_redux/reducers/user'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

class BalikAral extends Component {
	render() {
	    return (
	    	<Provider store={store}>
		       <PersistGate loading={null} persistor={persistor}>
		       	<BrowserRouter>
		       		<App />
		       	</BrowserRouter>
		      </PersistGate>
	      	</Provider>
	    );
	  }
}


ReactDOM.render(<BalikAral />, document.getElementById('root'));
serviceWorker.unregister();
