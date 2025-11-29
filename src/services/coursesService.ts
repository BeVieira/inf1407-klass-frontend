import { apiRequest } from "./api";
import type { Course } from "../types/Course";

export async function fetchCourses() {
  return apiRequest<Course[]>("/api/courses/", {
    method: "GET",
  });
}

export async function fetchCourse(courseId: number) {
  return apiRequest<Course>(`/api/courses/${courseId}/`, {
    method: "GET",
  });
}
