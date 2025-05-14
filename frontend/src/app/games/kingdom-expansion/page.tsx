'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface GameSession {
  id: string;
  user_id: string;
  game_id: string;
  session_id: string;
  current_level: number;
  score: number;
  accuracy: number;
  time_spent: number;
  is_completed: boolean;
  started_at: string;
  completed_at?: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
  difficulty?: string;
  subject?: string;
  points?: number;
}

export default function KingdomExpansion() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line
  }, []);

  const startGame = async () => {
    setLoading(true);
    try {
      const response = await api.games.startGame(1);
      setSession(response.data as GameSession);
      fetchNextQuestion(response.data as GameSession);
    } catch (error) {
      console.error('Failed to start game:', error);
      setFeedback('Failed to start game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNextQuestion = async (sess?: GameSession | null) => {
    const activeSession = sess || session;
    if (!activeSession) return;
    try {
      const response = await api.games.getQuestion(activeSession.id);
      setCurrentQuestion(response.data as Question);
    } catch (error) {
      console.error('Failed to fetch question:', error);
      setFeedback('Failed to fetch question. Please try again.');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!session || !currentQuestion) return;
    setLoading(true);
    try {
      const response = await api.games.submitAnswer(session.id, {
        question_id: currentQuestion.id,
        answer,
      });
      const result = response.data as { correct: boolean };
      setFeedback(result.correct ? 'Correct!' : 'Incorrect!');
      setAnswer('');
      fetchNextQuestion();
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setFeedback('Failed to submit answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEndGame = async () => {
    if (!session) return;
    setLoading(true);
    try {
      await api.games.endGame(session.id);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to end game:', error);
      setFeedback('Failed to end game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Kingdom Expansion</h1>
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Kingdom Expansion</h1>
            {currentQuestion ? (
              <div>
                <p className="mb-2">{currentQuestion.text}</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="border p-2 mb-2"
                  placeholder="Your answer"
                />
                <button onClick={handleSubmitAnswer} className="bg-blue-500 text-white p-2 rounded">
                  Submit Answer
                </button>
              </div>
            ) : (
              <p>No questions available.</p>
            )}
            {feedback && <p className="mt-2">{feedback}</p>}
            <button onClick={handleEndGame} className="mt-4 bg-red-500 text-white p-2 rounded">
              End Game
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 