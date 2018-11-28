import axios from 'axios'

const apiRequest = (method, url, data, header) => {
	let call = {
			method: method,
			url: `http://localhost:5000/balikaral${url}`,
		}
		if(header) {
			let headers = { Authorization: header }
			call = {...call, headers}
		}
		if(data){
			call = {...call, data: data}
		}
		console.log(call)
	return axios (call)
}


export default apiRequest