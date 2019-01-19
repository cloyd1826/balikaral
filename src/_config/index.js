
let config = ''

// if(process.env.NODE_ENV === 'development'){
// 	config = 'http://localhost:5000'
// }

if(process.env.NODE_ENV === 'development'){
	config = 'https://balikaralapi.eastus.cloudapp.azure.com:5000'
}

if(process.env.NODE_ENV === 'production'){
	config = 'https://balikaralapi.eastus.cloudapp.azure.com:5000'
}

export default config