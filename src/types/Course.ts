export type Course = {
  id: number;
  code: string;
  name: string;
  description: string;
  professor: string;
};

export type Section = {
  course: Course;
  days: string; //Ex.: SEG-QUA
  schedule: string; //Ex.: 10:00-12:00
  vacancies: number;
};
