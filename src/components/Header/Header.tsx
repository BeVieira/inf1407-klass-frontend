import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, LogOut, Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './styled';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
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
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Estudante';
      case 'teacher': return 'Professor';
      case 'admin': return 'Administrador';
      default: return role;
    }
  };

  return (
    <S.HeaderContainer>
      <S.Logo to={isAuthenticated ? getDashboardLink() : "/"}>
        <CalendarClock size={28} />
        <span>Klass</span>
      </S.Logo>

      {/* Desktop Nav */}
      <S.Nav>
        {!isAuthenticated ? (
          <>
            <S.NavLink to="/">Início</S.NavLink>
            <S.NavAnchor href="#disciplinas">Disciplinas</S.NavAnchor>
            <S.NavAnchor href="#como-funciona">Como funciona</S.NavAnchor>
            <S.LoginButton to="/login">Login</S.LoginButton>
          </>
        ) : (
          user && (
            <S.UserMenuContainer ref={userMenuRef}>
              <S.UserTrigger onClick={toggleUserMenu}>
                <S.UserAvatar>
                  {getInitials(user.username)}
                </S.UserAvatar>
                <S.UserInfo>
                  <S.UserName>{user.username}</S.UserName>
                  <S.UserRole>{getRoleLabel(user.role)}</S.UserRole>
                </S.UserInfo>
                <ChevronDown size={16} color="#6b7280" />
              </S.UserTrigger>

              <S.UserDropdown $isOpen={isUserMenuOpen}>
                <S.DropdownItem onClick={() => { navigate('/perfil'); setIsUserMenuOpen(false); }}>
                  <User size={16} />
                  Meu Perfil
                </S.DropdownItem>
                <S.DropdownItem onClick={handleLogout} className="danger">
                  <LogOut size={16} />
                  Sair
                </S.DropdownItem>
              </S.UserDropdown>
            </S.UserMenuContainer>
          )
        )}
      </S.Nav>

      {/* Mobile Menu Button */}
      <S.MobileMenuButton onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </S.MobileMenuButton>

      {/* Mobile Menu */}
      <S.MobileMenu $isOpen={isMenuOpen}>
        {!isAuthenticated ? (
          <>
            <S.MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Início</S.MobileNavLink>
            <S.MobileNavAnchor href="#disciplinas" onClick={() => setIsMenuOpen(false)}>Disciplinas</S.MobileNavAnchor>
            <S.MobileNavAnchor href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como funciona</S.MobileNavAnchor>
            <S.LoginButton to="/login" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center' }}>Login</S.LoginButton>
          </>
        ) : (
          user && (
            <div style={{ padding: '0.5rem', borderTop: '1px solid #f3f4f6', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0.5rem' }}>
                <S.UserAvatar>
                  {getInitials(user.username)}
                </S.UserAvatar>
                <S.UserInfo>
                  <S.UserName>{user.username}</S.UserName>
                  <S.UserRole>{getRoleLabel(user.role)}</S.UserRole>
                </S.UserInfo>
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
                  padding: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )
        )}
      </S.MobileMenu>
    </S.HeaderContainer>
  );
};

export default Header;
