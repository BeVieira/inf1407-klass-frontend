export interface TimeSlot {
  day: string;
  start: number;
  end: number;
  courseName: string;
  courseCode: string;
}

const DAY_MAP: Record<string, string> = {
  '2ª': 'Segunda',
  '3ª': 'Terça',
  '4ª': 'Quarta',
  '5ª': 'Quinta',
  '6ª': 'Sexta',
  'Sáb': 'Sábado',
};

export const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
export const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 07h to 20h

export const parseSchedule = (schedule: string, courseName: string, courseCode: string): TimeSlot[] => {
  // Example: "2ª e 4ª, 08h–10h" or "2ª, 4ª e 6ª, 14h–16h"
  const slots: TimeSlot[] = [];
  
  try {
    const [daysPart, timePart] = schedule.split(',').map(s => s.trim());
    
    // Parse days
    const days = daysPart
      .replace(' e ', ',') // Replace ' e ' with ',' for splitting
      .split(',')
      .map(d => d.trim())
      .map(d => DAY_MAP[d] || d)
      .filter(d => DAYS.includes(d));

    // Parse time
    // Example: "08h–10h"
    const [startStr, endStr] = timePart.split('–').map(t => t.replace('h', '').trim());
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    if (!isNaN(start) && !isNaN(end)) {
      days.forEach(day => {
        slots.push({
          day,
          start,
          end,
          courseName,
          courseCode,
        });
      });
    }
  } catch (error) {
    console.error(`Failed to parse schedule: ${schedule}`, error);
  }

  return slots;
};
