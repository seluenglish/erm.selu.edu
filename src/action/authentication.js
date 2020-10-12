import { IS_AUTHENTICATED } from './types'

export const isAuthenticated=()=>{
  return (dispatch)=>{
    return fetch('/isLoggedIn').then((response => response.json())).then(result => {
      // console.log('what?')
      // this.setState({
      //   username:result.passport.user
      // });
      // if(this.state.username){
      //   this.setState({isAuthenticated:true})
      // }
      // console.log(this.state.isAuthenticated)
      // console.log('---------inside redux')
      // console.log(result)
      // dispatch({
      //   type:IS_AUTHENTICATED,
      //   payload:result.passport
      // })
    })
  }
}
