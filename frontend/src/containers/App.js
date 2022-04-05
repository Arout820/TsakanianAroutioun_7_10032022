import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';
import { useEffect, useState } from 'react';
// import { RequiredAuth } from '-./components';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      console.log('Connecté: ');
      console.log(token);
    } else {
      console.log('Déconnecté');
    }
  }, [token, isConnected]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionPage setIsConnected={setIsConnected} />} />
        <Route
          path="/profil"
          element={token ? <ProfilPage setIsConnected={setIsConnected} /> : <Navigate replace to="/" />}
        />
        <Route path="/wall" element={token ? <WallPage /> : <Navigate replace to="/" />} />
        <Route path="*" element={token ? <ErrorPage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
