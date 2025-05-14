import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Leader {
  id: number;
  user_id: number;
  total_score: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // const response = await api.games.list(); // Not needed for leaderboard
      const leaderboardResponse = await api.leaderboard.get(1); // 1 = Kingdom Expansion
      setLeaders(leaderboardResponse.data as Leader[]);
    } catch (err) {
      setError('Failed to load leaderboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard - Kingdom Expansion</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Name</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id} className="border-t">
                <td>{idx + 1}</td>
                <td>{leader.user?.name || 'Unknown'}</td>
                <td>{leader.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 