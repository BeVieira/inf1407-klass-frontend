import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { changePassword } from '../../utils/api';
import * as S from './styled';

const UserProfile: React.FC = () => {
  const { user, accessToken, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      addToast('As novas senhas não coincidem.', 'error');
      return;
    }

    if (passwords.newPassword.length < 6) {
      addToast('A nova senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }

    if (!accessToken) return;

    setLoading(true);
    try {
      await changePassword(accessToken, {
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
      });
      addToast('Senha alterada com sucesso!', 'success');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao alterar senha.';
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
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
    <S.Page>
      <Header />
      <S.Main>
        <S.HeaderSection>
          <S.Title>Meu Perfil</S.Title>
          <S.Subtitle>Gerencie suas informações e segurança da conta</S.Subtitle>
        </S.HeaderSection>

        <S.ContentGrid>
          <S.Card>
            <S.SectionHeader>
              <User size={24} color="#2563eb" />
              <S.SectionTitle>Dados Pessoais</S.SectionTitle>
            </S.SectionHeader>
            <S.InfoList>
              <S.InfoItem>
                <S.Label>Nome de Usuário</S.Label>
                <S.Value>{user.username}</S.Value>
              </S.InfoItem>
              <S.InfoItem>
                <S.Label>Email</S.Label>
                <S.Value>{user.email}</S.Value>
              </S.InfoItem>
              <S.InfoItem>
                <S.Label>Matrícula</S.Label>
                <S.Value>{user.registration}</S.Value>
              </S.InfoItem>
              <S.InfoItem>
                <S.Label>Tipo de Conta</S.Label>
                <S.Value>{getRoleLabel(user.role)}</S.Value>
              </S.InfoItem>
            </S.InfoList>
          </S.Card>

          <S.Card>
            <S.SectionHeader>
              <Lock size={24} color="#2563eb" />
              <S.SectionTitle>Segurança</S.SectionTitle>
            </S.SectionHeader>
            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.InputLabel>Senha Atual</S.InputLabel>
                <S.Input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                  placeholder="Digite sua senha atual"
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.InputLabel>Nova Senha</S.InputLabel>
                <S.Input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo de 6 caracteres"
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.InputLabel>Confirmar Nova Senha</S.InputLabel>
                <S.Input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirme a nova senha"
                />
              </S.FormGroup>
              <S.Button type="submit" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </S.Button>
            </S.Form>
          </S.Card>
        </S.ContentGrid>
      </S.Main>
    </S.Page>
  );
};

export default UserProfile;
