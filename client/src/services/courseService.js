import { authFetch } from './authService';

const API_URL = 'https://kcsd-elearning.onrender.com/api';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'An API error occurred');
  return data;
};

export const createCourse = async (formData) => {
  const res = await authFetch(`${API_URL}/courses`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(res);
};

export const getAllCourses = async () => {
  // Use public endpoint so all students can see all courses
  const res = await fetch(`${API_URL}/courses/public`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'An API error occurred');
  }
  return res.json();
};

export const getMyCourses = async () => {
  const res = await authFetch(`${API_URL}/my-courses`);
  return handleResponse(res);
};

export const getCourseById = async (courseId) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}`);
  return handleResponse(res);
};

export const getCourseStudents = async (courseId) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/students`);
  return handleResponse(res);
};

export const enrollInCourse = async (courseId) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/enroll`, {
    method: 'POST',
  });
  return handleResponse(res);
};

export const unenrollFromCourse = async (courseId) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/unenroll`, {
    method: 'POST',
  });
  return handleResponse(res);
};

export const deleteCourse = async (courseId) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const uploadUnit = async (courseId, formData) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/units`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(res);
};

export const deleteUnit = async (courseId, unitIndex) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/units/${unitIndex}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const updateUnit = async (courseId, unitIndex, unitData) => {
  const res = await authFetch(`${API_URL}/courses/${courseId}/units/${unitIndex}`, {
    method: 'PUT',
    body: JSON.stringify(unitData),
  });
  return handleResponse(res);
};

export const getMyStudents = async () => {
  const res = await authFetch(`${API_URL}/courses/teacher/my-students`);
  return handleResponse(res);
};