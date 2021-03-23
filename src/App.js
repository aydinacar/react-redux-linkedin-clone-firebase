import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import './App.css';
import Feed from './components/feed/Feed';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Widgets from './components/widgets/Widgets';
import {selectUser, login, logout} from "./features/user/userSlice";
import { auth } from './firebase';
import Login from './pages/login/Login';
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
      auth.onAuthStateChanged(userAuth => {
        if(userAuth) {
          dispatch(login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          }))
        } else {
          dispatch(logout())
        }
      })
    
  }, [])
  
  return (
    <div className="app">
      {user ?<Header /> : null}
      {!user ? (<Login />) : (
        <div className="app_body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
