
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar'
import Statis from './pages/Statis';
import Membres from './pages/Membres';

function App() {
  
  return (
    <div className='app'>
    <Router>
        
      <Sidebar />
      <Routes>
        <Route path="/gym-dashboard" element={<Home />} />
        <Route path="/statistiques" element={<Statis />} />
        <Route path="/membres" element={<Membres />} />
      </Routes>
    </Router>  
    </div>
  );
}

export default App;
