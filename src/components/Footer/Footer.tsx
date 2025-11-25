import React from 'react';
import * as S from './styled';

const Footer: React.FC = () => {
  return (
    <S.FooterContainer>
      <S.Text>&copy; {new Date().getFullYear()} Klass. Todos os direitos reservados.</S.Text>
      <S.Text>Projeto acadêmico para a disciplina de Programação para Web.</S.Text>
    </S.FooterContainer>
  );
};

export default Footer;
