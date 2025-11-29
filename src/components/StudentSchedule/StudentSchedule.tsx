import React, { useMemo } from 'react';
import { parseSchedule, DAYS, HOURS, type TimeSlot } from '../../utils/scheduleUtils';
import * as S from './styled';

interface Course {
  id: number;
  code: string;
  name: string;
  schedule: string;
}

interface StudentScheduleProps {
  courses: Course[];
}

const StudentSchedule: React.FC<StudentScheduleProps> = ({ courses }) => {
  const slots = useMemo(() => {
    return courses.flatMap(course => 
      parseSchedule(course.schedule, course.name, course.code)
    );
  }, [courses]);

  const getSlotContent = (day: string, hour: number) => {
    const slot = slots.find(s => s.day === day && hour >= s.start && hour < s.end);
    
    if (slot && hour === slot.start) {
      // Only render the block at the start hour, spanning the duration
      // Note: For simplicity in this grid implementation, we might just render it in every cell
      // or use rowSpan if we were using a table. 
      // Here, we'll just render it in the cells it occupies.
      return (
        <S.CourseBlock style={{ height: `calc(100% * ${slot.end - slot.start} - 4px)`, zIndex: 10 }}>
          <S.CourseCode>{slot.courseCode}</S.CourseCode>
          <S.CourseName>{slot.courseName}</S.CourseName>
        </S.CourseBlock>
      );
    }
    
    // If it's a middle hour of a block, don't render anything (the start block covers it)
    // BUT since we are using CSS Grid with fixed cells, we can't easily span without complex logic.
    // Alternative: Render in every cell but hide borders/overflow?
    // Better approach for this simple grid: Render in every cell but visually merge?
    // Let's stick to: Render in the start cell with absolute positioning and height > 100%
    
    // Check if this hour is covered by a slot starting earlier
    const coveredBy = slots.find(s => s.day === day && hour > s.start && hour < s.end);
    if (coveredBy) return null; // Already covered by the block started above

    return null;
  };

  return (
    <S.Container>
      <S.Title>Minha Grade Horária</S.Title>
      <S.Grid>
        {/* Header Row */}
        <S.HeaderCell>Horário</S.HeaderCell>
        {DAYS.map(day => (
          <S.HeaderCell key={day}>{day}</S.HeaderCell>
        ))}

        {/* Time Rows */}
        {HOURS.map(hour => (
          <React.Fragment key={hour}>
            <S.TimeCell>{`${hour}h`}</S.TimeCell>
            {DAYS.map(day => (
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
