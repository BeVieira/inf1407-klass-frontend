import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Future routes like /login, /disciplinas/:id can be added here */}
        <Route path="/login" element={<div style={{ padding: '2rem', textAlign: 'center' }}>Página de Login (Em breve)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
