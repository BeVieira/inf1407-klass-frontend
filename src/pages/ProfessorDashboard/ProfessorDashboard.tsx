import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCardProfessor from '../../components/CourseCardProfessor/CourseCardProfessor';
import StudentListModal, { type Student } from '../../components/StudentListModal/StudentListModal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  computeVacancies,
  fetchEnrollments,
  fetchSections,
  formatSchedule,
  resolveCourseData,
} from '../../utils/api';
import * as S from './styled';

const ProfessorDashboard: React.FC = () => {
  const { accessToken, user } = useAuth();
  const { addToast } = useToast();

  const [courses, setCourses] = useState<Array<{ id: number; code: string; name: string; schedule: string; enrolledCount: number }>>([]);
  const [studentsBySection, setStudentsBySection] = useState<Record<number, Student[]>>({});
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
    if (!accessToken || !user) return;

    const loadSections = async () => {
      try {
        const sections = await fetchSections(accessToken);
        const mine = sections.filter((section) => {
          const course = resolveCourseData(section);
          return section.owner === user.id || course.owner === user.id;
        });

        const normalized = mine.map((section) => {
          const course = resolveCourseData(section);
          const { occupied } = computeVacancies(section);
          return {
            id: section.id,
            code: course.code || `DISC-${course.id}`,
            name: course.name || course.title || `Curso ${course.id}`,
            schedule: formatSchedule(section),
            enrolledCount: occupied,
          };
        });
        setCourses(normalized);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar suas turmas.';
        addToast(message, 'error');
      }
    };

    loadSections();
  }, [accessToken, user, addToast]);

  const handleViewStudents = async (sectionId: number) => {
    setSelectedCourseId(sectionId);
    setIsModalOpen(true);

    if (!accessToken) return;
    try {
      const enrollments = await fetchEnrollments(accessToken, sectionId);
      const students: Student[] = enrollments.map((enrollment) => ({
        id: enrollment.student_detail?.id || enrollment.student || enrollment.id,
        name: enrollment.student_detail?.username || 'Estudante inscrito',
        email: enrollment.student_detail?.email || 'E-mail não informado',
        matricula: enrollment.student_detail?.registration || 'Matrícula não informada',
      }));
      setStudentsBySection((prev) => ({ ...prev, [sectionId]: students }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar alunos.';
      addToast(message, 'error');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const students = selectedCourseId ? studentsBySection[selectedCourseId] || [] : [];

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Professor</S.Title>
          <S.Subtitle>Gerencie suas turmas e acompanhe os alunos inscritos.</S.Subtitle>
        </S.Header>

        {courses.length > 0 ? (
          <S.Grid>
            {courses.map((course) => (
              <CourseCardProfessor
                key={course.id}
                {...course}
                onViewStudents={handleViewStudents}
              />
            ))}
          </S.Grid>
        ) : (
          <S.EmptyState>
            <p>Você não possui disciplinas cadastradas.</p>
          </S.EmptyState>
        )}
      </S.Main>
      <Footer />

      <StudentListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseName={selectedCourse?.name || 'Turma'}
        students={students}
      />
    </S.Page>
  );
};

export default ProfessorDashboard;
