const USERS_KEY = 'csgo_users';
const CURRENT_USER_KEY = 'csgo_current_user';
const DATA_KEY = 'csgo_crosshairs';

// --- AUTENTICACIÓN ---
export const registerUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.username === username)) return { success: false, message: 'Usuario ya existe' };
  
  const encryptedPassword = btoa(password); // Cifrado básico
  users.push({ username, password: encryptedPassword });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const encryptedPassword = btoa(password);
  const user = users.find(u => u.username === username && u.password === encryptedPassword);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true };
  }
  return { success: false, message: 'Credenciales inválidas' };
};

export const logout = () => localStorage.removeItem(CURRENT_USER_KEY);
export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

// --- CRUD DE MIRAS ---
export const getCrosshairs = () => {
  const user = getCurrentUser();
  if (!user) return [];
  const allData = JSON.parse(localStorage.getItem(DATA_KEY) || '[]');
  return allData.filter(item => item.owner === user.username);
};

export const getCrosshairById = (id) => {
  const allData = JSON.parse(localStorage.getItem(DATA_KEY) || '[]');
  return allData.find(item => item.id === parseInt(id));
};

export const saveCrosshair = (data, id = null) => {
  const user = getCurrentUser();
  if (!user) return;
  let allData = JSON.parse(localStorage.getItem(DATA_KEY) || '[]');

  if (id) {
    // UPDATE (Editar)
    allData = allData.map(item => item.id === parseInt(id) ? { ...item, ...data } : item);
  } else {
    // CREATE (Crear)
    const newItem = { id: Date.now(), owner: user.username, ...data };
    allData.push(newItem);
  }
  localStorage.setItem(DATA_KEY, JSON.stringify(allData));
};

export const deleteCrosshair = (id) => {
  const allData = JSON.parse(localStorage.getItem(DATA_KEY) || '[]');
  const newData = allData.filter(item => item.id !== id);
  localStorage.setItem(DATA_KEY, JSON.stringify(newData));
};