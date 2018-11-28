
const defaultCredentials = {
    user: {
      id: '',
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
    },
    token: '',
    isLoggedIn: false
}

const userReducer = (state = defaultCredentials, action) => {
  if(action.type === 'LOG_IN_USER'){
      let user = {
        id: action.data.user.id,
        email: action.data.user.email,
        firstName: action.data.user.firstName,
        middleName: action.data.user.middleName,
        lastName: action.data.user.lastName,
      }
      let token = action.data.token
      let isLoggedIn = true
      return state = { ...state, user, token, isLoggedIn }
  }else if(action.type === 'LOG_OUT_USER'){
    let user = {
      id: '',
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
    }
    let token = ''
    let isLoggedIn = false
    return state = { ...state, user, token, isLoggedIn}
  }else{
    return state
  }
}

export default userReducer