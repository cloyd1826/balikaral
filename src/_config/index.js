
let config = ''

if(process.env.NODE_ENV === 'development'){
	config = 'http://localhost:5000'
}

if(process.env.NODE_ENV === 'production'){
	config = 'http://api-config.com'
}

export default config