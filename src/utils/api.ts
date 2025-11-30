const API_BASE_URL = 'https://klassapi.pythonanywhere.com/api';

type ApiRequestOptions = RequestInit & { skipAuth?: boolean };

interface TokenPair {
  access: string;
  refresh: string;
}

const getDefaultHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    // No Content
    return {} as T;
  }
  if (!response.ok) {
    let errorMessage = 'Erro ao comunicar com o servidor.';
    try {
      const data = await response.json();
      errorMessage = data.detail || data.error || JSON.stringify(data);
    } catch {
      // ignore json parse errors
    }
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}, token?: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getDefaultHeaders(token),
      ...(options.headers || {}),
    },
  });
  return handleResponse<T>(response);
};

export const loginRequest = (username: string, password: string) =>
  apiRequest<TokenPair>('/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const refreshAccessToken = (refresh: string) =>
  apiRequest<{ access: string }>('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  });

export const fetchUserProfile = (userId: number, token: string) =>
  apiRequest<UserResponse>(`/accounts/users/${userId}/`, { method: 'GET' }, token);

export const registerUser = (payload: RegisterPayload) =>
  apiRequest<UserResponse>('/accounts/users/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const fetchCourses = (token: string) =>
  apiRequest<CourseResponse[]>('/courses/courses/', { method: 'GET' }, token);

export const createCourse = (token: string, payload: { code: string; name: string; description: string; owner: number }) =>
  apiRequest<CourseResponse>('/courses/courses/', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);

export const fetchSections = (token: string) =>
  apiRequest<SectionResponse[]>('/courses/sections/', { method: 'GET' }, token);

export const createSection = (token: string, payload: { course: number; days: string; schedule: string; vacancies: number }) =>
  apiRequest<SectionResponse>('/courses/sections/', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);

export const fetchEnrollments = (token: string, sectionId?: number) => {
  const query = sectionId ? `?section=${sectionId}` : '';
  return apiRequest<EnrollmentResponse[]>(`/enrollments/enrollments/${query}`, { method: 'GET' }, token);
};

export const fetchMyEnrollments = (token: string) =>
  apiRequest<EnrollmentResponse[]>('/enrollments/enrollments/my/', { method: 'GET' }, token);

export const enrollInSection = (token: string, sectionId: number) =>
  apiRequest<EnrollmentResponse>('/enrollments/enrollments/', {
    method: 'POST',
    body: JSON.stringify({ section: sectionId }),
  }, token);

export const deleteEnrollment = (token: string, enrollmentId: number) =>
  apiRequest<void>(`/enrollments/enrollments/${enrollmentId}/`, { method: 'DELETE' }, token);

export const deleteSection = (token: string, sectionId: number) =>
  apiRequest<void>(`/courses/sections/${sectionId}/`, { method: 'DELETE' }, token);

export const updateSection = (token: string, sectionId: number, payload: { course?: number; days?: string; schedule?: string; vacancies?: number }) =>
  apiRequest<SectionResponse>(`/courses/sections/${sectionId}/`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }, token);

export const deleteCourse = (token: string, courseId: number) =>
  apiRequest<void>(`/courses/courses/${courseId}/`, { method: 'DELETE' }, token);

export const changePassword = (token: string, payload: { old_password: string; new_password: string }) =>
  apiRequest<void>('/accounts/change-password/', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);

export const requestPasswordReset = (email: string) =>
  apiRequest<void>('/accounts/password-reset/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const confirmPasswordReset = (payload: { new_password: string; token: string; uidb64: string }) =>
  apiRequest<void>('/accounts/password-reset-confirm/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  registration: string;
  role: 'student' | 'teacher' | 'admin' | 'professor';
}

export interface RegisterPayload {
  username: string;
  email: string;
  registration: string;
  password: string;
}

export interface CourseResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  owner: number;
}

export interface SectionResponse {
  id: number;
  course: number;
  days: string; //Ex.: SEG-QUA
  schedule: string; //Ex.: 10:00-12:00
  vacancies: number;
  capacity: number;
  occupied_vacancies: number;
}

export interface EnrollmentResponse {
  id: number;
  section: SectionResponse | number;
  student?: number;
  student_detail?: {
    id: number;
    username: string;
    email: string;
    registration: string;
  };
}

export const resolveCourseData = (section: SectionResponse, courseLookup: Record<number, CourseResponse> = {}) => {
  if (typeof section.course === 'object') return section.course;
  return courseLookup[section.course] || { id: section.course };
};

export const formatSchedule = (section: SectionResponse) => section.schedule || section.days || 'Horário a definir';

export const computeVacancies = (section: SectionResponse) => {
  const total = section.vacancies ?? section.capacity;
  const enrolled = section.occupied_vacancies;
  return { totalSpots: total, occupied: enrolled };
};