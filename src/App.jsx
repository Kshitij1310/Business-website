import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toast from './components/Toast';
import HashNavigation from './utils/HashNavigation';
import Home from './pages/Home';
import QuotePage from './pages/QuotePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <HashNavigation />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
