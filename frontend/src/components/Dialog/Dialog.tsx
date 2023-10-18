import { DialogHTMLAttributes, RefObject } from "react";
import { userAPI } from "../../api/userAPI";
import { useAppDispatch } from "../../store/hooks";
import "./dialog.css";

type DialogProps = {
  dialogRef: RefObject<HTMLDialogElement>,
  loginRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
  isAlert: boolean,
  setAlert: (arg0: boolean) => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export default function Dialog({
  dialogRef,
  loginRef,
  passwordRef,
  isAlert,
  setAlert,
}: DialogProps) {

  const dispatch = useAppDispatch();

  const authReq = () => {
    if (loginRef.current && passwordRef.current) {
      userAPI.auth({
        login: loginRef.current.value,
        password: passwordRef.current.value})(dispatch)
      .then(() => {if (dialogRef.current) dialogRef.current.close()})
      .catch(() => {setAlert(true)});
    }
  }

  const logReq = () => {
    if (loginRef.current && passwordRef.current) {
      userAPI.login({
        login: loginRef.current.value,
        password: passwordRef.current.value})(dispatch)
      .then(() => {if (dialogRef.current) dialogRef.current.close()})
      .catch(() => {setAlert(true)});
    }
  }

  return (
    <dialog ref={dialogRef}>
        <input ref={loginRef} placeholder='login'/>
        <input ref={passwordRef} placeholder='password'/>

        <div className="dialog-btn-keeper">
          <button onClick={logReq}>log in</button>
          <button onClick={authReq}>log up</button>
          <button
            onClick={() => {
              if (dialogRef.current) dialogRef.current.close();
            }}
          >close</button>
        </div>
        {isAlert && <span className="dialog-alert">something wrong</span>}
      </dialog>
  )
}
