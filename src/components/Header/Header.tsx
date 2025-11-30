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

      {/* Desktop Nav - Only for unauthenticated users */}
      {!isAuthenticated && (
        <S.Nav>
          <S.NavLink to="/">Início</S.NavLink>
          <S.NavAnchor href="#disciplinas">Disciplinas</S.NavAnchor>
          <S.NavAnchor href="#como-funciona">Como funciona</S.NavAnchor>
          <S.LoginButton to="/login">Login</S.LoginButton>
        </S.Nav>
      )}

      {/* User Menu - Visible on all devices when authenticated */}
      {isAuthenticated && user && (
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
      )}

      {/* Mobile Menu Button - Only for unauthenticated users */}
      {!isAuthenticated && (
        <S.MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </S.MobileMenuButton>
      )}

      {/* Mobile Menu - Only for unauthenticated users */}
      <S.MobileMenu $isOpen={isMenuOpen && !isAuthenticated}>
        <S.MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Início</S.MobileNavLink>
        <S.MobileNavAnchor href="#disciplinas" onClick={() => setIsMenuOpen(false)}>Disciplinas</S.MobileNavAnchor>
        <S.MobileNavAnchor href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como funciona</S.MobileNavAnchor>
        <S.LoginButton to="/login" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center' }}>Login</S.LoginButton>
      </S.MobileMenu>
    </S.HeaderContainer>
  );
};

export default Header;
