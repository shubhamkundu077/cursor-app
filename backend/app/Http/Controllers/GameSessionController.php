<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameSession;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GameSessionController extends Controller
{
    public function start(Request $request, Game $game)
    {
        $session = GameSession::create([
            'user_id' => $request->user()->id,
            'game_id' => $game->id,
            'session_id' => Str::uuid(),
            'current_level' => 1,
            'score' => 0,
            'accuracy' => 0,
            'time_spent' => 0,
            'is_completed' => false,
            'started_at' => now(),
        ]);

        return response()->json($session, 201);
    }

    public function submitAnswer(Request $request, GameSession $session)
    {
        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer' => 'required|string',
        ]);

        $question = Question::findOrFail($request->question_id);
        $isCorrect = $question->correct_answer === $request->answer;

        if ($isCorrect) {
            $session->score += $question->points;
        }

        $session->current_level++;
        $session->save();

        return response()->json([
            'correct' => $isCorrect,
            'score' => $session->score,
            'current_level' => $session->current_level,
        ]);
    }

    public function end(Request $request, GameSession $session)
    {
        $session->is_completed = true;
        $session->completed_at = now();
        $session->save();

        return response()->json($session);
    }
} 