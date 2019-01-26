
let config = ''

if(process.env.NODE_ENV === 'development'){
	config = 'http://localhost:5000'
}
if(process.env.NODE_ENV === 'production'){
	config = 'https://balikaralapi.eastus.cloudapp.azure.com:5000'
}

export const appId = '344679316117018'
export const clientId = '293000110428-lm6klam4patr7ojnk0e9md79gkip32jd.apps.googleusercontent.com'
export default config

//521442691675915
//197880274985-qae1s30vumso0tbr25iaf9lrk89e3tp7.apps.googleusercontent.com