// **  Initial State
const initialState = {
  isAuthenticated: false,
  userData: null,
  registeredUser: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":        
        return {
          ...state,
          isAuthenticated: true,
          userData: action.userData
        }
      case "LOGOUT":
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');  
        return {
          ...initialState,
          isAuthenticated: false,
          userData: null
        }
      case 'REGISTER':
        return { ...state, registeredUser: action.payload }  
      default:
        return state
    }
}

export default authReducer
  