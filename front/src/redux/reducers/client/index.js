// **  Initial State
const initialState = {
    clients: [],
    updatedClient: false,
    createdClient: false
}
  
const clientReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CLIENTS':
        return { ...state, clients: action.clients }
      case 'UPDATE_CLIENT':
        return { ...state, updatedClient: action.payload } 
      case 'CREATE_CLIENT':
        return { ...state, createdClient: action.payload } 
      default:
        return state
    }
}

export default clientReducer
  