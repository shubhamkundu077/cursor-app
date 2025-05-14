import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty?: string;
  subject?: string;
}

interface GameState {
  sessionId: string | null;
  currentLevel: number;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  accuracy: number;
  timeSpent: number;
  isGameActive: boolean;
  setSessionId: (sessionId: string) => void;
  setQuestions: (questions: Question[]) => void;
  incrementScore: () => void;
  updateAccuracy: (correct: boolean) => void;
  updateTimeSpent: (time: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      sessionId: null,
      currentLevel: 1,
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      accuracy: 0,
      timeSpent: 0,
      isGameActive: false,
      setSessionId: (sessionId) => set({ sessionId }),
      setQuestions: (questions) => set({ questions, isGameActive: true }),
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      updateAccuracy: (correct) =>
        set((state) => ({
          accuracy: (state.accuracy * state.currentQuestionIndex + (correct ? 1 : 0)) /
            (state.currentQuestionIndex + 1),
        })),
      updateTimeSpent: (time) => set((state) => ({ timeSpent: state.timeSpent + time })),
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          currentLevel: Math.floor((state.currentQuestionIndex + 1) / 5) + 1,
        })),
      resetGame: () =>
        set({
          sessionId: null,
          currentLevel: 1,
          questions: [],
          currentQuestionIndex: 0,
          score: 0,
          accuracy: 0,
          timeSpent: 0,
          isGameActive: false,
        }),
    }),
    {
      name: 'game-storage',
    }
  )
); 