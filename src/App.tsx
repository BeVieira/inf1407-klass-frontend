import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard/ProfessorDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/estudante" element={<StudentDashboard />} />
            <Route path="/dashboard/professor" element={<ProfessorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPasswordPage />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
