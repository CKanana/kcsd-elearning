// Auth service placeholder
const API_URL = 'https://kcsd-elearning.onrender.com/api/auth';

export function getToken() {
  // Using localStorage to be consistent with other parts of the app
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export async function authFetch(url, options = {}) {
  const token = getToken();
  options.headers = {
    ...(options.headers || {}),
    'Authorization': token ? `Bearer ${token}` : '',
  };
  // Only set Content-Type to application/json if body is not FormData
  if (options.body && !(options.body instanceof FormData) && !options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  } else if (options.body instanceof FormData) {
    // Let the browser set the Content-Type (with boundary) for FormData
    delete options.headers['Content-Type'];
  }
  return fetch(url, options);
}

export const login = async (email, password, role) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  return data;
};

export const resetPassword = async (token, password) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Reset failed');
  return data;
};

export const requestPasswordReset = async (email) => {
  const res = await fetch(`${API_URL}/request-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const verifyAccount = async (token) => {
  const res = await fetch(`${API_URL}/verify?token=${token}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Verification failed');
  return data;
};

export const getMe = async () => {
  const res = await authFetch(`${API_URL}/me`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch user info');
  return data;
};

export const updateProfile = async (profileData) => {
  const res = await authFetch(`${API_URL}/profile`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update profile');
  return data;
};

export const updateProfilePhoto = async (formData) => {
  // Note: authFetch will not set Content-Type for FormData, which is correct.
  const res = await authFetch(`${API_URL}/profile/photo`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to upload photo');
  return data;
};

export const changePassword = async (passwords) => {
  const res = await authFetch(`${API_URL}/change-password`, {
    method: 'POST',
    body: JSON.stringify(passwords),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to change password');
  return data;
};
