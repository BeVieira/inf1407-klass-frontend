import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { registerUser } from "../../services/userService";
import { useToast } from "../../contexts/ToastContext";
import * as S from "./styled";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      addToast("As senhas não conferem.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser({ username, email, registration, password });
      addToast("Conta criada com sucesso! Faça login para continuar.", "success");
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao criar conta.";
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
          <S.Title>Crie sua conta</S.Title>
          <S.Subtitle>
            Preencha os campos abaixo para se cadastrar e acessar suas turmas e
            disciplinas.
          </S.Subtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Label htmlFor="username">
              Usuário
              <S.Input
                id="username"
                name="username"
                type="text"
                placeholder="seu.nome"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </S.Label>

            <S.Label htmlFor="email">
              E-mail
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
                maxLength={7}
                value={registration}
                onChange={(event) => setRegistration(event.target.value)}
                required
              />
              <S.HelperText>
                Use apenas números, sem pontos ou traços.
              </S.HelperText>
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

            <S.PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </S.PrimaryButton>
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
