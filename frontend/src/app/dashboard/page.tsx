'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profile } from '@/lib/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface UserStats {
  totalGames: number;
  averageScore: number;
  accuracy: number;
  timeSpent: number;
  completedLevels: number;
  favoriteSubject: string;
  recentGames: Array<{
    id: string;
    name: string;
    score: number;
    completedAt: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await profile.getStats();
        setStats(response as UserStats);
      } catch (err) {
        setError('Failed to load statistics. Please try again later.');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Total Games
            </h3>
            <p className="text-2xl font-bold">{stats.totalGames}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Average Score
            </h3>
            <p className="text-2xl font-bold">{stats.averageScore}%</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Accuracy
            </h3>
            <p className="text-2xl font-bold">{stats.accuracy}%</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Time Spent
            </h3>
            <p className="text-2xl font-bold">
              {Math.round(stats.timeSpent / 60)}h
            </p>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Games</h2>
          <div className="space-y-4">
            {stats.recentGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(game.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{game.score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Insights */}
        <div className="mt-8 bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Learning Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Completed Levels</h3>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(stats.completedLevels / 20) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {stats.completedLevels} out of 20 levels completed
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Favorite Subject</h3>
              <p className="text-lg">{stats.favoriteSubject}</p>
              <p className="text-sm text-muted-foreground">
                Based on your performance and engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 