export interface TimeSlot {
  day: string;
  start: number;
  end: number;
  courseName: string;
  courseCode: string;
}

const DAY_MAP: Record<string, string> = {
  'SEG': 'Segunda',
  'TER': 'Terça',
  'QUA': 'Quarta',
  'QUI': 'Quinta',
  'SEX': 'Sexta',
  'SAB': 'Sábado',
  'DOM': 'Domingo',
};



export const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
export const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 07h to 20h

export const parseSchedule = (daysStr: string, timeStr: string, courseName: string, courseCode: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  if (!daysStr || !timeStr) return slots;

  try {
    const [startStr, endStr] = timeStr.split('-').map(t => t.trim());
    const start = parseInt(startStr.split(':')[0], 10);
    const end = parseInt(endStr.split(':')[0], 10);

    if (isNaN(start) || isNaN(end)) return slots;

    const days = daysStr
      .split(/[-,\s]+/) 
      .map(d => d.trim())
      .map(d => DAY_MAP[d])
      .filter(Boolean);

    days.forEach(day => {
      if (DAYS.includes(day)) {
        slots.push({
          day,
          start,
          end,
          courseName,
          courseCode,
        });
      }
    });

  } catch (error) {
    console.error(`Failed to parse schedule: ${daysStr} ${timeStr}`, error);
  }

  return slots;
};
