const KEY = 'mingle_user';

export const loadUser = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveUser = (updates) => {
  try {
    const existing = loadUser() ?? {};
    localStorage.setItem(KEY, JSON.stringify({ ...existing, ...updates }));
  } catch {}
};

export const clearUser = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};
