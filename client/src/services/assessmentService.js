import { authFetch } from './authService';

const API_URL = 'https://kcsd-elearning.onrender.com/api/assessments';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'An API error occurred');
  return data;
};

export const getAllAssessments = async (courseId = '') => {
  const url = courseId ? `${API_URL}?course=${courseId}` : API_URL;
  const res = await authFetch(url);
  return handleResponse(res);
};

export const createAssessment = async (assessmentData) => {
  const res = await authFetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(assessmentData),
  });
  return handleResponse(res);
};

export const deleteAssessment = async (assessmentId) => {
  const res = await authFetch(`${API_URL}/${assessmentId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const addOrUpdateQuestions = async (assessmentId, questions) => {
  // This is a placeholder, as the original component had a demo-only implementation.
  // When the backend endpoint is ready, we can implement it here.
  console.log('Saving questions for assessment:', assessmentId, questions);
  // Example of what it might look like:
  // const res = await authFetch(`${API_URL}/${assessmentId}/questions`, {
  //   method: 'POST', body: JSON.stringify({ questions })
  // });
  // return handleResponse(res);
  return Promise.resolve({ message: 'Questions saved (demo).' });
};