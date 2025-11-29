import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import * as S from "./styled";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { addToast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirect =
        user.role === "student"
          ? "/dashboard/estudante"
          : user.role === "professor"
          ? "/dashboard/professor"
          : "/dashboard/admin";
      navigate(redirect);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await login(username, password);
      addToast("Login realizado com sucesso!", "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao autenticar.";
      addToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Page>
      <Header />

      <S.Main>
        <S.Card>
          <S.Title>Bem-vindo de volta</S.Title>
          <S.Subtitle>Acesse sua conta para continuar</S.Subtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor="username">
              Usuário ou matrícula
              <S.Input
                id="username"
                name="username"
                type="text"
                placeholder="seu_usuario"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
              <S.ForgotPassword to="#">Esqueceu a senha?</S.ForgotPassword>
            </S.Actions>

            <S.PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </S.PrimaryButton>
          </S.Form>

          <S.Divider>
            <span>ou</span>
          </S.Divider>

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
