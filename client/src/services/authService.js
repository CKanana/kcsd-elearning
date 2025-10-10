// Auth service placeholder

export function getToken() {
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
    'Authorization': token ? `Bearer ${token}` : undefined,
  };
  return fetch(url, options);
}
