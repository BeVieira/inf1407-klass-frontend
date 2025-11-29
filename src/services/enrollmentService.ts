import { apiRequest } from "./api";
import type { Course } from "../types/Course";

export type Enrollment = {
  id: number;
  course: Course;
  status: "active" | "pending" | "completed";
};

export type EnrollmentPayload = {
  courseId: number;
};

export async function fetchEnrollments() {
  return apiRequest<Enrollment[]>("/api/enrollments/", {
    method: "GET",
  });
}

export async function enrollInCourse(payload: EnrollmentPayload) {
  return apiRequest<Enrollment>("/api/enrollments/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function cancelEnrollment(enrollmentId: number) {
  return apiRequest<void>(`/api/enrollments/${enrollmentId}/`, {
    method: "DELETE",
  });
}
