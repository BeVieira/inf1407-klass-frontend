import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import * as S from './styled';
import type { CourseResponse, SectionResponse } from '../../utils/api';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseResponse[];
  section: SectionResponse | null;
  onSubmit: (sectionId: number, sectionData: { course?: number; days?: string; schedule?: string; vacancies?: number }) => Promise<void>;
}

const EditSectionModal: React.FC<EditSectionModalProps> = ({ isOpen, onClose, courses, section, onSubmit }) => {
  const [courseId, setCourseId] = useState<number | ''>('');
  const [days, setDays] = useState('');
  const [schedule, setSchedule] = useState('');
  const [vacancies, setVacancies] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (section && isOpen) {
      setCourseId(section.course);
      setDays(section.days);
      setSchedule(section.schedule);
      setVacancies(section.vacancies);
    }
  }, [section, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section || !courseId || !days.trim() || !schedule.trim() || !vacancies) return;

    setIsSubmitting(true);
    try {
      await onSubmit(section.id, {
        course: Number(courseId),
        days: days.trim(),
        schedule: schedule.trim(),
        vacancies: Number(vacancies),
      });
      handleClose();
    } catch {
      // Error handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCourseId('');
    setDays('');
    setSchedule('');
    setVacancies('');
    onClose();
  };

  const footer = (
    <>
      <S.Button type="button" $variant="secondary" onClick={handleClose} disabled={isSubmitting}>
        Cancelar
      </S.Button>
      <S.Button type="submit" $variant="primary" form="edit-section-form" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
      </S.Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Turma" footer={footer}>
      <S.Form id="edit-section-form" onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label htmlFor="course">Disciplina</S.Label>
          <S.Select
            id="course"
            value={courseId}
            onChange={(e) => setCourseId(Number(e.target.value))}
            required
          >
            <option value="" disabled>Selecione uma disciplina</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.name}
              </option>
            ))}
          </S.Select>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="days">Dias da Semana</S.Label>
          <S.Input
            id="days"
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Ex: SEG-QUA"
            required
            maxLength={20}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="schedule">Horário</S.Label>
          <S.Input
            id="schedule"
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="Ex: 10:00-12:00"
            required
            maxLength={20}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="vacancies">Vagas</S.Label>
          <S.Input
            id="vacancies"
            type="number"
            value={vacancies}
            onChange={(e) => setVacancies(Number(e.target.value))}
            placeholder="Ex: 30"
            required
            min={1}
          />
        </S.FormGroup>
      </S.Form>
    </Modal>
  );
};

export default EditSectionModal;
