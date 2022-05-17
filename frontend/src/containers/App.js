import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';

import { StoreContext } from '../providers/Store';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  // const authInfos = JSON.parse(localStorage.getItem('token'));

  const value = useContext(StoreContext);
  useEffect(() => {
    console.log('value');
    console.log(value[0]);
  }, [value]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionPage setIsConnected={setIsConnected} />} />
        <Route path="/profil" element={value.login ? <ProfilPage /> : <Navigate replace to="/" />} />
        <Route path="/wall" element={value.login ? <WallPage /> : <Navigate replace to="/" />} />
        <Route path="*" element={value.login ? <ErrorPage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
