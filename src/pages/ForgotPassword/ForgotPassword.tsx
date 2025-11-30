import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useToast } from '../../contexts/ToastContext';
import { requestPasswordReset } from '../../utils/api';
import * as S from './styled';

const ForgotPasswordPage: React.FC = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccess(true);
      addToast('Email de recuperação enviado!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao solicitar recuperação.';
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Card>
          <S.Title>Recuperar Senha</S.Title>
          <S.Subtitle>
            {success 
              ? 'Verifique seu email para redefinir sua senha.' 
              : 'Digite seu email para receber um link de recuperação.'}
          </S.Subtitle>

          {!success ? (
            <S.Form onSubmit={handleSubmit}>
              <S.Label>
                Email
                <S.Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </S.Label>
              <S.PrimaryButton type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Link'}
              </S.PrimaryButton>
            </S.Form>
          ) : (
            <div style={{ textAlign: 'center', color: '#059669', fontWeight: 500 }}>
              Email enviado com sucesso!
            </div>
          )}

          <S.BackLink to="/login">Voltar para o Login</S.BackLink>
        </S.Card>
      </S.Main>
      <Footer />
    </S.Page>
  );
};

export default ForgotPasswordPage;
