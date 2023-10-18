import { tokenProvider } from "../helpers/tokenProvider";
import { increment as incrementAction, decrement as decrementAction } from "../store/counterSlice";
import { AppDispatch } from "../store/store";
import { BaseAPI } from "./baseAPI";

class ActionAPI extends BaseAPI {

  increment() {
    return (dispatch: AppDispatch) => {
      fetch(`${this.prefixUrl}/increment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Accept': 'application/json',
          "Authorization": `Bearer ${tokenProvider.token}`
        }
      })
      .then(this.handleErrors)
      .then(this.updateAction);
      dispatch(incrementAction());
    }
  }

  decrement() {
    return (dispatch: AppDispatch) => {
      fetch(`${this.prefixUrl}/decrement`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Accept': 'application/json',
          "Authorization": `Bearer ${tokenProvider.token}`
        }
      })
      .then(this.handleErrors)
      .then(this.updateAction);
      dispatch(decrementAction());
    }
  }

  updateAction = () => {
    fetch(`${this.prefixUrl}/new_action`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${tokenProvider.token}`
      }
    }).then(this.handleErrors);
  }

  get_counter = () => {
    return fetch(`${this.prefixUrl}/counter`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${tokenProvider.token}`
      }
    })
    .then(this.handleErrors);
  }
}

export const actionAPI = new ActionAPI("/action");
