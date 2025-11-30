import React, { useState } from 'react';
import * as S from './styled';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: { code: string; name: string; description: string }) => Promise<void>;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ code: code.trim(), name: name.trim(), description: description.trim() });
      setCode('');
      setName('');
      setDescription('');
      onClose();
    } catch {
      // Error handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Criar Novo Curso</S.Title>
          <S.CloseButton onClick={handleClose} type="button">
            ✕
          </S.CloseButton>
        </S.Header>
        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="code">Código do Curso</S.Label>
            <S.Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: INF1407"
              required
              maxLength={20}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="name">Nome do Curso</S.Label>
            <S.Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Programação Web"
              required
              maxLength={100}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="description">Descrição</S.Label>
            <S.TextArea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o conteúdo e objetivos do curso..."
              required
              rows={4}
              maxLength={500}
            />
          </S.FormGroup>

          <S.Actions>
            <S.Button type="button" $variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </S.Button>
            <S.Button type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar Curso'}
            </S.Button>
          </S.Actions>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

export default CreateCourseModal;
