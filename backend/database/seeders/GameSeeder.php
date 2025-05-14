<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Kingdom Expansion game
        $game = Game::create([
            'name' => 'Kingdom Expansion',
            'slug' => 'kingdom-expansion',
            'description' => 'Expand your kingdom by answering questions correctly. Each correct answer helps you conquer new territories!',
            'difficulty' => 'medium',
            'subject' => 'General Knowledge',
            'thumbnail' => '/games/kingdom-expansion.jpg',
            'is_active' => true,
        ]);

        // Create sample questions for Kingdom Expansion
        $questions = [
            [
                'text' => 'What is the capital of France?',
                'options' => ['London', 'Berlin', 'Paris', 'Madrid'],
                'correct_answer' => 'Paris',
                'difficulty' => 'easy',
                'subject' => 'Geography',
                'points' => 10,
            ],
            [
                'text' => 'Which planet is known as the Red Planet?',
                'options' => ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                'correct_answer' => 'Mars',
                'difficulty' => 'easy',
                'subject' => 'Science',
                'points' => 10,
            ],
            [
                'text' => 'What is the chemical symbol for gold?',
                'options' => ['Ag', 'Fe', 'Au', 'Cu'],
                'correct_answer' => 'Au',
                'difficulty' => 'medium',
                'subject' => 'Chemistry',
                'points' => 15,
            ],
            [
                'text' => 'Who painted the Mona Lisa?',
                'options' => ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
                'correct_answer' => 'Da Vinci',
                'difficulty' => 'medium',
                'subject' => 'Art',
                'points' => 15,
            ],
            [
                'text' => 'What is the largest organ in the human body?',
                'options' => ['Heart', 'Brain', 'Liver', 'Skin'],
                'correct_answer' => 'Skin',
                'difficulty' => 'hard',
                'subject' => 'Biology',
                'points' => 20,
            ],
        ];

        foreach ($questions as $question) {
            Question::create([
                'game_id' => $game->id,
                ...$question,
            ]);
        }
    }
}
