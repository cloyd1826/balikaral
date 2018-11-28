
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CREDENTIALS': 
      return {
            id: action.data.id,
            email: action.data.email,
            token: action.data.token
        }
    case 'LOG_OUT_USER': 
      return {
        id: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        token: ''
      }
    default: 
      return state
  }
}
export default userReducer