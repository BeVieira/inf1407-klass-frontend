import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useToast } from '../../contexts/ToastContext';
import { confirmPasswordReset } from '../../utils/api';
import * as S from './styled';

const ResetPasswordPage: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      addToast('As senhas não coincidem.', 'error');
      return;
    }

    if (!uid || !token) {
      addToast('Link de recuperação inválido.', 'error');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset({
        uidb64: uid,
        token: token,
        new_password: newPassword,
      });
      addToast('Senha redefinida com sucesso!', 'success');
      navigate('/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao redefinir senha.';
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
          <S.Title>Redefinir Senha</S.Title>
          <S.Subtitle>Crie uma nova senha para sua conta.</S.Subtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.Label>
              Nova Senha
              <S.Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Mínimo de 6 caracteres"
              />
            </S.Label>
            <S.Label>
              Confirmar Nova Senha
              <S.Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirme a nova senha"
              />
            </S.Label>
            <S.PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </S.PrimaryButton>
          </S.Form>
        </S.Card>
      </S.Main>
      <Footer />
    </S.Page>
  );
};

export default ResetPasswordPage;
