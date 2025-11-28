export type User = {
  id: number;
  username: string;
  email: string;
  registration: number;
  role: "admin" | "teacher" | "student";
};
