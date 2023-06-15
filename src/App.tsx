import React, {FC, useState, useContext, useEffect} from 'react';
import './app.css';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  }, [])
   
  async function getUsers() {
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data);
  } catch(e){
      console.log(e);
  }
  }

  if(store.isLoading){ 
    return( <div className="loader-pencil-content">
    <div className="btn">
      <svg id="loader-pencil" xmlns="http://www.w3.org/2000/svg" width="667" height="182" viewBox="0 0 677.34762 182.15429">
        <g>
          <path id="body-pencil" d="M128.273 0l-3.9 2.77L0 91.078l128.273 91.076 549.075-.006V.008L128.273 0zm20.852 30l498.223.006V152.15l-498.223.007V30zm-25 9.74v102.678l-49.033-34.813-.578-32.64 49.61-35.225z">
          </path>
          <path id="line" d="M134.482 157.147v25l518.57.008.002-25-518.572-.008z">
          </path>
        </g>
      </svg>
    </div>
  </div>
  ); }  

  if(!store.isAuth){
      return(
        <LoginForm/> 
      )
  }

  return (
    <div className="login2">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`: 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h1>{store.user.isActivated ? `Акаунт подтвержден по почте`: 'Подтвердите акаунт!'}</h1>
      <button onClick={()=> store.logout()} className="butn butn-primary butn-block butn-large">Выйти</button>
      <div>
        <button onClick={getUsers} className="butn butn-primary butn-block butn-large">Получить пользователей</button>
      </div>
      
      {users.map(user=>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);
