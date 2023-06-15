import React, {FC, useState, useContext} from 'react';
import {Context} from "../index"
import { observer } from 'mobx-react-lite';
import './Login.css';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

  return (
    <div>
        <div className="login">
          <h1>Авторизация</h1>
          <input onChange={e=> setEmail(e.target.value)} value={email} type='text' placeholder='Email'/>
        <input onChange={e=> setPassword(e.target.value)} value={password} type='password' placeholder='Пароль'/>
                <button onClick={()=> store.login(email, password)} className="btn btn-primary btn-block btn-large">Войти</button>
                <button onClick={()=> store.registration(email, password)} className="btn btn-primary btn-block btn-large">Регестрация</button>
        </div>
    </div>
  );
}

export default observer(LoginForm);