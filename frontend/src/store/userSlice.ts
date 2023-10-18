import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { tokenProvider } from '../helpers/tokenKeeper';
import { userAPI } from '../api/userAPI';

type UserSlice = {
  logged: boolean
  login: string
}

let initLogged = !!tokenProvider.token;
let initLogin = tokenProvider.token ? await userAPI.me() : "";

const initialState: UserSlice = {
  logged: initLogged,
  login: initLogin.login
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.logged = true;
      state.login = action.payload
    },
    logout: (state) => {
      state.logged = false;
      state.login = "";
    }
  }
})

export const { login, logout } = userSlice.actions;
export const selectLogin = (state: RootState) => state.user.login;
export const selectLogged = (state: RootState) => state.user.logged;

export default userSlice.reducer;
