import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const authInfos = JSON.parse(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectionPage setIsConnected={setIsConnected} />} />
        <Route
          path="/profil"
          element={authInfos ? <ProfilPage setIsConnected={setIsConnected} /> : <Navigate replace to="/" />}
        />
        <Route path="/wall" element={authInfos ? <WallPage /> : <Navigate replace to="/" />} />
        <Route path="*" element={authInfos ? <ErrorPage /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
