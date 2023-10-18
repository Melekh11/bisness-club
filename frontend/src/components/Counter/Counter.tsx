import { actionAPI } from "../../api/actionAPI";
import { selectCount } from "../../store/counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLogged, selectLogin } from "../../store/userSlice";
import "./counter.css";

export default function Counter() {

  const count = useAppSelector(selectCount);
  const logged = useAppSelector(selectLogged);
  const login = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  
  return (
    <div className="page-container">

        {logged && <p>{login}, your counter is {count}</p>}
        {!logged && <p>log in first</p>}

        <div className="button-keeper">

          <button
            disabled={!logged}
            onClick={() => {actionAPI.increment()(dispatch)}}
          >+</button>

          <button
            disabled={!logged}
            onClick={() => {actionAPI.decrement()(dispatch)}}
          >-</button>
        </div>
      </div>
  )
}
