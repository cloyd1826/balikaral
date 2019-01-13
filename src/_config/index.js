
let config = ''

// if(process.env.NODE_ENV === 'development'){
// 	config = 'http://localhost:5000'
// }

if(process.env.NODE_ENV === 'development'){
	config = 'http://localhost:5000'
}

if(process.env.NODE_ENV === 'production'){
	config = 'http://40.80.146.226:5000'
}

export default config