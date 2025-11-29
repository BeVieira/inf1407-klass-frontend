import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './styled';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student': return '/dashboard/estudante';
      case 'professor': return '/dashboard/professor';
      case 'admin': return '/dashboard/admin';
      default: return '/';
    }
  };

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <CalendarClock size={28} />
        <span>Klass</span>
      </S.Logo>
      <S.Nav>
        <S.NavLink to="/">Início</S.NavLink>
        <S.NavAnchor href="#disciplinas">Disciplinas</S.NavAnchor>
        <S.NavAnchor href="#como-funciona">Como funciona</S.NavAnchor>
        
        {isAuthenticated && user ? (
          <>
            <S.NavLink to={getDashboardLink()}>Dashboard</S.NavLink>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <User size={16} />
                {user.username}
              </span>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem'
                }}
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          </>
        ) : (
          <S.LoginButton to="/login">Login</S.LoginButton>
        )}
      </S.Nav>
    </S.HeaderContainer>
  );
};

export default Header;
