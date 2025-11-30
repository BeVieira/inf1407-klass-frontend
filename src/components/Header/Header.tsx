import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './styled';
import { useState } from 'react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student': return '/dashboard/estudante';
      case 'teacher': return '/dashboard/professor';
      case 'admin': return '/dashboard/admin';
      default: return '/';
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <CalendarClock size={28} />
        <span>Klass</span>
      </S.Logo>

      {/* Desktop Nav */}
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

      {/* Mobile Menu Button */}
      <S.MobileMenuButton onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </S.MobileMenuButton>

      {/* Mobile Menu */}
      <S.MobileMenu $isOpen={isMenuOpen}>
        <S.MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Início</S.MobileNavLink>
        <S.MobileNavAnchor href="#disciplinas" onClick={() => setIsMenuOpen(false)}>Disciplinas</S.MobileNavAnchor>
        <S.MobileNavAnchor href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como funciona</S.MobileNavAnchor>
        
        {isAuthenticated && user ? (
          <>
            <S.MobileNavLink to={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>Dashboard</S.MobileNavLink>
            <div style={{ padding: '0.5rem', borderTop: '1px solid #f3f4f6', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                <User size={16} />
                {user.username}
              </div>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.5rem 0',
                  fontSize: '0.875rem'
                }}
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </>
        ) : (
          <S.LoginButton to="/login" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center' }}>Login</S.LoginButton>
        )}
      </S.MobileMenu>
    </S.HeaderContainer>
  );
};

export default Header;
