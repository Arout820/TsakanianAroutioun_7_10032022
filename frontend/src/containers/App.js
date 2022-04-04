import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ConnectionPage from '../pages/ConnectionPage';
import ProfilPage from '../pages/ProfilPage';
import WallPage from '../pages/WallPage';
import ErrorPage from '../pages/ErrorPage';
// import { RequiredAuth } from '-./components';

function App() {
 
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ConnectionPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/wall" element={<WallPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
  );
}

export default App;
