import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../app/features/user/userSlice';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  let userId;
  let token;
  if (userConnectionInfos) {
    userId = userConnectionInfos.userId;
    token = userConnectionInfos.token;
  }

  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId && token) {
      dispatch(getUser(userId, token));
    }
  }, []);

  useEffect(() => {
    console.log(user);
    if (user[0]) {
      console.log('---user from redux---');
      console.log(user[0]);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionPage setIsConnected={setIsConnected} />} />
        <Route path="/profil" element={userConnectionInfos ? <ProfilPage /> : <Navigate replace to="/" />} />
        <Route path="/wall" element={userConnectionInfos ? <WallPage /> : <Navigate replace to="/" />} />
        <Route path="*" element={userConnectionInfos ? <ErrorPage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
