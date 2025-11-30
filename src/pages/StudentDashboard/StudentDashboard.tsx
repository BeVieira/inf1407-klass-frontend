import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/Search/SearchBar';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import CourseCard from '../../components/CourseCard/CourseCard';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import StudentSchedule from '../../components/StudentSchedule/StudentSchedule';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  deleteEnrollment,
  enrollInSection,
  fetchMyEnrollments,
  fetchSections,
  fetchCourses,
  fetchUserProfile,
  formatSchedule,
  type EnrollmentResponse,
  type SectionResponse,
  type CourseResponse,
  type UserResponse,
} from "../../utils/api";
import * as S from './styled';

const StudentDashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const { addToast } = useToast();

  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [professors, setProfessors] = useState<Record<number, UserResponse>>({});
  const [enrollmentMap, setEnrollmentMap] = useState<Record<number, EnrollmentResponse>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [loading, setLoading] = useState(false);
  const [enrollingSection, setEnrollingSection] = useState<number | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionToUnenroll, setSectionToUnenroll] = useState<number | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [sectionsResponse, coursesResponse, myEnrollments] = await Promise.all([
          fetchSections(accessToken),
          fetchCourses(accessToken),
          fetchMyEnrollments(accessToken),
        ]);

        setSections(sectionsResponse);
        setCourses(coursesResponse);

        // Buscar dados dos professores (owners)
        const uniqueOwnerIds = [...new Set(coursesResponse.map(c => c.owner))];
        const professorsData: Record<number, UserResponse> = {};
        
        await Promise.all(
          uniqueOwnerIds.map(async (ownerId) => {
            try {
              const prof = await fetchUserProfile(ownerId, accessToken);
              professorsData[ownerId] = prof;
            } catch (error) {
              console.error(`Erro ao buscar professor ${ownerId}:`, error);
            }
          })
        );
        
        setProfessors(professorsData);

        const map: Record<number, EnrollmentResponse> = {};
        myEnrollments.forEach((enrollment) => {
          const sectionId = typeof enrollment.section === 'object'
            ? enrollment.section.id
            : enrollment.section;
          map[sectionId] = enrollment;
        });
        setEnrollmentMap(map);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar dados.';
        addToast(message, 'error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [accessToken, addToast]);

  const reloadSections = async () => {
    if (!accessToken) return;
    
    try {
      const sectionsResponse = await fetchSections(accessToken);
      setSections(sectionsResponse);
    } catch (error) {
      console.error('Erro ao recarregar sections:', error);
    }
  };

  const handleEnrollClick = (sectionId: number) => {
    if (enrollmentMap[sectionId]) {
      setSectionToUnenroll(sectionId);
      setIsModalOpen(true);
      return;
    }
    enroll(sectionId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSectionToUnenroll(null);
  };

  const enroll = async (sectionId: number) => {
    if (!accessToken) {
      addToast('Você precisa estar autenticado para se inscrever.', 'error');
      return;
    }

    // Validar se há vagas disponíveis
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const totalSpots = section.vacancies;
      const occupiedSpots = section.occupied_vacancies;
      
      if (occupiedSpots >= totalSpots) {
        addToast('Não há vagas disponíveis nesta turma.', 'error');
        return;
      }
    }

    setEnrollingSection(sectionId);
    try {
      const enrollment = await enrollInSection(accessToken, sectionId);
      setEnrollmentMap((prev) => ({ ...prev, [sectionId]: enrollment }));
      
      // Recarregar sections para obter a contagem atualizada
      await reloadSections();
      
      addToast('Inscrição realizada com sucesso!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível realizar a inscrição.';
      addToast(message, 'error');
    } finally {
      setEnrollingSection(null);
    }
  };

  const confirmUnenroll = async () => {
    if (!sectionToUnenroll || !accessToken) return;
    const enrollment = enrollmentMap[sectionToUnenroll];
    if (!enrollment) return;

    try {
      await deleteEnrollment(accessToken, enrollment.id);
      setEnrollmentMap((prev) => {
        const copy = { ...prev };
        delete copy[sectionToUnenroll];
        return copy;
      });
      
      // Recarregar sections para obter a contagem atualizada
      await reloadSections();
      
      addToast('Inscrição cancelada com sucesso!', 'info');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível cancelar a inscrição.';
      console.error('Erro ao cancelar inscrição:', error);
      addToast(message, 'error');
    } finally {
      closeModal();
    }
  };

  const courseLookup = useMemo(() => {
    const lookup: Record<number, CourseResponse> = {};
    courses.forEach((course) => {
      lookup[course.id] = course;
    });
    return lookup;
  }, [courses]);

  const normalizedCourses = useMemo(() => {
    return sections.map((section) => {
      const course = courseLookup[section.course];
      const enrolledCount = section.occupied_vacancies;
      const totalSpots = section.vacancies;
      
      if (!course) {
        // Fallback se o curso não for encontrado
        return {
          id: section.id,
          code: `DISC-${section.course}`,
          name: `Curso ${section.course}`,
          professor: 'Professor não informado',
          schedule: formatSchedule(section),
          days: section.days || '',
          spots: enrolledCount,
          totalSpots: totalSpots,
          isEnrolled: !!enrollmentMap[section.id],
        };
      }

      const professor = professors[course.owner]?.username || 'Professor não informado';
      const name = course.name;
      const code = course.code;
      const schedule = formatSchedule(section);

      return {
        id: section.id,
        code,
        name,
        professor,
        schedule,
        days: section.days || '',
        spots: enrolledCount,
        totalSpots: totalSpots,
        isEnrolled: !!enrollmentMap[section.id],
      };
    });
  }, [sections, courseLookup, professors, enrollmentMap]);

  const filteredCourses = normalizedCourses
    .filter((course) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.professor.toLowerCase().includes(term);
      return matchesSearch;
    })
    .sort((a, b) => {
      if (activeTab === 'Por horário') {
        return a.schedule.localeCompare(b.schedule);
      }
      if (activeTab === 'Por professor') {
        return a.professor.localeCompare(b.professor);
      }
      return 0;
    });



  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Estudante</S.Title>
          <S.Subtitle>Gerencie suas inscrições e visualize as disciplinas disponíveis.</S.Subtitle>
        </S.Header>

        <S.Controls>
          <FilterTabs
            tabs={['Todos', 'Por horário', 'Por professor']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por disciplina, código ou professor..."
          />
        </S.Controls>

        {loading ? (
          <S.EmptyState>
            <p>Carregando disciplinas...</p>
          </S.EmptyState>
        ) : filteredCourses.length > 0 ? (
          <S.ScrollableGridContainer>
            <S.Grid>
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isEnrolling={enrollingSection === course.id}
                  onEnroll={handleEnrollClick}
                />
              ))}
            </S.Grid>
          </S.ScrollableGridContainer>
        ) : (
          <S.EmptyState>
            <p>Nenhuma disciplina encontrada.</p>
          </S.EmptyState>
        )}

        {Object.values(enrollmentMap).length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <StudentSchedule
              courses={normalizedCourses.filter((course) => course.isEnrolled).map((course) => ({
                id: course.id,
                code: course.code,
                name: course.name,
                schedule: course.schedule,
                days: course.days,
              }))}
            />
          </div>
        )}
      </S.Main>
      <Footer />

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Cancelar Inscrição"
        message="Tem certeza que deseja cancelar sua inscrição nesta disciplina? Esta ação liberará sua vaga para outros alunos."
        onConfirm={confirmUnenroll}
        onCancel={closeModal}
        confirmText="Sim, cancelar"
        cancelText="Voltar"
        variant="danger"
      />
    </S.Page>
  );
};

export default StudentDashboard;
