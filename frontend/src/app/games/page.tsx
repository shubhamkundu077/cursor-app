'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { games } from '@/lib/api';

interface Game {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  subject: string;
  thumbnail: string;
}

export default function GamesPage() {
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await games.getGames();
        setAvailableGames(response as Game[]);
      } catch (err) {
        setError('Failed to load games. Please try again later.');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Educational Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableGames.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="block bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video bg-muted relative">
              {game.thumbnail ? (
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No thumbnail available
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{game.name}</h2>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  {game.difficulty}
                </span>
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded">
                  {game.subject}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 