import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import * as S from './styled';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrar com backend para criar conta
    console.log({ username, email, registration, password, confirmPassword });
  };

  return (
    <S.Page>
      <Header />

      <S.Main>
        <S.Card>
          <S.Title>Crie sua conta</S.Title>
          <S.Subtitle>
            Preencha os campos abaixo para se cadastrar e acessar suas turmas e disciplinas.
          </S.Subtitle>

          <S.InfoBox>
            Informe sua matrícula conforme o padrão do sistema: 7 dígitos para alunos e 5 dígitos
            para professores/admins (começando com 0 para admins).
          </S.InfoBox>

          <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor="username">
              Usuário
              <S.Input
                id="username"
                name="username"
                type="text"
                placeholder="seu.usuario"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </S.Label>

            <S.Label htmlFor="email">
              E-mail institucional
              <S.Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </S.Label>

            <S.Label htmlFor="registration">
              Matrícula
              <S.Input
                id="registration"
                name="registration"
                type="text"
                placeholder="Ex.: 1234567"
                value={registration}
                onChange={(event) => setRegistration(event.target.value)}
                required
              />
              <S.HelperText>Use apenas números, sem pontos ou traços.</S.HelperText>
            </S.Label>

            <S.PasswordRow>
              <S.Label htmlFor="password">
                Senha
                <S.Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </S.Label>

              <S.Label htmlFor="confirmPassword">
                Confirmar senha
                <S.Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </S.Label>
            </S.PasswordRow>

            <S.PrimaryButton type="submit">Cadastrar</S.PrimaryButton>
          </S.Form>

          <S.SwitchAction>
            Já possui conta?
            <S.SwitchLink to="/login">Acesse sua conta</S.SwitchLink>
          </S.SwitchAction>
        </S.Card>
      </S.Main>

      <Footer />
    </S.Page>
  );
};

export default RegisterPage;
