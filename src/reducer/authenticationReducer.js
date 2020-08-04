let authentication={
  isAuthenticated:false,
  username:null,
}

export const isAuth =(state=authentication, action)=> {
  // switch (action.type) {
  //   case 'IS_AUTHENTICATED':
  //     state = {
  //       ...state,
  //       username: action.payload.user,
  //     }
  //     if (state.username) {
  //       state = {
  //         ...state,
  //         isAuthenticated: true,
  //       }
  //     }
  //     return null
  //   case 'AUTHENTICATED':
  //     state = {
  //       ...state,
  //       username: action.payload.user,
  //     }
  //     return state
  //
  //       //   case 'Not ':
  //       //     state={
  //       //       ...state,
  //       //       username: action.payload.user
  //       //     }
  //       //     if(state.username){
  //       //       state={
  //       //         ...state,
  //       //         isAuthenticated: true
  //       //       }
  //       //
  //       //       return state
  //       //
  //       // default :
  //       //   return state
  //       //   }
  //     }

  return null
}


