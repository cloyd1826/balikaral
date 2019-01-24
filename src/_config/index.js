
let config = ''

if(process.env.NODE_ENV === 'development'){
	config = '40.80.146.226:6000'
}
if(process.env.NODE_ENV === 'production'){
	config = 'https://balikaralapi.eastus.cloudapp.azure.com:5000'
}

export const appId = '521442691675915'
export const clientId = '197880274985-qae1s30vumso0tbr25iaf9lrk89e3tp7.apps.googleusercontent.com'
export default config

