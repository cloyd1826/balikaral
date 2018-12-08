import axios from 'axios'


import config from '../_config'

const apiRequest = (method, url, data, header) => {
	let call = {
			method: method,
			url: `${config}/balikaral${url}`,
		}
		if(header) {
			let headers = { Authorization: header }
			call = {...call, headers}
		}
		if(data){
			call = {...call, data: data}
		}
		
	return axios (call)
}


export default apiRequest