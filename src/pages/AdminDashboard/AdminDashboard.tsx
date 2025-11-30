import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCardProfessor from '../../components/CourseCardProfessor/CourseCardProfessor';
import CourseListCard from '../../components/CourseListCard/CourseListCard';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import StudentListModal from '../../components/StudentListModal/StudentListModal';
import CreateCourseModal from '../../components/CreateCourseModal/CreateCourseModal';
import CreateSectionModal from '../../components/CreateSectionModal/CreateSectionModal';
import EditSectionModal from '../../components/EditSectionModal/EditSectionModal';
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
  updateSection,
  formatSchedule,
  type CourseResponse,
  type SectionResponse,
} from '../../utils/api';
import * as S from './styled';

interface CourseWithSections extends CourseResponse {
  sections: SectionResponse[];
};

const AdminDashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const { addToast } = useToast();

  const [courses, setCourses] = useState<CourseWithSections[]>([]);
  const [allCourses, setAllCourses] = useState<CourseResponse[]>([]);
  const [allSections, setAllSections] = useState<SectionResponse[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<SectionResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] = useState(false);
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('Turmas');

  useEffect(() => {
    if (!accessToken) return;

    const loadCoursesAndSections = async () => {
      try {
        const allCoursesData = await fetchCourses(accessToken);
        setAllCourses(allCoursesData);

        const allSectionsData = await fetchSections(accessToken);
        setAllSections(allSectionsData);

        const coursesWithSections: CourseWithSections[] = allCoursesData.map((course) => ({
          ...course,
          sections: allSectionsData.filter((section) => section.course === course.id),
        }));

        setCourses(coursesWithSections);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar turmas.';
        addToast(message, 'error');
      }
    };

    loadCoursesAndSections();
  }, [accessToken, refreshTrigger, addToast]);

  const handleCreateCourse = async (courseData: { code: string; name: string; description: string }) => {
    if (!accessToken) return;

    try {
      // Admin não precisa definir owner, o backend deve lidar com isso
      await createCourse(accessToken, { ...courseData, owner: 0 }); // Placeholder, ajuste conforme necessário
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

  const handleEditSection = (sectionId: number) => {
    const section = allSections.find(s => s.id === sectionId);
    if (section) {
      setEditingSection(section);
      setIsEditSectionModalOpen(true);
    }
  };

  const handleUpdateSection = async (sectionId: number, sectionData: { course?: number; days?: string; schedule?: string; vacancies?: number }) => {
    if (!accessToken) return;

    try {
      await updateSection(accessToken, sectionId, sectionData);
      addToast('Turma atualizada com sucesso!', 'success');
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao atualizar turma.';
      addToast(message, 'error');
      throw error;
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
            <p>Nenhuma turma cadastrada.</p>
          </S.EmptyState>
        );
      }

      const hasSections = courses.some(c => c.sections.length > 0);

      if (!hasSections) {
         return (
           <S.EmptyState>
            <p>Nenhuma turma cadastrada.</p>
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
                  onEdit={handleEditSection}
                />
              );
            })
          )}
        </S.Grid>
      );
    }

    if (activeTab === 'Disciplinas') {
      if (allCourses.length === 0) {
        return (
          <S.EmptyState>
            <p>Nenhuma disciplina cadastrada.</p>
          </S.EmptyState>
        );
      }

      return (
        <S.Grid>
          {allCourses.map((course) => (
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
            <S.Title>Painel do Administrador</S.Title>
            <S.Subtitle>Gerencie todas as turmas e disciplinas do sistema.</S.Subtitle>
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
        courses={allCourses}
        onSubmit={handleCreateSection}
      />

      <EditSectionModal
        isOpen={isEditSectionModalOpen}
        onClose={() => setIsEditSectionModalOpen(false)}
        courses={allCourses}
        section={editingSection}
        onSubmit={handleUpdateSection}
      />
    </S.Page>
  );
};

export default AdminDashboard;
