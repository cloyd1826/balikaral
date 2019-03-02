
let config = ''

if(process.env.NODE_ENV === 'development'){
	config = 'https://balikaral.com/api'
}
if(process.env.NODE_ENV === 'production'){
	config = 'https://balikaral.com/api'
}

export const appId = '521442691675915'
export const clientId = '197880274985-qae1s30vumso0tbr25iaf9lrk89e3tp7.apps.googleusercontent.com'
export default config

//
//
