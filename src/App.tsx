import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GeneratorPage from './pages/GeneratorPage';
import ProfilePage from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<div className="p-12 text-center text-2xl">Demo page coming soon.</div>} />
            <Route path="*" element={<div className="p-12 text-center text-2xl">404 - Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;