import React, { useState } from 'react';
import Modal from '../Modal/Modal';
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

  const footer = (
    <>
      <S.Button type="button" $variant="secondary" onClick={handleClose} disabled={isSubmitting}>
        Cancelar
      </S.Button>
      <S.Button type="submit" $variant="primary" form="create-course-form" disabled={isSubmitting}>
        {isSubmitting ? 'Criando...' : 'Criar Curso'}
      </S.Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Criar Novo Curso" footer={footer}>
      <S.Form id="create-course-form" onSubmit={handleSubmit}>
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
      </S.Form>
    </Modal>
  );
};

export default CreateCourseModal;
