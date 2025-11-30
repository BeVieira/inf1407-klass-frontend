import React, { useMemo, useState, useEffect } from "react";
import { parseSchedule, DAYS, HOURS } from "../../utils/scheduleUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styled";

interface Course {
  id: number;
  code: string;
  name: string;
  schedule: string;
  days: string;
}

interface StudentScheduleProps {
  courses: Course[];
}

const StudentSchedule: React.FC<StudentScheduleProps> = ({ courses }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slots = useMemo(() => {
    return courses.flatMap((course) =>
      parseSchedule(course.days, course.schedule, course.name, course.code)
    );
  }, [courses]);

  const getSlotContent = (day: string, hour: number) => {
    const slot = slots.find(
      (s) => s.day === day && hour >= s.start && hour < s.end
    );

    if (slot && hour === slot.start) {
      return (
        <S.CourseBlock
          style={{
            height: `calc(100% * ${slot.end - slot.start} + ${slot.end - slot.start - 1}px - 4px)`,
            zIndex: 10,
          }}
        >
          <S.CourseCode>{slot.courseCode}</S.CourseCode>
          <S.CourseName>{slot.courseName}</S.CourseName>
        </S.CourseBlock>
      );
    }

    const coveredBy = slots.find(
      (s) => s.day === day && hour > s.start && hour < s.end
    );
    if (coveredBy) return null;

    return null;
  };

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : DAYS.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < DAYS.length - 1 ? prev + 1 : 0));
  };

  const visibleDays = isMobile ? [DAYS[currentDayIndex]] : DAYS;

  return (
    <S.Container>
      <S.Title>Minha Grade Horária</S.Title>
      
      <S.MobileControls>
        <S.MobileNavButton onClick={handlePrevDay}>
          <ChevronLeft size={20} />
        </S.MobileNavButton>
        <S.MobileDayTitle>{DAYS[currentDayIndex]}</S.MobileDayTitle>
        <S.MobileNavButton onClick={handleNextDay}>
          <ChevronRight size={20} />
        </S.MobileNavButton>
      </S.MobileControls>

      <S.Grid>
        {/* Header Row */}
        <S.HeaderCell>Horário</S.HeaderCell>
        {visibleDays.map((day) => (
          <S.HeaderCell key={day}>{day}</S.HeaderCell>
        ))}

        {/* Time Rows */}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <S.TimeCell>{`${hour}h`}</S.TimeCell>
            {visibleDays.map((day) => (
              <S.SlotCell key={`${day}-${hour}`}>
                {getSlotContent(day, hour)}
              </S.SlotCell>
            ))}
          </React.Fragment>
        ))}
      </S.Grid>
    </S.Container>
  );
};

export default StudentSchedule;
