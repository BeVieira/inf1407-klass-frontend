import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as S from "./styled";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrar com backend de autenticação
    console.log({ login, password });
  };

  return (
    <S.Page>
      <Header />

      <S.Main>
        <S.Card>
          <S.Title>Entrar no sistema</S.Title>
          <S.Subtitle>
            Faça login para acessar suas disciplinas e turmas.
          </S.Subtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor="login">
              Login ou e-mail
              <S.Input
                id="login"
                name="login"
                type="text"
                placeholder="seu.usuario@exemplo.com"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                required
              />
            </S.Label>

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

            <S.Actions>
              <div />
              <S.ForgotPassword to="/forgot-password">
                Esqueci minha senha
              </S.ForgotPassword>
            </S.Actions>

            <S.PrimaryButton type="submit">Entrar</S.PrimaryButton>
          </S.Form>

          <S.Divider>ou</S.Divider>

          <S.SecondaryButton to="/register">
            Cadastrar nova conta
          </S.SecondaryButton>
        </S.Card>
      </S.Main>

      <Footer />
    </S.Page>
  );
};

export default LoginPage;
