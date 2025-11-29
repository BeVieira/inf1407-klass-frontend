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
  computeVacancies,
  deleteEnrollment,
  enrollInSection,
  fetchMyEnrollments,
  fetchSections,
  formatSchedule,
  resolveCourseData,
  type EnrollmentResponse,
  type SectionResponse,
} from "../../utils/api";
import * as S from './styled';

const StudentDashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const { addToast } = useToast();

  const [sections, setSections] = useState<SectionResponse[]>([]);
  const [enrollmentMap, setEnrollmentMap] = useState<Record<number, EnrollmentResponse>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionToUnenroll, setSectionToUnenroll] = useState<number | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [sectionsResponse, myEnrollments] = await Promise.all([
          fetchSections(accessToken),
          fetchMyEnrollments(accessToken),
        ]);

        setSections(sectionsResponse);
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

     try {
      const enrollment = await enrollInSection(accessToken, sectionId);
      setEnrollmentMap((prev) => ({ ...prev, [sectionId]: enrollment }));
      addToast('Inscrição realizada com sucesso!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível realizar a inscrição.';
      addToast(message, 'error');
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
      addToast('Inscrição cancelada com sucesso!', 'info');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível cancelar a inscrição.';
      addToast(message, 'error');
    } finally {
      closeModal();
    }
  };

  const courseLookup = useMemo(() => {
    const lookup: Record<number, ReturnType<typeof resolveCourseData>> = {};
    sections.forEach((section) => {
      const course = resolveCourseData(section);
      lookup[course.id] = course;
    });
    return lookup;
  }, [sections]);

  const normalizedCourses = useMemo(() => {
    return sections.map((section) => {
      const course = resolveCourseData(section, courseLookup);
      const { occupied, totalSpots } = computeVacancies(section);
      const professor = course.professor_name || 'Professor responsável';
      const name = course.name || course.title || `Curso ${course.id}`;
      const code = course.code || `DISC-${course.id}`;
      const schedule = formatSchedule(section);

      return {
        id: section.id,
        code,
        name,
        professor,
        schedule,
        spots: occupied,
        totalSpots: totalSpots || occupied || 0,
        isEnrolled: !!enrollmentMap[section.id],
      };
    });
  }, [sections, courseLookup, enrollmentMap]);

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
          <S.Grid>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onEnroll={handleEnrollClick}
              />
            ))}
          </S.Grid>
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
