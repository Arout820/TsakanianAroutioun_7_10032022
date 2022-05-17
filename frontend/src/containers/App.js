import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const auth = JSON.parse(localStorage.getItem('auth'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionPage setIsConnected={setIsConnected} />} />
        <Route path="/profil" element={auth ? <ProfilPage /> : <Navigate replace to="/" />} />
        <Route path="/wall" element={auth ? <WallPage /> : <Navigate replace to="/" />} />
        <Route path="*" element={auth ? <ErrorPage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
