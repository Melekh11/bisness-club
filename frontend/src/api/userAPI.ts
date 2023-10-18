import { tokenProvider } from "../helpers/tokenProvider"
import { setCounter } from "../store/counterSlice"
import { AppDispatch } from "../store/store"
import { login, logout } from "../store/userSlice"
import { actionAPI } from "./actionAPI"
import { BaseAPI } from "./baseAPI"

type UserData = {
  login: string
  password: string
}

class UserAPI extends BaseAPI {

  login(userData: UserData) {
    return (dispatch: AppDispatch) => {
      return fetch(`${this.prefixUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(this.handleErrors)
      .then(res => {
        dispatch(login(userData.login));
        tokenProvider.token = res.access_token;
        return res;
      })
      .then(() => {
        actionAPI.get_counter().then((res) => {
          dispatch(setCounter(res));
        })
      })
    }
  }

  auth(userData: UserData) {
    return (dispatch: AppDispatch) => {
      return fetch(`${this.prefixUrl}/auth`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(this.handleErrors)
      .then(res => {
        dispatch(login(userData.login));
        tokenProvider.token = res.access_token;
        return res;
      })
    }
  }

  me = () => {
    return fetch(`${this.prefixUrl}/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${tokenProvider.token}`
      }
    }).then(this.handleErrors)
  }

  logout() {
    return (dispatch: AppDispatch) => {
      dispatch(logout());
      dispatch(setCounter(0));
      tokenProvider.clearToken();
    }
  }
  
}



  


export const userAPI = new UserAPI("/user");
