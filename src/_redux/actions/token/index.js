let userDefault = {
	id: '',
	email: '',
	firstName: '',
	middleName: '',
	lastName: '',
	token: ''
}

export const logInUser = (data) => {
	return {
		type: 'LOG_IN_USER',
		data
	}
}

export const logOutUser = (data) => {
	return {
		type: 'LOG_OUT_USER',
		data
	}
}
