import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface Game {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  thumbnail: string;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty?: string;
  subject?: string;
}

interface GameStartResponse {
  sessionId: string;
  questions: Question[];
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
    register: (data: { name: string; email: string; password: string }) => apiClient.post('/auth/register', data),
    logout: () => apiClient.post('/auth/logout'),
  },
  games: {
    list: () => apiClient.get('/games'),
    getGame: (id: number) => apiClient.get(`/games/${id}`),
    startGame: (gameId: number) => apiClient.post(`/games/${gameId}/start`),
    getQuestion: (sessionId: string) => apiClient.get(`/game-sessions/${sessionId}/question`),
    submitAnswer: (sessionId: string, data: { question_id: number; answer: string }) => apiClient.post(`/game-sessions/${sessionId}/submit`, data),
    endGame: (sessionId: string) => apiClient.post(`/game-sessions/${sessionId}/end`),
  },
  userProgress: {
    getProgress: () => apiClient.get('/user/progress'),
    updateProgress: (data: any) => apiClient.post('/user/progress', data),
  },
  leaderboard: {
    get: (gameId: number) => apiClient.get(`/leaderboard/${gameId}`),
  },
};

export default api; 