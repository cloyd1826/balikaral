
let config = ''

if(process.env.NODE_ENV === 'development'){
	config = 'http://13.90.43.83:5000/api'
}
if(process.env.NODE_ENV === 'production'){
	config = 'http://127.0.0.1:5000/api'
}

export const appId = '521442691675915'
export const clientId = '197880274985-qae1s30vumso0tbr25iaf9lrk89e3tp7.apps.googleusercontent.com'
export default config

//
//
