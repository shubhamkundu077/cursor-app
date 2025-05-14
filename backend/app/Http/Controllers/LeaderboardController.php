<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    // GET /api/leaderboard/{game}
    public function show($gameId)
    {
        $leaders = UserProgress::where('game_id', $gameId)
            ->with('user')
            ->orderByDesc('total_score')
            ->take(10)
            ->get();

        return response()->json($leaders);
    }
}
