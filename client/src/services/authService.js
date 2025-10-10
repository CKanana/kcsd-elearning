// Auth service placeholder

export function getToken() {
  return sessionStorage.getItem('token');
}

export function setToken(token) {
  sessionStorage.setItem('token', token);
}

export function removeToken() {
  sessionStorage.removeItem('token');
}

export async function authFetch(url, options = {}) {
  const token = getToken();
  options.headers = {
    ...(options.headers || {}),
    'Authorization': token ? `Bearer ${token}` : undefined,
  };
  return fetch(url, options);
}
