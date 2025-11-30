import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCardProfessor from '../../components/CourseCardProfessor/CourseCardProfessor';
import StudentListModal, { type Student } from '../../components/StudentListModal/StudentListModal';
import CreateCourseModal from '../../components/CreateCourseModal/CreateCourseModal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  computeVacancies,
  fetchEnrollments,
  fetchSections,
  fetchCourses,
  createCourse,
  formatSchedule,
  type CourseResponse,
  type SectionResponse,
} from '../../utils/api';
import * as S from './styled';

interface CourseWithSections extends CourseResponse {
  sections: SectionResponse[];
}

const ProfessorDashboard: React.FC = () => {
  const { accessToken, user } = useAuth();
  const { addToast } = useToast();

  const [courses, setCourses] = useState<CourseWithSections[]>([]);
  const [studentsBySection, setStudentsBySection] = useState<Record<number, Student[]>>({});
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!accessToken || !user) return;

    const loadCoursesAndSections = async () => {
      try {
        const allCourses = await fetchCourses(accessToken);
        const myCourses = allCourses.filter((course) => course.owner == user.id);

        const allSections = await fetchSections(accessToken);

        const coursesWithSections: CourseWithSections[] = myCourses.map((course) => ({
          ...course,
          sections: allSections.filter((section) => section.course === course.id),
        }));

        setCourses(coursesWithSections);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar suas turmas.';
        addToast(message, 'error');
      }
    };

    loadCoursesAndSections();
  }, [accessToken, user, addToast, refreshTrigger]);

  const handleCreateCourse = async (courseData: { code: string; name: string; description: string }) => {
    if (!accessToken || !user) return;

    try {
      await createCourse(accessToken, { ...courseData, owner: user.id });
      addToast('Curso criado com sucesso!', 'success');
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar curso.';
      addToast(message, 'error');
      throw error;
    }
  };

  const handleViewStudents = async (sectionId: number) => {
    setSelectedSectionId(sectionId);
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
    setSelectedSectionId(null);
  };

  // Encontrar a section selecionada e o curso correspondente
  let selectedCourseName = 'Turma';
  if (selectedSectionId) {
    for (const course of courses) {
      const section = course.sections.find((s) => s.id === selectedSectionId);
      if (section) {
        selectedCourseName = `${course.name} - ${formatSchedule(section)}`;
        break;
      }
    }
  }

  const students = selectedSectionId ? studentsBySection[selectedSectionId] || [] : [];
  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.HeaderContent>
            <S.Title>Painel do Professor</S.Title>
            <S.Subtitle>Gerencie suas turmas e acompanhe os alunos inscritos.</S.Subtitle>
          </S.HeaderContent>
          <S.CreateButton onClick={() => setIsCreateModalOpen(true)}>
            <span>+</span>
            Criar Novo Curso
          </S.CreateButton>
        </S.Header>

        {courses.length > 0 ? (
          <S.Grid>
            {courses.map((course) =>
              course.sections.map((section) => {
                const { occupied } = computeVacancies(section);
                return (
                  <CourseCardProfessor
                    key={section.id}
                    id={section.id}
                    code={course.code}
                    name={course.name}
                    schedule={formatSchedule(section)}
                    days={section.days}
                    enrolledCount={occupied}
                    onViewStudents={handleViewStudents}
                  />
                );
              })
            )}
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
        courseName={selectedCourseName}
        students={students}
      />

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCourse}
      />
    </S.Page>
  );
};

export default ProfessorDashboard;
