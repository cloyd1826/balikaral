
const defaultCredentials = {
    user: {
      id: '',
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      image: '',
    },
    token: '',
    isLoggedIn: false,
    role: '',
    hadPreTest: false,
    level: '',
    type: '',
}

const userReducer = (state = defaultCredentials, action) => {
  if(action.type === 'LOG_IN_USER'){
      let user = {
        id: action.data.user.id,
        email: action.data.user.email,
        firstName: action.data.user.firstName,
        middleName: action.data.user.middleName,
        lastName: action.data.user.lastName,
        image: action.data.user.image,
      }
      let token = action.data.token
      let isLoggedIn = true
      let role = action.data.role
      let hadPreTest = action.data.hadPreTest
      let level = action.data.level
      let type = action.data.type
      return state = { ...state, user, token, isLoggedIn, role, hadPreTest, level, type }
  }else if(action.type === 'LOG_OUT_USER'){
    let user = {
      id: '',
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      image: ''
    }
    let token = ''
    let isLoggedIn = false
    let role = ''
    let hadPreTest = false
    let level = ''
    let type = ''
    return state = { ...state, user, token, isLoggedIn, role, hadPreTest, level, type }
  }else{
    return state
  }
}

export default userReducer