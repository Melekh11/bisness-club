import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectLogged } from './store/userSlice';
import { useRef, useState } from 'react';
import { userAPI } from './api/userAPI';
import Dialog from './components/Dialog/Dialog';
import Counter from './components/Counter/Counter';
import "./App.css";



function App() {

  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)

  const [isAuthAlert, setAuthAlert] = useState<boolean>(false);

  const LoginButton = () => (
    <button
      className="login-btn"
      onClick={() => {
        if (logged) userAPI.logout()(dispatch);
        else if (dialogRef.current) dialogRef.current.showModal();
      }}
    >{logged ? "logout" : "login"}</button>
  )

  return (
    <>
      {!logged && <span className="top-alert">log in to be able to click</span>}

      <Dialog
        dialogRef={dialogRef}
        loginRef={loginRef}
        passwordRef={passwordRef}
        isAlert={isAuthAlert}
        setAlert={setAuthAlert}
      />

      <LoginButton/>

      <Counter/>
    </>
  )
}

export default App;
