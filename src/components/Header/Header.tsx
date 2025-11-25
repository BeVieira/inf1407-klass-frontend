import React from 'react';
import { CalendarClock } from 'lucide-react';
import * as S from './styled';

const Header: React.FC = () => {
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
        <S.LoginButton to="/login">Login</S.LoginButton>
      </S.Nav>
    </S.HeaderContainer>
  );
};

export default Header;
