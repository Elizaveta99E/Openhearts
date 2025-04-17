import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export interface UserProfile {
  id: number;
  avatar: string;
  registrationDate: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string | null;
}

export const getUserProfile = async () => {
  try {
    const response = await fetch('/api/user/profile');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};

export const updateProfile = async (data: {
  birthDate: string;
  phone: string;
  email: string;
}): Promise<UserProfile> => {
  const response = await api.put('/user/profile', data);
  return response.data.user;
};

export const setPassword = async (password: string): Promise<{ success: boolean }> => {
  const response = await api.post('/user/set-password', { password });
  return response.data;
};

export default api;