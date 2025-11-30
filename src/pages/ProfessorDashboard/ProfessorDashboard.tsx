import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCardProfessor from '../../components/CourseCardProfessor/CourseCardProfessor';
import CourseListCard from '../../components/CourseListCard/CourseListCard';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import StudentListModal from '../../components/StudentListModal/StudentListModal';
import CreateCourseModal from '../../components/CreateCourseModal/CreateCourseModal';
import CreateSectionModal from '../../components/CreateSectionModal/CreateSectionModal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  computeVacancies,
  fetchSections,
  fetchCourses,
  createCourse,
  createSection,
  deleteSection,
  deleteCourse,
  formatSchedule,
  type CourseResponse,
  type SectionResponse,
} from '../../utils/api';
import * as S from "./styled";

interface CourseWithSections extends CourseResponse {
  sections: SectionResponse[];
}

const ProfessorDashboard: React.FC = () => {
  const { accessToken, user } = useAuth();
  const { addToast } = useToast();

  const [courses, setCourses] = useState<CourseWithSections[]>([]);
  const [myCourses, setMyCourses] = useState<CourseResponse[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('Turmas');

  useEffect(() => {
    if (!accessToken || !user) return;

    const loadCoursesAndSections = async () => {
      try {
        const allCourses = await fetchCourses(accessToken);
        const myCoursesData = allCourses.filter((course) => course.owner == user.id);
        setMyCourses(myCoursesData);

        const allSections = await fetchSections(accessToken);

        const coursesWithSections: CourseWithSections[] = myCoursesData.map((course) => ({
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

  const handleCreateSection = async (sectionData: { courseId: number; days: string; schedule: string; vacancies: number }) => {
    if (!accessToken) return;

    try {
      await createSection(accessToken, {
        course: sectionData.courseId,
        days: sectionData.days,
        schedule: sectionData.schedule,
        vacancies: sectionData.vacancies,
      });
      addToast('Turma criada com sucesso!', 'success');
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar turma.';
      addToast(message, 'error');
      throw error;
    }
  };

  const handleViewStudents = (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setIsModalOpen(true);
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!accessToken) return;

    const confirmDelete = window.confirm('Tem certeza que deseja deletar esta turma?');
    if (!confirmDelete) return;

    try {
      await deleteSection(accessToken, sectionId);
      addToast('Turma deletada com sucesso!', 'success');
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao deletar turma.';
      addToast(message, 'error');
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!accessToken) return;

    // Verificar se o curso tem turmas
    const course = courses.find(c => c.id === courseId);
    if (course && course.sections.length > 0) {
      addToast('Não é possível deletar um curso que possui turmas cadastradas.', 'error');
      return;
    }

    const confirmDelete = window.confirm('Tem certeza que deseja deletar este curso?');
    if (!confirmDelete) return;

    try {
      await deleteCourse(accessToken, courseId);
      addToast('Curso deletado com sucesso!', 'success');
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao deletar curso.';
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
  
  const renderContent = () => {
    if (activeTab === 'Turmas') {
      if (courses.length === 0) {
        return (
           <S.EmptyState>
            <p>Você não possui turmas cadastradas.</p>
          </S.EmptyState>
        );
      }

      const hasSections = courses.some(c => c.sections.length > 0);

      if (!hasSections) {
         return (
           <S.EmptyState>
            <p>Você não possui turmas cadastradas.</p>
          </S.EmptyState>
        );
      }

      return (
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
                  onDelete={handleDeleteSection}
                />
              );
            })
          )}
        </S.Grid>
      );
    }

    if (activeTab === 'Disciplinas') {
      if (myCourses.length === 0) {
        return (
          <S.EmptyState>
            <p>Você não possui disciplinas cadastradas.</p>
          </S.EmptyState>
        );
      }

      return (
        <S.Grid>
          {myCourses.map((course) => (
            <CourseListCard
              key={course.id}
              id={course.id}
              code={course.code}
              name={course.name}
              description={course.description}
              onDelete={handleDeleteCourse}
            />
          ))}
        </S.Grid>
      );
    }
  };

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.HeaderContent>
            <S.Title>Painel do Professor</S.Title>
            <S.Subtitle>Gerencie suas turmas e acompanhe os alunos inscritos.</S.Subtitle>
          </S.HeaderContent>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <S.CreateButton onClick={() => setIsCreateSectionModalOpen(true)}>
              <span>+</span>
              Criar Nova Turma
            </S.CreateButton>
            <S.CreateButton onClick={() => setIsCreateModalOpen(true)}>
              <span>+</span>
              Criar Novo Curso
            </S.CreateButton>
          </div>
        </S.Header>

        <div style={{ marginBottom: '1.5rem' }}>
          <FilterTabs
            tabs={['Turmas', 'Disciplinas']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {renderContent()}
      </S.Main>
      <Footer />

      <StudentListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseName={selectedCourseName}
        sectionId={selectedSectionId}
        accessToken={accessToken}
      />

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCourse}
      />

      <CreateSectionModal
        isOpen={isCreateSectionModalOpen}
        onClose={() => setIsCreateSectionModalOpen(false)}
        courses={myCourses}
        onSubmit={handleCreateSection}
      />
    </S.Page>
  );
};

export default ProfessorDashboard;
